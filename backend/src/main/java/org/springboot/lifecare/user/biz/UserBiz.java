package org.springboot.lifecare.user.biz;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springboot.lifecare.common.exception.CustomException;
import org.springboot.lifecare.common.utils.JwtUtils;
import org.springboot.lifecare.user.dao.RoleDAO;
import org.springboot.lifecare.user.dao.UserDAO;
import org.springboot.lifecare.user.dto.*;
import org.springboot.lifecare.user.entity.RoleName;
import org.springboot.lifecare.user.entity.User;
import org.springboot.lifecare.user.entity.UserRank;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserBiz implements UserDetailsService {
    private final UserDAO userDAO;

    private final RoleDAO roleDAO;
    private final AuthenticationManager authenticationManager;

    private final JwtUtils jwtUtils;

    private final PasswordEncoder passwordEncoder;

    public UserBiz(UserDAO userDAO,
                   @Lazy AuthenticationManager authenticationManager,
                   @Lazy PasswordEncoder passwordEncoder,
                   RoleDAO roleDAO, JwtUtils jwtUtils) {
        this.userDAO = userDAO;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.roleDAO = roleDAO;
        this.jwtUtils = jwtUtils;
    }

    public ResponseEntity<?> register(UserCreationDTO userDTO) {
        if (userDAO.existsById(userDTO.getId())) throw new CustomException("ID is already taken");
        if (userDAO.existsByEmail(userDTO.getEmail())) throw new CustomException("Email is already taken");

        List<String> combs = List.of("012", "123", "234",
                "345", "456", "567", "678", "789", "890", "987", "876",
                "765", "654", "543", "432", "321", "210");

        for (String comb : combs) {
            if (userDTO.getPassword().contains(comb)) throw new CustomException("Password contains consecutive numbers, e.g., 123");
        }

        User user = new User(
                userDTO.getId(), userDTO.getName(), userDTO.getEmail(),
                passwordEncoder.encode(userDTO.getPassword()),
                userDTO.getPhoneNo(), UserRank.BRONZE);
        user.setRoles(List.of(roleDAO.findByRoleName(RoleName.USER)));
        userDAO.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Pattern pattern = Pattern.compile("^[0-9]{3,}$");
        Matcher matcher = pattern.matcher(id);
        if (matcher.matches())
            return userDAO.findById(id).orElseThrow(() -> new UsernameNotFoundException(""));
        else
            return userDAO.findByEmail(id).orElseThrow(() -> new UsernameNotFoundException(""));
    }

    public ResponseEntity<?> authenticate(UserDTO userDTO, HttpServletResponse response) {
        boolean useEmail = false;
        Pattern pattern = Pattern.compile("^[0-9]{3,}$");
        Matcher matcher = pattern.matcher(userDTO.getCred());
        if (!matcher.matches()) {
            useEmail = true;
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userDTO.getCred(),
                        userDTO.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user;
        if (useEmail) {
            user = userDAO.findByEmail(userDTO.getCred()).orElseThrow(() -> new UsernameNotFoundException(""));
        } else {
            user = userDAO.findById(userDTO.getCred()).orElseThrow(() -> new UsernameNotFoundException(""));
        }

        List<String> rolesNames = new ArrayList<>();
        user.getRoles().forEach(r -> rolesNames.add(r.getRoleName()));

        String jwt = jwtUtils.generateToken(user, userDTO.isPersist());
        JwtResponse jwtResponse = new JwtResponse(jwt, user.getUserNo(),
                user.getUsername(), user.getEmail(), rolesNames);
        Cookie cookie = new Cookie("jwt", jwt);

        if (userDTO.isPersist()) {
            cookie.setMaxAge(2592000);
        } else {
            cookie.setMaxAge(60*60*10);
        }
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setSecure(true);
        response.addCookie(cookie);
        return ResponseEntity.ok(jwtResponse);
    }

    public ResponseEntity<?> inquireUsers(PaginationInquiryRequestDTO requestDTO) {
        Pageable pageable = PageRequest.of(requestDTO.getPage(), requestDTO.getSize());
        Page<InquiryResponseDTO> result = userDAO.findPaginatedUsersWithParams(
                requestDTO.getId(), requestDTO.getUsername(),
                requestDTO.getPhoneNo(), requestDTO.getJoinFrom(),
                requestDTO.getJoinTo(), pageable);
        List<InquiryResponseDTO> responseDTOList = result.getContent().stream().toList();
        PaginationInquiryResponseListDTO response = new PaginationInquiryResponseListDTO(responseDTOList, result.getTotalPages());
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<?> getAllUsersWithParams(AllInquiryRequestDTO requestDTO) {
        List<InquiryResponseDTO> result = userDAO.findAllUsersWithParams(
                requestDTO.getId(), requestDTO.getUsername(), requestDTO.getPhoneNo()
        );
        return ResponseEntity.ok().body(result);
    }
}

package org.springboot.lifecare.user.biz;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springboot.lifecare.common.exception.CustomException;
import org.springboot.lifecare.user.dao.RoleDAO;
import org.springboot.lifecare.user.dao.UserDAO;
import org.springboot.lifecare.user.dto.*;
import org.springboot.lifecare.user.entity.Role;
import org.springboot.lifecare.user.entity.RoleName;
import org.springboot.lifecare.user.entity.User;
import org.springboot.lifecare.user.entity.UserRank;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
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

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserBiz implements UserDetailsService {
    private final UserDAO userDAO;

    private final RoleDAO roleDAO;
    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    public UserBiz(UserDAO userDAO,
                   @Lazy AuthenticationManager authenticationManager,
                   @Lazy PasswordEncoder passwordEncoder,
                   RoleDAO roleDAO) {
        this.userDAO = userDAO;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.roleDAO = roleDAO;
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
        String jwt = getToken(user, rolesNames, userDTO.isRemember());
        JwtResponse jwtResponse = new JwtResponse(jwt, user.getUserNo(),
                user.getUsername(), user.getEmail(), rolesNames);
        Cookie cookie = new Cookie("jwt", jwt);
        if (userDTO.isRemember()) {
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

    private String getToken(User user, List<String> rolesNames, Boolean remember) {
        long expireMs = remember? 2592000000L : expiration;
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
        return Jwts.builder()
                .subject(user.getId())
                .claim("role", rolesNames)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(Date.from(Instant.now().plusMillis(expireMs)))
                .signWith(key)
                .compact();
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

package org.springboot.lifecare.user.biz;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springboot.lifecare.user.dao.UserDAO;
import org.springboot.lifecare.user.dto.*;
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

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    public UserBiz(UserDAO userDAO,
                   @Lazy AuthenticationManager authenticationManager,
                   @Lazy PasswordEncoder passwordEncoder) {
        this.userDAO = userDAO;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<?> register(UserCreationDTO userDTO) {
        if (userDAO.existsById(Integer.valueOf(userDTO.getId()))) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ID is already taken");
        if (userDAO.existsByEmail(userDTO.getEmail())) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already taken");

        List<String> combs = List.of("012", "123", "234",
                "345", "456", "567", "678", "789", "890", "987", "876",
                "765", "654", "543", "432", "321", "210");

        for (String comb : combs) {
            if (userDTO.getPassword().contains(comb)) {
                HashMap<String, String> temp = new HashMap<>();

                temp.put("defaultMessage", "Password contains consecutive numbers");

                return ResponseEntity.badRequest()
                        .body(List.of(temp));
            }
        }

        User user = new User(
                Integer.valueOf(userDTO.getId()), userDTO.getName(), userDTO.getEmail(),
                passwordEncoder.encode(userDTO.getPassword()),
                Long.valueOf(userDTO.getPhoneNo()), UserRank.BRONZE);
        userDAO.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Pattern pattern = Pattern.compile("^[0-9]{3,}$");
        Matcher matcher = pattern.matcher(id);
        if (matcher.matches())
            return userDAO.findById(Integer.parseInt(id)).orElseThrow(() -> new UsernameNotFoundException("Id not found"));
        else
            return userDAO.findByEmail(id).orElseThrow(() -> new UsernameNotFoundException("Email not found"));
    }

    public ResponseEntity<?> authenticate(UserDTO userDTO) {
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
            user = userDAO.findByEmail(userDTO.getCred()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        } else {
            user = userDAO.findById(Integer.valueOf(userDTO.getCred())).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        }

        List<String> rolesNames = new ArrayList<>();
        user.getRoles().forEach(r -> rolesNames.add(r.getRoleName()));
        return ResponseEntity.ok(getToken(user, rolesNames));
    }

    private String getToken(User user, List<String> rolesNames) {
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
        return Jwts.builder()
                .subject(user.getUsername())
                .claim("role", rolesNames)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(Date.from(Instant.now().plusMillis(expiration)))
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

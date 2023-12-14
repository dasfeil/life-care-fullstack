package org.springboot.lifecare.user.biz;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springboot.lifecare.user.dao.RoleDAO;
import org.springboot.lifecare.user.dao.UserDAO;
import org.springboot.lifecare.user.dto.UserCreationDTO;
import org.springboot.lifecare.user.dto.UserDTO;
import org.springboot.lifecare.user.entity.Role;
import org.springboot.lifecare.user.entity.RoleName;
import org.springboot.lifecare.user.entity.User;
import org.springboot.lifecare.user.entity.UserRank;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
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
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

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

    public UserBiz(UserDAO userDAO, RoleDAO roleDAO,
                   @Lazy AuthenticationManager authenticationManager,
                   @Lazy PasswordEncoder passwordEncoder) {
        this.userDAO = userDAO;
        this.roleDAO = roleDAO;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<?> register(UserCreationDTO userDTO) {
        User user = new User(
                userDTO.getId(), userDTO.getName(),
                passwordEncoder.encode(userDTO.getPassword()), UserRank.valueOf(userDTO.getRank())
        );
        Role role = new Role(RoleName.USER);
        user.setRoles(Collections.singletonList(role));
        String token = getToken(user, Collections.singletonList(role.getRoleName()));
        userDAO.save(user);
        return new ResponseEntity<>("Bearer " + token, HttpStatus.SEE_OTHER);
    }

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        return userDAO.findById(Integer.parseInt(id)).orElseThrow(() -> new UsernameNotFoundException("Id not found"));
    }

    public String authenticate(UserDTO userDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userDTO.getId(),
                        userDTO.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = userDAO.findById(userDTO.getId()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        List<String> rolesNames = new ArrayList<>();
        user.getRoles().forEach(r -> rolesNames.add(r.getRoleName()));
        return getToken(user, rolesNames);
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
}

package org.springboot.lifecare.user.controller;

import lombok.extern.slf4j.Slf4j;

import java.time.Instant;
import java.util.stream.Collectors;

import org.springboot.lifecare.user.biz.UserBiz;
import org.springboot.lifecare.user.dto.UserCreationDTO;
import org.springboot.lifecare.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@Slf4j
public class UserController {
    private final UserBiz userBiz;

    @Autowired
    public UserController(UserBiz userBiz) {
        this.userBiz = userBiz;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<User> createUser(@RequestBody UserCreationDTO userCreationDTO) {
        User user = userBiz.createUser(userCreationDTO);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public void login() {
        //TODO: CREATE LOGIN FUNCTION WITH JWT
    }
}

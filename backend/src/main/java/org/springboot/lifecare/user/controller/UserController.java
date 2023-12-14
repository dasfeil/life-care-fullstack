package org.springboot.lifecare.user.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springboot.lifecare.user.biz.UserBiz;
import org.springboot.lifecare.user.dto.UserCreationDTO;
import org.springboot.lifecare.user.dto.UserDTO;
import org.springboot.lifecare.user.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@Slf4j
@RequiredArgsConstructor
public class UserController {
    private final UserBiz userBiz;

    @PostMapping("/sign-up")
    public ResponseEntity<?> createUser(@RequestBody UserCreationDTO userCreationDTO) {
        return userBiz.register(userCreationDTO);
    }

    @PostMapping("/login")
    public String login(@RequestBody UserDTO userDTO) {
        return userBiz.authenticate(userDTO);
    }

    @GetMapping("/")
    public void sayHello() {
        System.out.println("Hello");
    }
}

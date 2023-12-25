package org.springboot.lifecare.user.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springboot.lifecare.user.biz.UserBiz;
import org.springboot.lifecare.user.dto.*;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@Slf4j
@RequiredArgsConstructor
public class UserController {
    private final UserBiz userBiz;

    @PostMapping("/sign-up")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserCreationDTO userCreationDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        return userBiz.register(userCreationDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserDTO userDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        return userBiz.authenticate(userDTO);
    }

    @GetMapping("/refresh")
    public String refreshToken(@RequestBody RefreshTokenDTO refreshTokenDTO) {
        return "bruh";
    }

    @PostMapping("/manage/inquiry")
    public ResponseEntity<?> returnInquiry(@Valid @RequestBody PaginationInquiryRequestDTO paginationInquiryRequestDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        return userBiz.inquireUsers(paginationInquiryRequestDTO);
    }

    @PostMapping("/manage/inquiry/all")
    public ResponseEntity<?> getAllData(@Valid @RequestBody AllInquiryRequestDTO allInquiryRequestDTO) {
        return userBiz.getAllUsersWithParams(allInquiryRequestDTO);
    }
}

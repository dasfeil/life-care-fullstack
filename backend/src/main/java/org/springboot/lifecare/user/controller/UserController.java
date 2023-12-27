package org.springboot.lifecare.user.controller;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springboot.lifecare.user.biz.UserBiz;
import org.springboot.lifecare.user.dto.*;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@Slf4j
@RequiredArgsConstructor
public class UserController {
    private final UserBiz userBiz;


    @PostMapping("/sign-up")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserCreationDTO userCreationDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = new ArrayList<>();
            bindingResult.getAllErrors().forEach(
                    error -> errors.add(error.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(errors);
        }
        return userBiz.register(userCreationDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserDTO userDTO, BindingResult bindingResult, HttpServletResponse response) {
        if (bindingResult.hasErrors()) {
            List<String> errors = new ArrayList<>();
            bindingResult.getAllErrors().forEach(
                    error -> errors.add(error.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(errors);
        }
        return userBiz.authenticate(userDTO, response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> authenticate() {
        return userBiz.verifyToken();
    }

    @PostMapping("/manage/inquiry")
    public ResponseEntity<?> returnInquiry(@Valid @RequestBody PaginationInquiryRequestDTO paginationInquiryRequestDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = new ArrayList<>();
            bindingResult.getAllErrors().forEach(
                    error -> errors.add(error.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(errors);
        }
        return userBiz.inquireUsers(paginationInquiryRequestDTO);
    }

    @PostMapping("/manage/inquiry/all")
    public ResponseEntity<?> getAllData(@Valid @RequestBody AllInquiryRequestDTO allInquiryRequestDTO) {
        return userBiz.getAllUsersWithParams(allInquiryRequestDTO);
    }
}

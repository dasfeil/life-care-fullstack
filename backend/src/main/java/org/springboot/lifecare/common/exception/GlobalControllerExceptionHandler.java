package org.springboot.lifecare.common.exception;

import org.springboot.lifecare.user.dto.ErrorMessage;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.List;

@ControllerAdvice(annotations = RestController.class)
public class GlobalControllerExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {BadCredentialsException.class})
    protected ResponseEntity<?> handleBadCredential( RuntimeException e, WebRequest request) {
        return handleExceptionInternal(e, new ErrorMessage(List.of("Incorrect ID or password")),
                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(value = {UsernameNotFoundException.class})
    protected ResponseEntity<?> handleNotFound( RuntimeException e, WebRequest request) {
        return handleExceptionInternal(e, new ErrorMessage(List.of("Server encountered error with database")),
                new HttpHeaders(), HttpStatus.SERVICE_UNAVAILABLE, request);
    }

    @ExceptionHandler(value = {CustomException.class})
    protected ResponseEntity<?> handleCustom( RuntimeException e, WebRequest request) {
        return handleExceptionInternal(e, new ErrorMessage(List.of(e.getMessage())),
                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }
}

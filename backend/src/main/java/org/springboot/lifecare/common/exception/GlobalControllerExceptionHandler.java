package org.springboot.lifecare.common.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.List;

@ControllerAdvice(annotations = RestController.class)
public class GlobalControllerExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {BadCredentialsException.class})
    protected ResponseEntity<?> handleBadCredential(
            RuntimeException e, WebRequest request) {
        HashMap<String, String> body = new HashMap<>();
        body.put("defaultMessage", "Incorrect ID or password");
        List<?> list = List.of(body);
        return handleExceptionInternal(e, list,
                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }
}

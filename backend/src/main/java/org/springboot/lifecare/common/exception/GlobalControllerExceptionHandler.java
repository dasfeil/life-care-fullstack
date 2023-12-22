package org.springboot.lifecare.common.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.nio.file.AccessDeniedException;
import java.text.ParseException;
import java.util.HashMap;

@ControllerAdvice(annotations = RestController.class)
public class GlobalControllerExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {ParseException.class})
    protected ResponseEntity<?> handleParseException(
            RuntimeException e, WebRequest request) {
        HashMap<String, String> body = new HashMap<>();
        body.put("defaultMessage", "There has been an error parsing date");
        return handleExceptionInternal(e, body,
                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }
}

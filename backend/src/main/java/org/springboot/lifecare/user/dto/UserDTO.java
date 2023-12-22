package org.springboot.lifecare.user.dto;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDTO {

    @Pattern(regexp = "(^\\d{3,}$)|(^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$)", message = "Invalid ID/Email input")
    private String cred;

    @Pattern(regexp = "^[a-zA-Z\\d!@#$%^&*]{8,}$", message = "Input contains invalid characters and/or is too short")
    private String password;

    private boolean remember;
}

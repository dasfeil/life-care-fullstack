package org.springboot.lifecare.user.dto;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserCreationDTO {
    @Pattern(regexp = "^\\d{3,10}$", message = "ID need to be 3 to 10 digits")
    private String id;

    @Pattern(regexp = "^[a-zA-Z]+$", message = "Name should only contain English letters")
    private String name;

    @Pattern(regexp = "(^(?=.*[A-Za-z])(?=.*\\d).{10,20})|(^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,20}$)", message = "Invalid password")
    private String password;

    @Pattern(regexp = "^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "Email is not valid")
    private String email;

    @Pattern(regexp = "^\\d+$", message = "Phone number is not valid")
    private String phoneNo;
}

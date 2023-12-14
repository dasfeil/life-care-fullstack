package org.springboot.lifecare.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserCreationDTO {
    private Integer id;
    private String name;
    private String password;
    private String rank;
}

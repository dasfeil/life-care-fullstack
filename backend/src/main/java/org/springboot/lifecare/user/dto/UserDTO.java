package org.springboot.lifecare.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDTO {
    private Integer userNo;
    private String name;
    private String rank;
}

package org.springboot.lifecare.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springboot.lifecare.user.entity.UserRole;

@Data
@AllArgsConstructor
public class UserDTO {
    private Integer empNo;
    private String name;
    private String role;
}

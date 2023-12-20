package org.springboot.lifecare.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TokenRefreshDTO {
    private String refreshToken;
}

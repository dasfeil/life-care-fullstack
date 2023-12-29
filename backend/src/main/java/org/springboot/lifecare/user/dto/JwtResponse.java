package org.springboot.lifecare.user.dto;

import lombok.Getter;
import lombok.Setter;
import org.springboot.lifecare.user.entity.UserRank;

import java.util.List;

@Setter @Getter
public class JwtResponse {
    private Long id;
    private String username;
    private String phoneNo;
    private String userRank;
    private String email;
    private List<String> roles;

    public JwtResponse(Long id, String username, String email, List<String> roles, String phoneNo, UserRank userRank) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.userRank = userRank.name();
        this.phoneNo = phoneNo;
    }
}
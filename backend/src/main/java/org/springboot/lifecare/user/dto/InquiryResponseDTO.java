package org.springboot.lifecare.user.dto;


import lombok.*;

import java.sql.Date;

@Data
public class InquiryResponseDTO {
    private long userNo;
    private String id;
    private String username;
    private String phoneNo;
    private String email;
    private String joinDate;

    public InquiryResponseDTO(Long userNo, String id, String username, String phoneNo, String email, Date joinDate) {
        this.userNo = userNo;
        this.id = id;
        this.username = username;
        this.phoneNo = phoneNo;
        this.email = email;
        this.joinDate = joinDate.toString();
    }
}

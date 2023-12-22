package org.springboot.lifecare.user.dto;


import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InquiryResponseDTO {
    private long userNo;
    private int id;
    private String username;
    private long phoneNo;
    private String email;
    private String joinDate;
}

package org.springboot.lifecare.user.dto;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaginationInquiryRequestDTO {
    private String id;
    private String phoneNo;
    private String username;
    private String joinFrom;
    private String joinTo;

    @Min(value = 0, message = "Page must be 0 minimum")
    private int page;

    @Min(value = 1, message = "Size must be positive")
    private int size;
}

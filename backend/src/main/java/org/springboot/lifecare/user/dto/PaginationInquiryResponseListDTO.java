package org.springboot.lifecare.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PaginationInquiryResponseListDTO {
    private List<InquiryResponseDTO> userList;
    private int pages;
}

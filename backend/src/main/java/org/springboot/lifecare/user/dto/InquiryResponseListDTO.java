package org.springboot.lifecare.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class InquiryResponseListDTO {
    private List<InquiryResponseDTO> responseDTOList;
    private int pages;
}

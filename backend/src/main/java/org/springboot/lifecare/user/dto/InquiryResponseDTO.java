package org.springboot.lifecare.user.dto;


import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Setter
@Getter
public class InquiryResponseDTO {
    private long userNo;
    private int id;
    private String username;
    private long phoneNo;
    private String email;
    private String joinDate;

    public InquiryResponseDTO(Long userNo, Integer id, String username, Long phoneNo, String email, Date joinDate) {
        this.userNo = userNo;
        this.id = id;
        this.username = username;
        this.phoneNo = phoneNo;
        this.email = email;
        this.joinDate = joinDate.toString();
    }

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof InquiryResponseDTO)) return false;
        final InquiryResponseDTO other = (InquiryResponseDTO) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.getUserNo() != other.getUserNo()) return false;
        if (this.getId() != other.getId()) return false;
        final Object this$username = this.getUsername();
        final Object other$username = other.getUsername();
        if (this$username == null ? other$username != null : !this$username.equals(other$username)) return false;
        if (this.getPhoneNo() != other.getPhoneNo()) return false;
        final Object this$email = this.getEmail();
        final Object other$email = other.getEmail();
        if (this$email == null ? other$email != null : !this$email.equals(other$email)) return false;
        final Object this$joinDate = this.getJoinDate();
        final Object other$joinDate = other.getJoinDate();
        if (this$joinDate == null ? other$joinDate != null : !this$joinDate.equals(other$joinDate)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof InquiryResponseDTO;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final long $userNo = this.getUserNo();
        result = result * PRIME + (int) ($userNo >>> 32 ^ $userNo);
        result = result * PRIME + this.getId();
        final Object $username = this.getUsername();
        result = result * PRIME + ($username == null ? 43 : $username.hashCode());
        final long $phoneNo = this.getPhoneNo();
        result = result * PRIME + (int) ($phoneNo >>> 32 ^ $phoneNo);
        final Object $email = this.getEmail();
        result = result * PRIME + ($email == null ? 43 : $email.hashCode());
        final Object $joinDate = this.getJoinDate();
        result = result * PRIME + ($joinDate == null ? 43 : $joinDate.hashCode());
        return result;
    }

    public String toString() {
        return "InquiryResponseDTO(userNo=" + this.getUserNo() + ", id=" + this.getId() + ", username=" + this.getUsername() + ", phoneNo=" + this.getPhoneNo() + ", email=" + this.getEmail() + ", joinDate=" + this.getJoinDate() + ")";
    }
}

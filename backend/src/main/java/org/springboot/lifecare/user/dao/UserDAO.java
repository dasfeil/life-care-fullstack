package org.springboot.lifecare.user.dao;

import org.springboot.lifecare.user.dto.InquiryResponseDTO;
import org.springboot.lifecare.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserDAO extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findById(String id);

    boolean existsById(String id);

    boolean existsByEmail(String email);

    @Query("select new " +
            "org.springboot.lifecare.user.dto.InquiryResponseDTO(u.userNo, u.id, u.username, u.phoneNo, u.email, u.joinDate) " +
            "from USER u " +
            "where u.id like %:id% " +
            "and lower(u.username) like lower(concat('%', :username, '%')) " +
            "and u.phoneNo like %:phoneNo% " +
            "and u.joinDate >= cast(:joinFrom as localdate) " +
            "and u.joinDate <= cast(:joinTo as localdate)")
    Page<InquiryResponseDTO> findPaginatedUsersWithParams(@Param("id") String id, @Param("username") String username, @Param("phoneNo") String phoneNo,
                                                          @Param("joinFrom") String joinFrom, @Param("joinTo") String joinTo, Pageable pageable);

    @Query("select new " +
            "org.springboot.lifecare.user.dto.InquiryResponseDTO(u.userNo, u.id, u.username, u.phoneNo, u.email, u.joinDate) " +
            "from USER u " +
            "where u.id like %:id% " +
            "and lower(u.username) like lower(concat('%', :username, '%')) " +
            "and u.phoneNo like %:phoneNo% ")
    List<InquiryResponseDTO> findAllUsersWithParams(@Param("id") String id, @Param("username") String username, @Param("phoneNo") String phoneNo);
}



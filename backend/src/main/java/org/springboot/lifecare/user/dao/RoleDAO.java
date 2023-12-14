package org.springboot.lifecare.user.dao;

import org.springboot.lifecare.user.entity.Role;
import org.springboot.lifecare.user.entity.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleDAO extends JpaRepository<Role, Integer> {
    Role findByRoleName(RoleName roleName);
}

package org.springboot.lifecare.user.dao;

import org.springboot.lifecare.user.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserDAO extends CrudRepository<User, Integer> {

}

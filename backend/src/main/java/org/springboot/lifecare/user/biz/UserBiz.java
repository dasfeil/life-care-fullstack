package org.springboot.lifecare.user.biz;

import org.springboot.lifecare.user.dao.UserDAO;
import org.springboot.lifecare.user.dto.UserCreationDTO;
import org.springboot.lifecare.user.entity.User;
import org.springboot.lifecare.user.entity.UserRank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service

public class UserBiz {
    private final UserDAO userDAO;

    @Autowired
    public UserBiz(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public User createUser(UserCreationDTO userCreationDTO) {
        User user = new User();
        user.setUserNo(userCreationDTO.getUserNo());
        user.setName(userCreationDTO.getName());
        user.setUserRank(UserRank.valueOf(userCreationDTO.getRank()));
        user.setEncodedPassword(userCreationDTO.getPassword());
        userDAO.save(user);
        return user;
    }
}

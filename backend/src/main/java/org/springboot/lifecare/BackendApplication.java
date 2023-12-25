package org.springboot.lifecare;

import lombok.NonNull;
import org.springboot.lifecare.user.dao.UserDAO;
import org.springboot.lifecare.user.entity.Role;
import org.springboot.lifecare.user.entity.RoleName;
import org.springboot.lifecare.user.entity.User;
import org.springboot.lifecare.user.entity.UserRank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }
}

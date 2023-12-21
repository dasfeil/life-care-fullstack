package org.springboot.lifecare.user.biz;

import lombok.RequiredArgsConstructor;
import org.springboot.lifecare.user.dao.RefreshTokenDAO;
import org.springboot.lifecare.user.dao.UserDAO;
import org.springboot.lifecare.user.entity.RefreshToken;
import org.springboot.lifecare.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenBiz {
    @Value("${jwt.refreshExpiration}")
    private Long refreshTokenDuration;

    private RefreshTokenDAO refreshTokenDAO;

    private UserDAO userDAO;

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenDAO.findByToken(token);
    }

    public RefreshToken createRefreshToken(Long userId) throws Exception {
        RefreshToken refreshToken = new RefreshToken();

        if (userDAO.findById(userId).isPresent()) {
            refreshToken.setUser(userDAO.findById(userId).get());
            refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDuration));
            refreshToken.setToken(UUID.randomUUID().toString());

            refreshToken = refreshTokenDAO.save(refreshToken);

            return refreshToken;
        }
        else throw new Exception();
    }
}

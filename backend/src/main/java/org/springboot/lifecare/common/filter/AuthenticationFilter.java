package org.springboot.lifecare.common.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.Password;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springboot.lifecare.user.biz.UserBiz;
import org.springboot.lifecare.user.dao.UserDAO;
import org.springboot.lifecare.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.Arrays;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthenticationFilter extends OncePerRequestFilter {

    @Value("${jwt.secret}")
    private String secret;

    private final UserBiz userBiz;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
        String token = null;

        System.out.println(Arrays.toString(request.getCookies()));

        if (request.getCookies() == null) {
            filterChain.doFilter(request, response);
            return;
        }
        for (Cookie cookie : request.getCookies()) {
            if (cookie.getName().equals("jwt")) {
                token = cookie.getValue();
            }
        }

        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        boolean validToken = true;
        try {
            Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
        } catch (Exception e) {
            validToken = false;
            log.info("Invalid token");
        }
        if (validToken) {
            Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
            String id = claims.getSubject();
            User user = (User) userBiz.loadUserByUsername(id);
            if (user != null) {
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(user.getId(), null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        filterChain.doFilter(request, response);
    }
}

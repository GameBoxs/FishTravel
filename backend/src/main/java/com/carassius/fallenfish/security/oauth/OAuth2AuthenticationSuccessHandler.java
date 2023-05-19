package com.carassius.fallenfish.security.oauth;

import com.carassius.fallenfish.common.util.CookieUtil;
import com.carassius.fallenfish.security.LoginUser;
import com.carassius.fallenfish.security.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.carassius.fallenfish.security.jwt.JwtUtil.TOKEN_VALIDATION_SECOND;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Value("${app.auth.access-token-name}")
    private String accessTokenName;
    @Value("${app.oauth2.authorizedRedirectUri}")
    private String redirectUri;
    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        if (response.isCommitted()) {
            return;
        }
        LoginUser user = (LoginUser) authentication.getPrincipal();

        String accessToken = jwtUtil.createToken(user);

        Cookie tokenCookie = cookieUtil.createCookie(accessTokenName, accessToken, (int) TOKEN_VALIDATION_SECOND, true);
        response.addCookie(tokenCookie);

        getRedirectStrategy().sendRedirect(request, response, redirectUri);
    }

}
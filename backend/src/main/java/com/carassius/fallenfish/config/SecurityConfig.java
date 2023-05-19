package com.carassius.fallenfish.config;

import com.carassius.fallenfish.security.oauth.OAuth2AuthenticationSuccessHandler;
import com.carassius.fallenfish.security.oauth.PrincipalOAuth2UserService;
import com.carassius.fallenfish.security.oauth.OAuth2AuthenticationFailureHandler;
import com.carassius.fallenfish.security.jwt.JwtAuthenticationFilter;
import com.carassius.fallenfish.security.jwt.JwtAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final PrincipalOAuth2UserService principalOauth2UserService;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests() // 애플리케이션에 들어오는 요청에 대한 사용 권한을 체크
                .antMatchers(HttpMethod.POST, "/**").authenticated()
                .antMatchers(HttpMethod.GET, "/room/create").authenticated()
                .anyRequest().permitAll();

        http.cors()                     // CORS on
                .and()
                .csrf().disable()           // CSRF off
                .httpBasic().disable()     // Basic Auth off
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);    // Session off

        http.oauth2Login() // OAuth2 로그인 설정
                .userInfoEndpoint()
                .userService(principalOauth2UserService) // OAuth2인증 과정에서 Authentication 생성에 필요한 OAuth2User를 반환하는 클래스 지정
                .and()
                .successHandler(oAuth2AuthenticationSuccessHandler) // 인증 성공 후처리
                .failureHandler(oAuth2AuthenticationFailureHandler); // 인증 실패 후처리

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        http.exceptionHandling() // 예외 처리 설정
                // 비인증 사용자가 인증이 필요한 URL에 접근할 경우를 처리하는 클래스 지정
                .authenticationEntryPoint(jwtAuthenticationEntryPoint);

        http.logout()
                .disable();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

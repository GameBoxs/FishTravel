package com.carassius.fallenfish.domain.member.controller;

import com.carassius.fallenfish.domain.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "회원 관리")
@RestController
@RequiredArgsConstructor
public class MemberController {
    @Value("${app.auth.access-token-name}")
    private String accessTokenName;

    @Operation(summary = "로그아웃")
    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity logout() {
        ResponseCookie cookie = ResponseCookie.from(accessTokenName, null)
                .maxAge(0)
                .path("/")
                .httpOnly(true)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(null);
    }
}

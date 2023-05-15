package com.carassius.fallenfish.domain.member.controller;

import com.carassius.fallenfish.domain.member.entity.Member;
import com.carassius.fallenfish.domain.member.service.MemberService;
import com.carassius.fallenfish.security.LoginUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Tag(name = "회원 관리")
@RestController
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    @Value("${app.auth.access-token-name}")
    private String accessTokenName;

    private final MemberService memberService;

    @Operation(summary = "유저 정보 가져오기")
    @GetMapping("/info")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity getUserInfo(@AuthenticationPrincipal LoginUser loginUser) {

        log.info(loginUser.getId().toString());

        return ResponseEntity.ok()
            .header(null)
            .body(memberService.getMember(loginUser.getId()));
    }

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

package com.carassius.fallenfish.domain.member.dto;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberCreateRequest {
    private String loginId;
    private String password;
    private String name;
    private String provider;
}


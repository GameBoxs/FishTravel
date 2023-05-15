package com.carassius.fallenfish.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberInfoResponse {
    private String loginId;
    private String name;
    // private String profileImage;
}

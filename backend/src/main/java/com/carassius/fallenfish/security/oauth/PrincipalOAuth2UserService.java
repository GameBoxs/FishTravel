package com.carassius.fallenfish.security.oauth;

import com.carassius.fallenfish.domain.member.dto.MemberCreateRequest;
import com.carassius.fallenfish.domain.member.entity.Member;
import com.carassius.fallenfish.domain.member.repository.MemberRepository;
import com.carassius.fallenfish.domain.member.service.MemberService;
import com.carassius.fallenfish.security.LoginUser;
import com.carassius.fallenfish.security.oauth.provider.KakaoOAuthUserInfo;
import com.carassius.fallenfish.security.oauth.provider.OAuthUserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PrincipalOAuth2UserService extends DefaultOAuth2UserService {
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId();

        OAuthUserInfo oAuthUserInfo = null;

        if (provider.equals("kakao")) {
            oAuthUserInfo = new KakaoOAuthUserInfo(oAuth2User.getAttributes());
        }

        String providerId = oAuthUserInfo.getProviderId();
        String loginId = provider + "_" + providerId;

        Optional<Member> findMember = memberRepository.findByLoginId(loginId);

        Member member = null;

        // 해당 소셜 아이디로 로그인한 적이 없다면 회원 생성
        if (findMember.isEmpty()) {
            MemberCreateRequest dto = MemberCreateRequest.builder()
                    .loginId(loginId)
                    .name(oAuthUserInfo.getName())
                    .password(UUID.randomUUID().toString())
                    .provider(provider)
                    .build();
            member = memberService.createMember(dto);
        } else { // 로그인한 적이 있으므로 유저 불러오기
            member = findMember.get();
        }

        return new LoginUser(member);
    }
}

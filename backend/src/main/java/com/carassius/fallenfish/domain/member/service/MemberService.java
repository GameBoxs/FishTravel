package com.carassius.fallenfish.domain.member.service;

import com.carassius.fallenfish.domain.member.dto.MemberCreateRequest;
import com.carassius.fallenfish.domain.member.dto.MemberInfo;
import com.carassius.fallenfish.domain.member.entity.Member;
import com.carassius.fallenfish.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    @Transactional
    public MemberInfo getMember(Long userId) {
        Member findMember = memberRepository.findById(userId).get();

        return MemberInfo.builder()
            .id(findMember.getId())
            .name(findMember.getName())
            .build();
    }
    @Transactional
    public Member createMember(MemberCreateRequest dto) {
        Member user = Member.builder()
                .loginId(dto.getLoginId())
                .password(bCryptPasswordEncoder.encode(dto.getPassword()))
                .name(dto.getName())
                .provider(dto.getProvider())
                .build();
        memberRepository.save(user);

        return user;
    }


}

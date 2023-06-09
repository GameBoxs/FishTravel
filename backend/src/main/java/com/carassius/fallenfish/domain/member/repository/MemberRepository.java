package com.carassius.fallenfish.domain.member.repository;

import com.carassius.fallenfish.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByLoginId(String userId);
    Optional<Member> findById(Long id);
}

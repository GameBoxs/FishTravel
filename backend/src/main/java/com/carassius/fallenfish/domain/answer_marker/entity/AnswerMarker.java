package com.carassius.fallenfish.domain.answer_marker.entity;

import com.carassius.fallenfish.common.entity.BaseTimeEntity;
import com.carassius.fallenfish.domain.member.entity.Member;
import com.carassius.fallenfish.domain.round.entity.Round;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerMarker extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "DECIMAL(9,6)")
    private Double lat;

    @Column(columnDefinition = "DECIMAL(9,6)")
    private Double lng;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "round_id")
    private Round round;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
}
package com.carassius.fallenfish.domain.game_player.entity;

import com.carassius.fallenfish.common.entity.BaseTimeEntity;
import com.carassius.fallenfish.domain.game.entity.Game;
import com.carassius.fallenfish.domain.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GamePlayer extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;
}
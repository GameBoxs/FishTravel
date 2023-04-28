package com.carassius.fallenfish.domain.round.entity;

import com.carassius.fallenfish.common.entity.BaseTimeEntity;
import com.carassius.fallenfish.domain.game.entity.Game;
import com.carassius.fallenfish.domain.problem_marker.entity.ProblemMarker;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Round extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Short roundOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_marker_id")
    private ProblemMarker problemMarker;
}
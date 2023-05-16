package com.carassius.fallenfish.domain.game.dto;

import com.carassius.fallenfish.domain.member.entity.Member;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Player {
    private Long id;
    private String name;

    public Player(Member member) {
        this.id = member.getId();
        this.name = member.getName();
    }
}

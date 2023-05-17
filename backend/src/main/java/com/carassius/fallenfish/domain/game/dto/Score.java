package com.carassius.fallenfish.domain.game.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Score {
    private Player player;
    private int point;
}
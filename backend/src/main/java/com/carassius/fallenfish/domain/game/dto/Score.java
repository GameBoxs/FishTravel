package com.carassius.fallenfish.domain.game.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Score {
    private MarkerRequest answer;
    private double distance;
}

package com.carassius.fallenfish.domain.game.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class Round{
    private int roundOrder;
    private List<Score> scores;
}

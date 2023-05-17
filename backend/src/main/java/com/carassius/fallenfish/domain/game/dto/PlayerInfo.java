package com.carassius.fallenfish.domain.game.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PlayerInfo {
    private MarkerRequest problemMarker;
    private MarkerRequest[] answerMarkers;
}

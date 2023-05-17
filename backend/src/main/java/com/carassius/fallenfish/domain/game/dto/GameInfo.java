package com.carassius.fallenfish.domain.game.dto;

import com.carassius.fallenfish.domain.game.entity.MessageCode;
import lombok.*;

import java.util.List;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GameInfo {
    private String roomId;
    private MessageCode code;
    private Long managerId;
    private int maxPlayers;
    private List<Player> players;
    private List<Round> round;
}

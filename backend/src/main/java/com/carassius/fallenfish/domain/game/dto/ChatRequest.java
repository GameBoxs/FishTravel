package com.carassius.fallenfish.domain.game.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class ChatRequest extends PlayerRequest{
    private String message;
}

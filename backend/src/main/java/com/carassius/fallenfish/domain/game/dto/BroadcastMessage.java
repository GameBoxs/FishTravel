package com.carassius.fallenfish.domain.game.dto;

import com.carassius.fallenfish.domain.game.entity.MessageCode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BroadcastMessage<T> {
    private MessageCode code;
    private T data;
}

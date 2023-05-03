package com.carassius.fallenfish.domain.game.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class GameController {
    private final SimpMessageSendingOperations simpMessageSendingOperations;
    //TODO: 방 생성 처리

    @MessageMapping("room/{roomId}")
    public void joinGame(@Payload String message, @DestinationVariable String roomId) {
        System.out.println("message = " + message);
        simpMessageSendingOperations.convertAndSend("/topic/" + roomId, message+"pjh_burn");
    }

}

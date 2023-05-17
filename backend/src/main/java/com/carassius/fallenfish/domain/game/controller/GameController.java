package com.carassius.fallenfish.domain.game.controller;

import com.carassius.fallenfish.domain.game.dto.GameInfo;
import com.carassius.fallenfish.domain.game.dto.PlayerRequest;
import com.carassius.fallenfish.domain.game.service.GameService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
@RequiredArgsConstructor
public class GameController {
    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;
    private final GameService gameService;

    public void setRedisValue(String key, Object classType) throws JsonProcessingException {
        redisTemplate.opsForValue().set(key, objectMapper.writeValueAsString(classType));
    }

    // 방 생성하기 - RabbitMQ에 사용할 방 랜덤ID를 생성해서 방장에게 전달한다.
    @GetMapping("/room/create")
    public ResponseEntity<?> createGameRoom() throws JsonProcessingException {
        //TODO: 방장 ID 추출
        String roomId = gameService.createGameRoom(1L);
        return new ResponseEntity<>(roomId, HttpStatus.OK);
    }

    @SubscribeMapping("/{roomId}")
    public String joinGame(@DestinationVariable String roomId) {
        System.out.println("Subscribe : roomId = " + roomId);
        return "sub_success";
    }

    @MessageMapping("room/{roomId}/enter")
    public void pubEnter(@Payload PlayerRequest playerRequest, @DestinationVariable String roomId) throws JsonProcessingException {
        GameInfo gameInfo = gameService.enterGameRoom(playerRequest, roomId);
        if(gameInfo != null) {
            simpMessageSendingOperations.convertAndSend("/topic/" + roomId, gameInfo);
        }
    }

    @MessageMapping("room/{roomId}/chat")
    public void pubChat(@Payload String message, @DestinationVariable String roomId){
        System.out.println("message = " + message);
        simpMessageSendingOperations.convertAndSend("/topic/" + roomId, message);
    }

}

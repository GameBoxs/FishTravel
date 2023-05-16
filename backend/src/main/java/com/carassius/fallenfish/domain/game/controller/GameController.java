package com.carassius.fallenfish.domain.game.controller;

import com.carassius.fallenfish.common.util.RandomId;
import com.carassius.fallenfish.domain.game.dto.GameInfo;
import com.carassius.fallenfish.domain.game.dto.Player;
import com.carassius.fallenfish.domain.game.entity.GameStatus;
import com.carassius.fallenfish.domain.member.entity.Member;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class GameController {
    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    public void setRedisValue(String key, Object classType) throws JsonProcessingException {
        redisTemplate.opsForValue().set(key, objectMapper.writeValueAsString(classType));
    }

    // 방 생성하기 - RabbitMQ에 사용할 방 랜덤ID를 생성해서 방장에게 전달한다.
    @GetMapping("/room/create")
    public ResponseEntity<?> createGameRoom() throws JsonProcessingException {
        // TODO: 방장인지 검증
        RandomId randomId = new RandomId(10);
        String roomId = randomId.nextString();
        System.out.println("GameRoom Created roomId = " + roomId);

        // 임시 방장
        Member member = new Member();
        member.setId(1L);
        member.setName("방장_닉네임");
        Player manager = new Player(member);

        GameInfo gameInfo = new GameInfo();
        gameInfo.setRoomId(roomId);
        gameInfo.setStatus(GameStatus.LOBBY);
        gameInfo.setManagerId(1L);
        gameInfo.setMaxPlayers(6);
        List<Player> players = new ArrayList<>();
        gameInfo.setPlayers(players);

        setRedisValue(roomId, gameInfo);
        return new ResponseEntity<>(roomId, HttpStatus.OK);
    }

    @MessageMapping("room/{roomId}")
    public void joinGame(@Payload String message, @DestinationVariable String roomId) {
        System.out.println("message = " + message);
        simpMessageSendingOperations.convertAndSend("/topic/" + roomId, message+"pjh_burn");
    }

}

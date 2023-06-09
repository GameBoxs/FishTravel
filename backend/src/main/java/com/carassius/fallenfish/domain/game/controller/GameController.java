package com.carassius.fallenfish.domain.game.controller;

import com.carassius.fallenfish.domain.game.dto.*;
import com.carassius.fallenfish.domain.game.entity.MessageCode;
import com.carassius.fallenfish.domain.game.service.GameService;
import com.carassius.fallenfish.security.LoginUser;
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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@RequiredArgsConstructor
public class GameController {
    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final GameService gameService;

    // 방 생성하기 - RabbitMQ에 사용할 방 랜덤ID를 생성해서 방장에게 전달한다.
    @GetMapping("/room/create")
    public ResponseEntity<?> createGameRoom(@AuthenticationPrincipal LoginUser loginUser, @RequestParam("domestic") boolean domestic) throws JsonProcessingException {
        //TODO: 방장 ID 추출
//        String roomId = gameService.createGameRoom(loginUser.getId(), domestic);
        String roomId = gameService.createGameRoom(2L, domestic);
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
        BroadcastMessage<GameInfo> broadcastMessage = BroadcastMessage.<GameInfo>builder()
                .code(MessageCode.ENTER)
                .data(gameInfo)
                .build();
        if(gameInfo != null) {
            simpMessageSendingOperations.convertAndSend("/topic/" + roomId, broadcastMessage);
        }
    }

    @MessageMapping("room/{roomId}/chat")
    public void pubChat(@Payload ChatRequest chatRequest, @DestinationVariable String roomId){
        BroadcastMessage<ChatRequest> broadcastMessage = BroadcastMessage.<ChatRequest>builder()
                .code(MessageCode.CHAT)
                .data(chatRequest)
                .build();

        simpMessageSendingOperations.convertAndSend("/topic/" + roomId, broadcastMessage);
    }

    // 게임 메인 로직
    @MessageMapping("/room/{roomId}/start")
    synchronized public void pubStart(@DestinationVariable String roomId) throws JsonProcessingException, InterruptedException {
        GameInfo gameInfo = gameService.startGame(roomId);
        BroadcastMessage<GameInfo> broadcastMessage = BroadcastMessage.<GameInfo>builder()
                .code(MessageCode.GAME_START)
                .data(gameInfo)
                .build();
        simpMessageSendingOperations.convertAndSend("/topic/" + roomId, broadcastMessage);

        wait(5000);

        gameInfo = gameService.startPickFish(roomId);
        broadcastMessage = BroadcastMessage.<GameInfo>builder()
                .code(MessageCode.PICK_FISH)
                .data(gameInfo)
                .build();
        simpMessageSendingOperations.convertAndSend("/topic/" + roomId, broadcastMessage);

        wait(20000);

        // TODO: 마커 안찍은놈 랜덤 마커 처리

        RoundInfo[] rounds = gameInfo.getRounds();

        for(int i = 0; i < rounds.length; i++) {
            System.out.println("라운드 = " + (i+1));
            // 1. 라운드 시작 대기
            gameInfo = gameService.waitForNextRound(roomId, i+1);
            broadcastMessage = BroadcastMessage.<GameInfo>builder()
                    .code(MessageCode.WAIT_FOR_NEXT_ROUND)
                    .data(gameInfo)
                    .build();
            simpMessageSendingOperations.convertAndSend("/topic/" + roomId, broadcastMessage);

            // 2. 5초
            wait(8000);

            // 3. 라운드 시작 신호
            MarkerRequest markerRequest = gameService.startRound(roomId, i);
            BroadcastMessage<MarkerRequest> roundMessage = BroadcastMessage.<MarkerRequest>builder()
                    .code(MessageCode.IN_ROUND)
                    .data(markerRequest)
                    .build();
            simpMessageSendingOperations.convertAndSend("/topic/" + roomId, roundMessage);

            // 4. n초동안 문제를 풉니다.
            wait(30000);

            // 5. 라운드 종료 신호
            gameInfo = gameService.endRound(roomId, i);
            broadcastMessage = BroadcastMessage.<GameInfo>builder()
                    .code(MessageCode.ROUND_RESULT)
                    .data(gameInfo)
                    .build();
            simpMessageSendingOperations.convertAndSend("/topic/" + roomId, broadcastMessage);

            // 6. n초 동안 결과보여주고
            wait(10000);
            // 7번으로 되돌아감
        }
        System.out.println(roomId + " : 게임 종료");
        simpMessageSendingOperations.convertAndSend("/topic/" + roomId, "다 끝났다");
        // TODO: 최종 결과 및 종료
    }

    @MessageMapping("/room/{roomId}/pickfish")
    public void pubPickfish(@Payload MarkerRequest markerRequest, @DestinationVariable String roomId) throws JsonProcessingException {
        gameService.pickFish(markerRequest, roomId);
        // TODO: 전파하기
    }

    @MessageMapping("/room/{roomId}/answer")
    public void pubAnswer(@Payload MarkerRequest markerRequest, @DestinationVariable String roomId) throws JsonProcessingException {
        gameService.submitAnswer(markerRequest, roomId);
        BroadcastMessage<MarkerRequest> broadcastMessage = BroadcastMessage.<MarkerRequest>builder()
                .code(MessageCode.ANSWER)
                .data(markerRequest)
                .build();
        simpMessageSendingOperations.convertAndSend("/topic/" + roomId, broadcastMessage);
    }
}

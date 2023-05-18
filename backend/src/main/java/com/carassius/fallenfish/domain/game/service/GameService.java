package com.carassius.fallenfish.domain.game.service;

import com.carassius.fallenfish.common.util.RandomId;
import com.carassius.fallenfish.domain.game.dto.*;
import com.carassius.fallenfish.domain.game.entity.MessageCode;
import com.carassius.fallenfish.domain.member.entity.Member;
import com.carassius.fallenfish.domain.member.repository.MemberRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class GameService {
    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final MemberRepository memberRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    public void setRedisValue(String key, Object classType) throws JsonProcessingException {
        redisTemplate.opsForValue().set(key, objectMapper.writeValueAsString(classType));
    }

    public <T> T getRedisValue(String key, Class<T> classType) throws JsonProcessingException {
        String redisValue = (String) redisTemplate.opsForValue().get(key);
        return ObjectUtils.isEmpty(redisValue) ? null : objectMapper.readValue(redisValue, classType);
    }

    public GameInfo enterGameRoom(PlayerRequest playerRequest, String roomId) throws JsonProcessingException {
        GameInfo gameInfo = getRedisValue(roomId, GameInfo.class);
        Optional<Member> member = memberRepository.findById(playerRequest.getRequester().getId());
        if(member.isEmpty()) {
            return null;
        }
        gameInfo.getPlayers().add(new Player(member.get()));
        setRedisValue(roomId, gameInfo);
        return gameInfo;
    }

    public String createGameRoom(Long managerId) throws JsonProcessingException {
        RandomId randomId = new RandomId(10);
        String roomId = randomId.nextString();
        System.out.println("GameRoom Created roomId = " + roomId);

        GameInfo gameInfo = new GameInfo();
        gameInfo.setRoomId(roomId);
        gameInfo.setCode(MessageCode.LOBBY);
        gameInfo.setManagerId(managerId);
        gameInfo.setMaxPlayers(6);
        // TODO: 국내 고정
        gameInfo.setDomestic(true);
        List<Player> players = new ArrayList<>();
        gameInfo.setPlayers(players);

        setRedisValue(roomId, gameInfo);
        return roomId;
    }

    // 게임 시작 신호 - 라운드 초기화 및 플레이어 REDIS 띄우기
    public GameInfo startGame(String roomId) throws JsonProcessingException {
        GameInfo gameInfo = getRedisValue(roomId, GameInfo.class);
        gameInfo.setCode(MessageCode.GAME_START);
        int playerCount = gameInfo.getPlayers().size();
        RoundInfo[] rounds = new RoundInfo[playerCount];
        for(int i = 0; i < playerCount; i++) {
            rounds[i] = new RoundInfo();
            rounds[i].setRoundOrder(i+1);
        }
        gameInfo.setRounds(rounds);
        setRedisValue(roomId, gameInfo);

        for(Player player : gameInfo.getPlayers()) {
            PlayerInfo playerInfo = new PlayerInfo();
            playerInfo.setAnswerMarkers(new MarkerRequest[playerCount]);
            setRedisValue("member_" + player.getId(), playerInfo);
        }

        return gameInfo;
    }

    public GameInfo startPickFish(String roomId) throws JsonProcessingException {
        GameInfo gameInfo = getRedisValue(roomId, GameInfo.class);
        gameInfo.setCode(MessageCode.PICK_FISH);
        setRedisValue(roomId, gameInfo);
        return gameInfo;
    }

    public void pickFish(MarkerRequest markerRequest, String roomId) throws JsonProcessingException {
        String key = "member_" + markerRequest.getRequester().getId();
        PlayerInfo playerInfo = getRedisValue(key, PlayerInfo.class);
        playerInfo.setProblemMarker(markerRequest);
        setRedisValue(key, playerInfo);
    }

    public GameInfo waitForNextRound(String roomId) throws JsonProcessingException {
        GameInfo gameInfo = getRedisValue(roomId, GameInfo.class);
        gameInfo.setCode(MessageCode.WAIT_FOR_NEXT_ROUND);
        setRedisValue(roomId, gameInfo);
        return gameInfo;
    }

    public MarkerRequest startRound(String roomId, int i) throws JsonProcessingException {
        GameInfo gameInfo = getRedisValue(roomId, GameInfo.class);
        gameInfo.setCode(MessageCode.IN_ROUND);
        setRedisValue(roomId, gameInfo);

        Player player = gameInfo.getPlayers().get(i);
        PlayerInfo playerInfo = getRedisValue("member_" + player.getId(), PlayerInfo.class);
        return playerInfo.getProblemMarker();
    }

    public GameInfo endRound(String roomId) throws JsonProcessingException {
        GameInfo gameInfo = getRedisValue(roomId, GameInfo.class);
        gameInfo.setCode(MessageCode.ROUND_RESULT);
        setRedisValue(roomId, gameInfo);
        return gameInfo;
    }
}

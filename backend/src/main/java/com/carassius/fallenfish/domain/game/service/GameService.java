package com.carassius.fallenfish.domain.game.service;

import com.carassius.fallenfish.common.util.RandomId;
import com.carassius.fallenfish.domain.game.dto.GameInfo;
import com.carassius.fallenfish.domain.game.dto.Player;
import com.carassius.fallenfish.domain.game.dto.PlayerRequest;
import com.carassius.fallenfish.domain.game.entity.GameStatus;
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
        Optional<Member> member = memberRepository.findById(playerRequest.getRequesterId());
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
        gameInfo.setStatus(GameStatus.LOBBY);
        gameInfo.setManagerId(managerId);
        gameInfo.setMaxPlayers(6);
        List<Player> players = new ArrayList<>();
        gameInfo.setPlayers(players);

        setRedisValue(roomId, gameInfo);
        return roomId;
    }


}

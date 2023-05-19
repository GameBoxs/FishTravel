package com.carassius.fallenfish.domain.game.service;

import com.carassius.fallenfish.common.util.DistanceCalculator;
import com.carassius.fallenfish.common.util.RandomId;
import com.carassius.fallenfish.domain.answer_marker.entity.AnswerMarker;
import com.carassius.fallenfish.domain.game.dto.*;
import com.carassius.fallenfish.domain.game.entity.MessageCode;
import com.carassius.fallenfish.domain.member.entity.Member;
import com.carassius.fallenfish.domain.member.repository.MemberRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class GameService {
    private final MemberRepository memberRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;
    private final DistanceCalculator distanceCalculator;

    private final double[][] domesticLocations = {{35.834706853813366, 129.21862387497592}, {35.159697612693876, 129.1615279149234}, {35.852761505162896, 128.56653392221193}, {33.45930351568051, 126.93966579985329}, {37.29161570239798, 127.20470017638027}, {33.49308951552344, 126.96605139997007}};
    private final double[][] globalLocations = {{35.7144622, 139.7966334}, {40.7487397, -73.9852793}, {42.3621815, -71.0907346}, {51.5058183, -0.075192}, {51.5015884, -0.1410892}, {9.0594112, 7.4903175}};

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

    public String createGameRoom(Long managerId, boolean domestic) throws JsonProcessingException {
        RandomId randomId = new RandomId(10);
        String roomId = randomId.nextString();
        System.out.println("GameRoom Created roomId = " + roomId);

        GameInfo gameInfo = new GameInfo();
        gameInfo.setRoomId(roomId);
        gameInfo.setCode(MessageCode.LOBBY);
        gameInfo.setManagerId(managerId);
        gameInfo.setMaxPlayers(6);
        // TODO: 국내 고정
        gameInfo.setDomestic(domestic);
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
        for (int i = 0; i < playerCount; i++) {
            rounds[i] = new RoundInfo();
            rounds[i].setScores(new ArrayList<>());
            rounds[i].setRoundOrder(i + 1);
        }
        gameInfo.setRounds(rounds);
        setRedisValue(roomId, gameInfo);

        for (Player player : gameInfo.getPlayers()) {
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

    public GameInfo waitForNextRound(String roomId, int currentRound) throws JsonProcessingException {
        GameInfo gameInfo = getRedisValue(roomId, GameInfo.class);
        gameInfo.setCode(MessageCode.WAIT_FOR_NEXT_ROUND);
        gameInfo.setCurrentRound(currentRound);
        setRedisValue(roomId, gameInfo);
        return gameInfo;
    }

    public MarkerRequest startRound(String roomId, int i) throws JsonProcessingException {
        GameInfo gameInfo = getRedisValue(roomId, GameInfo.class);
        gameInfo.setCode(MessageCode.IN_ROUND);

        Player player = gameInfo.getPlayers().get(i);
        PlayerInfo playerInfo = getRedisValue("member_" + player.getId(), PlayerInfo.class);

        if(playerInfo.getProblemMarker() == null) {
            MarkerRequest markerRequest = new MarkerRequest();
            markerRequest.setRequester(player);
            if(gameInfo.isDomestic()) {
                markerRequest.setLat(domesticLocations[i][0]);
                markerRequest.setLng(domesticLocations[i][1]);
            } else {
                markerRequest.setLat(globalLocations[i][0]);
                markerRequest.setLng(globalLocations[i][1]);
            }
            playerInfo.setProblemMarker(markerRequest);
        }

        gameInfo.getRounds()[i].setProblem(playerInfo.getProblemMarker());

        setRedisValue(roomId, gameInfo);

        return playerInfo.getProblemMarker();
    }

    public GameInfo endRound(String roomId, int currentRound) throws JsonProcessingException {
        GameInfo gameInfo = getRedisValue(roomId, GameInfo.class);
        gameInfo.setCode(MessageCode.ROUND_RESULT);
        RoundInfo roundInfo = gameInfo.getRounds()[currentRound];
        MarkerRequest problem = roundInfo.getProblem();
        List<Player> players = gameInfo.getPlayers();
        for (Player player : players) {
            String key = "member_" + player.getId();
            PlayerInfo playerInfo = getRedisValue(key, PlayerInfo.class);
            MarkerRequest answer = playerInfo.getAnswerMarkers()[currentRound];
            double distance = 100000000;
            if (answer != null) {
                distance = distanceCalculator.calculateDistance(problem.getLat(), problem.getLng(), answer.getLat(), answer.getLng(), "meter");
            } else {
                answer = new MarkerRequest();
            }
            answer.setRequester(player);
            Score score = new Score();
            score.setAnswer(answer);
            score.setDistance(distance);
            roundInfo.getScores().add(score);
        }
        setRedisValue(roomId, gameInfo);
        return gameInfo;
    }

    public void submitAnswer(MarkerRequest markerRequest, String roomId) throws JsonProcessingException {
        GameInfo gameInfo = getRedisValue(roomId, GameInfo.class);
        int currentRound = gameInfo.getCurrentRound() - 1;

        String key = "member_" + markerRequest.getRequester().getId();
        PlayerInfo playerInfo = getRedisValue(key, PlayerInfo.class);
        playerInfo.getAnswerMarkers()[currentRound] = markerRequest;
        setRedisValue(key, playerInfo);
    }
}

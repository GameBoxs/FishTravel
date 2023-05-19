export type TGameInfo = {
  roomId: string;
  code: TMessageCode | null;
  managerId: number;
  maxPlayers: number;
  players: Array<TPlayer> | null;
  currentRound: number
  rounds: Array<TRoundInfo> | null;
  domestic: boolean;
}

export enum TMessageCode {
  CHAT = "CHAT",
  ENTER = "ENTER",
  LOBBY = "LOBBY",
  GAME_START = "GAME_START",
  PICK_FISH = "PICK_FISH",
  WAIT_FOR_NEXT_ROUND = "WAIT_FOR_NEXT_ROUND",
  IN_ROUND = "IN_ROUND",
  ROUND_RESULT = "ROUND_RESULT",
  FINAL_RESULT = "FINAL_RESULT",
  WAITING = "WAITING",
};

export type TPlayer = {
  id: number;
  name: string;
}
export type TRoundInfo = {
  roundOrder: number;
  problem: TMarkerRequest;
  scores: Array<TScore>;
}

export type TScore = {
  answer: TMarkerRequest;
  distance: number;
}

export type TBroadcastMessage<T> = {
  code: TMessageCode;
  data: T;
} 
export type TMarkerRequest = TPlayerRequest & {
  name: string;
  lat: number;
  lng: number; 
}
export type TPlayerRequest = {
  requester: TPlayer;
}

export type TRanking = {
  player: TPlayer,
  scoreSum: number,
}
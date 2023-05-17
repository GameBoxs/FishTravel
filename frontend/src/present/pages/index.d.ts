export type TGameInfo = {
  roomId: string;
  code: MessageCode;
  isDomestic: boolean;
  managerId: number;
  maxPlayers: number;
  players: Array<TPlayer>;
  round: Array<TRound>;
}

export enum TMessageCode { CHAT, ENTER, LOBBY, GAME_START, PICK_FISH, WAIT_FOR_NEXT_ROUND, IN_ROUND, ROUND_RESULT, FINAL_RESULT };

export type TPlayer = {
  id: number;
  name: string;
}
export type TRound = {
  roundOrder: number;
  scores: Array<TScore>;
}

export type TScore = {
  point: number;
  memberId: number;
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
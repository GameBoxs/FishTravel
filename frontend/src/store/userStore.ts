// authStore.ts
import create from 'zustand';

type State = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  removeAccessToken: () => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  removeIsLogin: () => void;
  id: string | null;
  setId: (id: string) => void;
  removeId: () => void;
  name: string | null;
  setName: (name: string) => void;
  removeName: () => void;
  profileImage: string | null;
  setProfileImage: (profileImage: string) => void;
  removeProfileImage: () => void;
  connection: any | null;
  setConnection: (connection: any) => void;
  removeConnection: () => void;
  code: string | null;
  setCode: (code: string) => void;
  removeCode: () => void;
  roomId: string | null;
  setRoomId: (roomId: string) => void;
  removeRoomId: () => void;
  managerId: number | null;
  setManagerId: (managerId: number) => void;
  removeManagerId: () => void;
  maxPlayers: number | null;
  setMaxPlayers: (maxPlayers: number) => void;
  removeMaxPlayers: () => void;
  players: any | null;
  setPlayers: (players: any) => void;
  removePlayers: () => void;
  rounds: number | null;
  setRounds: (rounds: number) => void;
  removeRounds: () => void;
};

export const useUserStore = create<State>((set) => ({
  accessToken: null,
  isLogin: false,
  id: null,
  profileImage: null,
  name: null,
  connection: null,
  code: null,
  roomId: null,
  managerId: null,
  maxPlayers: null,
  players: null,
  rounds: null,
  setAccessToken: (token) => set(() => ({ accessToken: token })),
  removeAccessToken: () => set(() => ({ accessToken: null })),
  setIsLogin: (isLogin) => set(() => ({ isLogin: isLogin })),
  removeIsLogin: () => set(() => ({ isLogin: false })),
  setId: (id) => set(() => ({ id: id })),
  removeId: () => set(() => ({ id: null })),
  setProfileImage: (profileImage) => set(() => ({ profileImage: profileImage })),
  removeProfileImage: () => set(() => ({ profileImage: null })),
  setName: (name) => set(() => ({ name: name })),
  removeName: () => set(() => ({ name: null })),
  setConnection: (connection) => set(() => ({ connection: connection })),
  removeConnection: () => set(() => ({ connection: null })),
  setRoomId: (roomId) => set(() => ({ roomId: roomId })),
  removeRoomId: () => set(() => ({ roomId: null })),
  setManagerId: (managerId) => set(() => ({ managerId: managerId })),
  removeManagerId: () => set(() => ({ managerId: null })),
  setMaxPlayers: (maxPlayers) => set(() => ({ maxPlayers: maxPlayers })),
  removeMaxPlayers: () => set(() => ({ maxPlayers: null })),
  setCode: (code) => set(() => ({ code: code })),
  removeCode: () => set(() => ({ code: null })),
  setPlayers: (players) => set(() => ({ players: players })),
  removePlayers: () => set(() => ({ players: null })),
  setRounds: (rounds) => set(() => ({ rounds: rounds })),
  removeRounds: () => set(() => ({ rounds: null })),
}));

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
  setId: (userId: string) => void;
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
};

export const useUserStore = create<State>((set) => ({
  accessToken: null,
  isLogin: false,
  id: null,
  profileImage: null,
  name: null,
  connection: null,
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
}));

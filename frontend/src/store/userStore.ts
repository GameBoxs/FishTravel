// authStore.ts
import create from 'zustand';

type State = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  removeAccessToken: () => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  removeIsLogin: () => void;
  userId: string | null;
  setUserId: (userId: string) => void;
  removeUserId: () => void;
  name: string | null;
  setName: (name: string) => void;
  removeName: () => void;
  profileImage: string | null;
  setProfileImage: (profileImage: string) => void;
  removeProfileImage: () => void;
};

export const useUserStore = create<State>((set) => ({
  accessToken: null,
  isLogin: false,
  userId: null,
  profileImage: null,
  name: null,
  setAccessToken: (token) => set(() => ({ accessToken: token })),
  removeAccessToken: () => set(() => ({ accessToken: null })),
  setIsLogin: (isLogin) => set(() => ({ isLogin: isLogin })),
  removeIsLogin: () => set(() => ({ isLogin: false })),
  setUserId: (userId) => set(() => ({ userId: userId })),
  removeUserId: () => set(() => ({ userId: null })),
  setProfileImage: (profileImage) => set(() => ({ profileImage: profileImage })),
  removeProfileImage: () => set(() => ({ profileImage: null })),
  setName: (name) => set(() => ({ name: name })),
  removeName: () => set(() => ({ name: null })),
}));

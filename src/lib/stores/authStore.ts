import { create } from 'zustand';
import { getStorage, setStorage, removeStorage } from '@/utils/storage';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  isLoginOpen: boolean;
  setToken: (token: string) => void;
  logout: () => void;
  openLogin: () => void;
  closeLogin: () => void;
  checkLoginStatus: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: typeof window !== 'undefined' ? !!getStorage('token') : false,
  token: typeof window !== 'undefined' ? getStorage('token') : null,
  isLoginOpen: false,
  setToken: (token) => {
    setStorage('token', token);
    set({ token, isLoggedIn: true });
  },
  logout: () => {
    removeStorage('token');
    set({ token: null, isLoggedIn: false });
  },
  openLogin: () => set({ isLoginOpen: true }),
  closeLogin: () => set({ isLoginOpen: false }),
  checkLoginStatus: () => {
    const token = getStorage('token');
    if (token) {
      set({ token, isLoggedIn: true });
    } else {
      set({ token: null, isLoggedIn: false });
    }
  }
}));

export default useAuthStore;

import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  isLoginOpen: boolean;
  setToken: (token: string) => void;
  logout: () => void;
  openLogin: () => void;
  closeLogin: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isLoginOpen: false,
  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token, isLoggedIn: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, isLoggedIn: false });
  },
  openLogin: () => set({ isLoginOpen: true }),
  closeLogin: () => set({ isLoginOpen: false }),
}));

export default useAuthStore;

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  user: {
    _id: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  iat: number;
  exp: number;
}

type InnerUser = DecodedToken['user'];

interface User extends InnerUser {
  token: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (payload: { token: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: ({ token }) => {
        const decoded = jwtDecode<DecodedToken>(token);
        set({
          user: {
            ...decoded.user,
            token,
          },
          isAuthenticated: true,
        });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);



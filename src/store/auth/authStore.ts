import { createWithSignal } from "solid-zustand";

interface Authenticated {
  isAuthenticated: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const useAuthStore = createWithSignal<Authenticated>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
}));

export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);

export const useSetIsAuthenticated = () =>
  useAuthStore((state) => state.setIsAuthenticated);

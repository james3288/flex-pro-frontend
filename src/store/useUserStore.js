import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: {},
  setUser: (data) => set((state) => ({ user: data })),
}));

import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: {},
  trainersRemainingDays: 0,
  sessionDays: 0,
  extendedTrainer: [],
  setUser: (data) => set((state) => ({ user: data })),
  setTrainerRemainingDays: (data) =>
    set((state) => ({ trainersRemainingDays: data })),
  setSessionDays: (data) => set((state) => ({ sessionDays: data })),
  setExtendedTrainer: async (data) =>
    set((state) => ({ extendedTrainer: data })),
}));

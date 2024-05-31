import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: {},
  trainersRemainingDays: 0,
  sessionDays: 0,
  subscriptionRemainingDays: 0,
  extendedSubscription: 0,
  extendedTrainer: [],
  dateSubscribed: null,
  loginUsingId: false,
  setUser: (data) => set((state) => ({ user: data })),
  setTrainerRemainingDays: (data) =>
    set((state) => ({ trainersRemainingDays: data })),
  setSessionDays: (data) => set((state) => ({ sessionDays: data })),
  setExtendedTrainer: async (data) =>
    set((state) => ({ extendedTrainer: data })),
  setSubscriptionRemainingDays: async (data) =>
    set((state) => ({ subscriptionRemainingDays: data })),
  setExtendedSubscription: async (data) =>
    set((state) => ({ extendedSubscription: data })),
  setDateSubscribed: (data) => set((state) => ({ dateSubscribed: data })),
  setLoginUsingId: (data) => set((state) => ({ loginUsingId: data })),
}));

import { create } from "zustand";

export const useLogoutStore = create((set) => ({
  logoutCount: 0,
  trigger: false,
  logoutIncrement: () =>
    set((state) => ({ logoutCount: state.logoutCount + 1 })),
  triggerLogout: () => set((state) => ({ trigger: !state.trigger })),
}));

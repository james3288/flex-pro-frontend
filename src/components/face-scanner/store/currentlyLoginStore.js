import { produce } from "immer";
import { create } from "zustand";

const initialState = {
  currentlyLogin: {},
};

export const useCurrentlyLoginStore = create((set) => ({
  ...initialState,
  setCurrentlyLogin: async (data) =>
    set(
      produce((state) => {
        state.currentlyLogin = data;
      })
    ),
}));

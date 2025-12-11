import { produce } from "immer";
import { create } from "zustand";

const initialState = {
  hasVideoOutput: false,
};

export const useActiveCameraStore = create((set) => ({
  ...initialState,
  setHasVideoOutput: async (data) =>
    set(
      produce((state) => {
        state.hasVideoOutput = data;
      })
    ),
}));

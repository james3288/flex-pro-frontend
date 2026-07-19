import { produce } from "immer";
import { create } from "zustand";

const initialState = {
  isClear: false,
};

export const useClearCredentialTextField = create((set) => ({
  ...initialState,
  setIsClear: async (data) =>
    set(
      produce((state) => {
        state.isClear = data;
      })
    ),
}));

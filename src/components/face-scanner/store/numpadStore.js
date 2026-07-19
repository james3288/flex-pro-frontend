import { produce } from "immer";
import { create } from "zustand";

const initialState = {
  numpadResult: "",
};

export const useNumpadStore = create((set) => ({
  ...initialState,
  setNumpadResult: (data) =>
    set(() => ({
      numpadResult: data,
    })),
}));

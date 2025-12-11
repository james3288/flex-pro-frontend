import { produce } from "immer";
import { create } from "zustand";

const initialState = {
  isLoginWithoutCamera: false,
};

export const useLoginWithoutCameraStore = create((set) => ({
  ...initialState,
  setIsLoginWithoutCamera: async (data) =>
    set(
      produce((state) => {
        state.isLoginWithoutCamera = data;
      })
    ),
}));

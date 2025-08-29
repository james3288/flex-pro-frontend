import { produce } from "immer";
import { create } from "zustand";

const initialState = {
  currentlyLogin: null,
  userFound: null,
  numpadResult: null,
  isFound: false,
  loginAttempt: 0,
  isAlreadyLoginInDatabase: false,
};

export const useCurrentlyLoginStore = create((set) => ({
  ...initialState,
  setCurrentlyLogin: async (data) =>
    set(
      produce((state) => {
        state.currentlyLogin = data;
      })
    ),
  setUserFound: async (data) =>
    set(
      produce((state) => {
        state.userFound = data;
      })
    ),
  setIsFound: (data) =>
    set(() => ({
      isFound: data,
    })),
  setLoginAttempt: (data) =>
    set(() => ({
      loginAttempt: data,
    })),
  setIsAlreadyLoginInDatabase: (data) =>
    set(() => ({ isAlreadyLoginInDatabase: data })),
}));

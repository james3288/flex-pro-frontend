import { produce } from "immer";
import { create } from "zustand";
import getTrainors from "../getData/getTrainors";
import getDayPassUserOnline2 from "../getData/getDayPassUserOnline2";

const initialState = {
  dayPassUser: [],
  modalTitle: "",
  removeModalTitle: "",
  removeModalId: "",
  showRemoveModal: false,
  dayPassUserId: 0,
  trainors: [],
  addDayPassTrainer: {
    trainer_id: 0,
    trainingDateStarted: null,
  },
  dayPassId: 0,
  dayPassUserOnline: [],
  isLogin: false,
  isAlreadyLogin: false,
  dayPassName: "",
  remainingHours: "",
  personalTrainer: "",
  subscriptionName: "",
};

export const useDayPassStore = create((set) => ({
  ...initialState,
  setDayPassUser: async (data) =>
    set(
      produce((state) => {
        state.dayPassUser = data;
      }),
    ),
  setModalTitle: async (data) =>
    set(
      produce((state) => {
        state.modalTitle = data;
      }),
    ),
  setSubscriptionName: async (data) =>
    set(
      produce((state) => {
        state.subscriptionName = data;
      }),
    ),
  setRemoveModalTitle: async (data) =>
    set(
      produce((state) => {
        state.removeModalTitle = data;
      }),
    ),
  setDayPassUserId: async (data) =>
    set(
      produce((state) => {
        state.dayPassUserId = data;
      }),
    ),
  setRemoveModalId: async (data) =>
    set(
      produce((state) => {
        state.removeModalId = data;
      }),
    ),
  setShowRemoveModal: async (data) =>
    set(
      produce((state) => {
        state.showRemoveModal = data;
      }),
    ),
  setDayPassId: async (data) =>
    set(
      produce((state) => {
        state.dayPassId = data;
      }),
    ),
  setIsLogin: async (data) =>
    set(
      produce((state) => {
        state.isLogin = data;
      }),
    ),
  setIsAlreadyLogin: async (data) =>
    set(
      produce((state) => {
        state.isAlreadyLogin = data;
      }),
    ),
  setDayPassName: async (data) =>
    set(
      produce((state) => {
        state.dayPassName = data;
      }),
    ),
  setRemainingHours: async (data) =>
    set(
      produce((state) => {
        state.remainingHours = data;
      }),
    ),
  setPersonalTrainer: async (data) =>
    set(
      produce((state) => {
        state.personalTrainer = data;
      }),
    ),
  setTrainors: async () => {
    const data = await getTrainors();
    set(
      produce((state) => {
        state.trainors = data;
      }),
    );
  },
  setDayPassUserOnline: async (id) => {
    const data = await getDayPassUserOnline2(id);
    set(
      produce((state) => {
        state.dayPassUserOnline = data;
      }),
    );
  },

  setDayPassTrainer: (data) => {
    const trainer_id = data.trainer_id;
    const trainingDateStarted = data.trainingDateStarted;

    set(
      produce((state) => {
        state.addDayPassTrainer.trainer_id = trainer_id;
        state.addDayPassTrainer.trainingDateStarted = trainingDateStarted;
      }),
    );
  },
}));

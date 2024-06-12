import { produce } from "immer";
import { create } from "zustand";
import getTrainors from "../getData/getTrainors";

const initialState = {
  dayPassUser: [],
  modalTitle: "",
  removeModalTitle: "",
  removeModalId: "",
  dayPassUserId: 0,
  trainors: [],
  addDayPassTrainer: {
    trainer_id: 0,
    trainingDateStarted: null,
  },
  dayPassId: 0,
};

export const useDayPassStore = create((set) => ({
  ...initialState,
  setDayPassUser: async (data) =>
    set(
      produce((state) => {
        state.dayPassUser = data;
      })
    ),
  setModalTitle: async (data) =>
    set(
      produce((state) => {
        state.modalTitle = data;
      })
    ),

  setRemoveModalTitle: async (data) =>
    set(
      produce((state) => {
        state.removeModalTitle = data;
      })
    ),
  setDayPassUserId: async (data) =>
    set(
      produce((state) => {
        state.dayPassUserId = data;
      })
    ),
  setRemoveModalId: async (data) =>
    set(
      produce((state) => {
        state.removeModalId = data;
      })
    ),
  setDayPassId: async (data) =>
    set(
      produce((state) => {
        state.dayPassId = data;
      })
    ),
  setTrainors: async () => {
    const data = await getTrainors();
    set(
      produce((state) => {
        state.trainors = data;
      })
    );
  },

  setDayPassTrainer: (data) => {
    const trainer_id = data.trainer_id;
    const trainingDateStarted = data.trainingDateStarted;

    set(
      produce((state) => {
        state.addDayPassTrainer.trainer_id = trainer_id;
        state.addDayPassTrainer.trainingDateStarted = trainingDateStarted;
      })
    );
  },
}));

import { create } from "zustand";
import { produce } from "immer";

const initialState = {
  reportData: {
    subscription: "123",
    trainer: "",
    dateFrom: null,
    dateTo: null,
  },
};

export const useReportStore = create((set) => ({
  ...initialState,
  modalTitle: "",
  modalId: 0,
  setModalTitle: (data) => set((state) => ({ modalTitle: data })),
  setModalId: (data) => set((state) => ({ modalId: data })),
  setSubscription: (data) =>
    set(
      produce((state) => {
        state.reportData.subscription = data;
      })
    ),
  setTrainer: (data) =>
    set(
      produce((state) => {
        state.reportData.trainer = data;
      })
    ),
  setDateFrom: (data) =>
    set(
      produce((state) => {
        state.reportData.dateFrom = data;
      })
    ),
  setDateTo: (data) =>
    set(
      produce((state) => {
        state.reportData.dateTo = data;
      })
    ),
}));

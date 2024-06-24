import { create } from "zustand";
import { produce } from "immer";
import getSubscriptions from "../getData/getSubscriptions";

const initialState = {
  reportData: {
    subscription: "",
    selectSubscription: "223",
    trainer: "",
    dateFrom: new Date(),
    dateTo: new Date(),
  },
  modalTitle: "",
  modalId: 0,
  userSubscriptionReport: [],
  subscriptionTotalIncome: 0,
  extendedTrainerReport: [],
  extendedTrainerTotalSession: 0,
  freeTotalSession: 0,
  userSubscriptionReportByFreeTrainer: [],
  totalTrainerRate: 0,
  listOfSubscription: [],
};

export const useReportStore = create((set) => ({
  ...initialState,
  setModalTitle: (data) => set((state) => ({ modalTitle: data })),
  setModalId: (data) => set((state) => ({ modalId: data })),
  setSubscription: (data) =>
    set(
      produce((state) => {
        state.reportData.subscription = data;
      })
    ),
  setSelectSubscription: (data) =>
    set(
      produce((state) => {
        state.reportData.selectSubscription = data;
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
  // setUserSubscriptionReport: async (data) =>
  //   set((state) => ({ userSubscriptionReport: data })),
  setUserSubscriptionReport: async (data) =>
    set(
      produce((state) => {
        state.userSubscriptionReport = data;
      })
    ),
  setSubscriptionTotalIncome: async () =>
    set((state) => ({
      subscriptionTotalIncome: state?.userSubscriptionReport.reduce(
        (total, item) => total + parseFloat(item.extended_session),
        0.0 // Start accumulating from 0
      ),
    })),

  setExtendedTrainerTotalSession: async () =>
    set((state) => ({
      extendedTrainerTotalSession: state?.extendedTrainerReport?.reduce(
        (total1, item) => total1 + parseFloat(item.extended_session_day),
        0
      ),
    })),
  setFreeTotalSession: async () =>
    set((state) => ({
      freeTotalSession: state?.userSubscriptionReportByFreeTrainer?.reduce(
        (total2, item) => total2 + parseFloat(item.free_session_days),
        0
      ),
    })),
  // setExtendedTrainerReport: async (data) =>
  //   set((state) => ({ extendedTrainerReport: data })),
  setExtendedTrainerReport: async (data) =>
    set(
      produce((state) => {
        state.extendedTrainerReport = data;
      })
    ),
  setUserSubscriptionReportByFreeTrainer: async (data) =>
    set(
      produce((state) => {
        state.userSubscriptionReportByFreeTrainer = data;
      })
    ),
  setListOfSubscription: async (data) => {
    const subscriptions = await getSubscriptions();
    set(
      produce((state) => {
        state.listOfSubscription = subscriptions;
      })
    );
  },
  setTotalTrainerRate: async () =>
    set((state) => ({
      totalTrainerRate: state?.extendedTrainerReport?.reduce(
        (total3, item) => total3 + parseFloat(item.trainer_rate),
        0
      ),
    })),
}));

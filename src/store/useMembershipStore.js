import { produce } from "immer";
import { create } from "zustand";
import getTrainors from "@getData/getTrainors";
// import getmembershipUserOnline2 from "@getData/getmembershipUserOnline2";

const initialState = {
  membershipUser: [],
  modalTitle: "",
  removeModalTitle: "",
  removeModalId: "",
  membershipUserId: 0,
  trainors: [],
  addMembershipTrainer: {
    trainer_id: 0,
    trainingDateStarted: null,
  },
  membershipId: 0,
  membershipUserOnline: [],
  isLogin: false,
  isAlreadyLogin: false,
  dayPassName: "",
  remainingHours: "",
  personalTrainer: "",
  subscriptionName: "",
};

export const useMembershipStore = create((set) => ({
  ...initialState,
  setMembershipUser: async (data) =>
    set(
      produce((state) => {
        state.membershipUser = data;
      })
    ),
  setModalTitle: async (data) =>
    set(
      produce((state) => {
        state.modalTitle = data;
      })
    ),
  setSubscriptionName: async (data) =>
    set(
      produce((state) => {
        state.subscriptionName = data;
      })
    ),
  setRemoveModalTitle: async (data) =>
    set(
      produce((state) => {
        state.removeModalTitle = data;
      })
    ),
  setMembershipUserId: async (data) =>
    set(
      produce((state) => {
        state.membershipUserId = data;
      })
    ),
  setRemoveModalId: async (data) =>
    set(
      produce((state) => {
        state.removeModalId = data;
      })
    ),
  setMembershipId: async (data) =>
    set(
      produce((state) => {
        state.membershipId = data;
      })
    ),
  setIsLogin: async (data) =>
    set(
      produce((state) => {
        state.isLogin = data;
      })
    ),
  setIsAlreadyLogin: async (data) =>
    set(
      produce((state) => {
        state.isAlreadyLogin = data;
      })
    ),
  setMembershipName: async (data) =>
    set(
      produce((state) => {
        state.dayPassName = data;
      })
    ),
  setRemainingHours: async (data) =>
    set(
      produce((state) => {
        state.remainingHours = data;
      })
    ),
  setPersonalTrainer: async (data) =>
    set(
      produce((state) => {
        state.personalTrainer = data;
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
  //   setmembershipUserOnline: async (id) => {
  //     const data = await getmembershipUserOnline2(id);
  //     set(
  //       produce((state) => {
  //         state.membershipUserOnline = data;
  //       })
  //     );
  //   },

  setMembershipTrainer: (data) => {
    const trainer_id = data.trainer_id;
    const trainingDateStarted = data.trainingDateStarted;

    set(
      produce((state) => {
        state.addMembershipTrainer.trainer_id = trainer_id;
        state.addMembershipTrainer.trainingDateStarted = trainingDateStarted;
      })
    );
  },
}));

import { useReportStore } from "../store/useReportStore";

const getter = () => {
  const {
    cFreeSessionTotal,
    cTotalTrainerRate,
    cExtendedTrainerTotalSession,
    cUserSubscriptionReport,
    cSubscription,
    cSubscriptionTotalIncome,
    cSetModalTitle,
    cSetModalId,
    cSelectedUser,
  } = useReportStore((state) => ({
    cFreeSessionTotal: state.freeTotalSession,
    cTotalTrainerRate: state.totalTrainerRate,
    cExtendedTrainerTotalSession: state.extendedTrainerTotalSession,
    cUserSubscriptionReport: state.userSubscriptionReport,
    cSubscription: state.reportData.subscription,
    cSubscriptionTotalIncome: state.subscriptionTotalIncome,
    cSetModalTitle: state.setModalTitle,
    cSetModalId: state.setModalId,
    cSelectedUser: state.selectedUser,
  }));

  return {
    cFreeSessionTotal,
    cTotalTrainerRate,
    cExtendedTrainerTotalSession,
    cUserSubscriptionReport,
    cSubscription,
    cSubscriptionTotalIncome,
    cSetModalTitle,
    cSetModalId,
    cSelectedUser,
  };
};

export default getter;

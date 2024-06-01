import { useReportStore } from "./useReportStore";

//getter
export const { subscription, trainer, dateFrom, dateTo } = useReportStore(
  (state) => ({
    subscription: state.reportData.subscription,
    trainer: state.reportData.trainer,
    dateFrom: state.reportData.dateFrom,
    dateTo: state.reportData.dateTo,
  })
);

import React, { useEffect } from "react";
import { useReportStore } from "../../store/useReportStore";
import FormatDateISO from "../../others/FormatDateISO";
import getUserSubscriptionReport from "../../getData/getUserSubscriptionReport";
import FormatDate from "../../others/FormatDate";
import FormatDateOnly from "../../others/FormatDateOnly";
import getExtendedTrainerReport from "../../getData/getExtendedTrainerReport";
import getSubscriptionReportByFreeTrainer from "../../getData/getSubscriptionReportByFreeTrainer";

const GenerateReportModal = () => {
  const cModalTitle = useReportStore((state) => state.modalTitle);
  const cModalId = useReportStore((state) => state.modalId);

  //setter
  const {
    setSubscription,
    setTrainer,
    setDateFrom,
    setDateTo,
    setUserSubscriptionReport,
    setSubscriptionTotalIncome,
    setExtendedTrainerReport,
    setExtendedTrainerTotalSession,
    setUserSubscriptionReportByFreeTrainer,
    setFreeTotalSession,
    setTotalTrainerRate,
  } = useReportStore((state) => ({
    setSubscription: state.setSubscription,
    setTrainer: state.setTrainer,
    setDateFrom: state.setDateFrom,
    setDateTo: state.setDateTo,
    setUserSubscriptionReport: state.setUserSubscriptionReport,
    setSubscriptionTotalIncome: state.setSubscriptionTotalIncome,
    setExtendedTrainerReport: state.setExtendedTrainerReport,
    setExtendedTrainerTotalSession: state.setExtendedTrainerTotalSession,
    setUserSubscriptionReportByFreeTrainer:
      state.setUserSubscriptionReportByFreeTrainer,
    setFreeTotalSession: state.setFreeTotalSession,
    setTotalTrainerRate: state.setTotalTrainerRate,
  }));

  //getter
  const { subscription, trainer, dateFrom, dateTo } = useReportStore(
    (state) => ({
      subscription: state.reportData.subscription,
      trainer: state.reportData.trainer,
      dateFrom: state.reportData.dateFrom,
      dateTo: state.reportData.dateTo,
    })
  );

  // const cSubscription = useReportStore(
  //   (state) => state.reportData.subscription
  // );

  const handleChange = (e) => {
    switch (e.target.name) {
      case "trainer":
        setTrainer(e.target.value);
        break;
      case "subscription":
        setUserSubscriptionReport([]);
        setExtendedTrainerReport([]);
        setUserSubscriptionReportByFreeTrainer([]);
        setSubscriptionTotalIncome(0);
        setExtendedTrainerTotalSession(0);
        setFreeTotalSession(0);
        setTotalTrainerRate(0);
        setSubscription(e.target.value);
        break;
      case "dateFrom":
        setDateFrom(e.target.value);
        break;
      case "dateTo":
        setDateTo(e.target.value);
        break;
      default:
        break;
    }
  };

  // useEffect(() => {
  //   console.log(subscription);
  // }, [subscription]);

  const handleOnSearch = async () => {
    const dFrom = new Date(dateFrom);
    const dTo = new Date(dateTo);

    // To include the end date, add one day to toDate
    dTo.setDate(dTo.getDate() + 1);

    const getDataByAll = async () => {
      setUserSubscriptionReport(
        dFrom !== null &&
          dTo !== null &&
          (await getUserSubscriptionReport(
            FormatDateOnly(dFrom),
            FormatDateOnly(dTo)
          ))
      );

      await setSubscriptionTotalIncome();
      // await getUserSubscriptionReport()
    };

    const getByExtendedTrainer = async () => {
      setExtendedTrainerReport(
        dFrom !== null &&
          dTo !== null &&
          (await getExtendedTrainerReport(
            FormatDateOnly(dFrom),
            FormatDateOnly(dTo),
            trainer
          ))
      );
      await setExtendedTrainerTotalSession();
      await setTotalTrainerRate();
      // await getUserSubscriptionReport()
    };

    const getFreeTrainer = async () => {
      setUserSubscriptionReportByFreeTrainer(
        dFrom !== null &&
          dTo !== null &&
          (await getSubscriptionReportByFreeTrainer(
            FormatDateOnly(dFrom),
            FormatDateOnly(dTo),
            trainer
          ))
      );

      await setFreeTotalSession();
      // await getUserSubscriptionReport()
    };

    if (subscription === "all") {
      getDataByAll();
    } else if (subscription === "extended-trainer") {
      getByExtendedTrainer();
    } else if (subscription === "free-trainer") {
      getFreeTrainer();
    }
  };

  // const formatDateTimeLocal = (date) => {
  //   return new Date(date).toISOString().slice(0, 16);
  // };

  return (
    <>
      <div
        className="modal fade"
        id={cModalId}
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {cModalTitle}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <label className="col-form-label">Subscription</label>
              <div>
                <select
                  className="mySelect"
                  name="subscription"
                  onChange={handleChange}
                >
                  <option value={0}>-- Select Extended Subscription --</option>
                  <option value="all">All</option>
                  <option value="extended-trainer">Extended Trainer</option>
                  <option value="free-trainer">Free Trainer</option>
                </select>

                <br />
                <span style={{ color: "red" }}>select subscriptions</span>
              </div>
              {subscription === "all" ? (
                ""
              ) : (
                <>
                  <label className="col-form-label">Trainer (optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="personal-training-session"
                    name="trainer"
                    onChange={handleChange}
                    value={trainer}
                  />
                </>
              )}

              <label className="col-form-label">Date From:</label>
              <input
                type="datetime-local"
                className="form-control"
                name="dateFrom"
                onChange={handleChange}
                value={dateFrom}
              />

              <label className="col-form-label">Date To:</label>
              <input
                type="datetime-local"
                className="form-control"
                name="dateTo"
                onChange={handleChange}
                value={dateTo}
              />
              <label className="col-form-label" style={{ color: "red" }}>
                {dateTo === "" && "please select a valid date"}
              </label>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleOnSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateReportModal;

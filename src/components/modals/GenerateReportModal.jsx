import React, { useEffect } from "react";
import { useReportStore } from "../../store/useReportStore";
import FormatDateISO from "../../others/FormatDateISO";
import getUserSubscriptionReport from "../../getData/getUserSubscriptionReport";
import FormatDate from "../../others/FormatDate";
import FormatDateOnly from "../../others/FormatDateOnly";
import getExtendedTrainerReport from "../../getData/getExtendedTrainerReport";
import getSubscriptionReportByFreeTrainer from "../../getData/getSubscriptionReportByFreeTrainer";
import getUserSubscriptionReportByAll from "../../getData/getUserSubscriptionReportByAll";
import { Button, Modal } from "react-bootstrap";

const GenerateReportModal = ({ show, onHide }) => {
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
    setSelectSubscription,
    setListOfSubscription,
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
    setSelectSubscription: state.setSelectSubscription,
    setListOfSubscription: state.setListOfSubscription,
  }));

  //getter
  const {
    subscription,
    trainer,
    dateFrom,
    dateTo,
    selectSubscription,
    listOfSubscription,
  } = useReportStore((state) => ({
    subscription: state.reportData.subscription,
    trainer: state.reportData.trainer,
    dateFrom: state.reportData.dateFrom,
    dateTo: state.reportData.dateTo,
    selectSubscription: state.reportData.selectSubscription,
    listOfSubscription: state.listOfSubscription,
  }));

  // const cSubscription = useReportStore(
  //   (state) => state.reportData.subscription
  // );

  // HANDLE ON CHANGE
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
        setListOfSubscription();

        break;

      case "dateFrom":
        setDateFrom(e.target.value);
        break;

      case "dateTo":
        setDateTo(e.target.value);
        break;

      case "selectSubscription":
        setSelectSubscription(e.target.value);
        // console.log(e.target.value);
        break;

      default:
        break;
    }
  };

  // useEffect(() => {
  //   console.log(dateFrom, dateTo, selectSubscription);
  // }, [listOfSubscription]);

  // ON SEARCH
  const handleOnSearch = async () => {
    const dFrom = new Date(dateFrom);
    const dTo = new Date(dateTo);

    // To include the end date, add one day to toDate
    dTo.setDate(dTo.getDate() + 1);

    const getDataByAll = async () => {
      if (selectSubscription === "select-all") {
        setUserSubscriptionReport(
          dFrom !== null &&
            dTo !== null &&
            (await getUserSubscriptionReportByAll(
              FormatDateOnly(dFrom),
              FormatDateOnly(dTo),
            )),
        );
      } else {
        setUserSubscriptionReport(
          dFrom !== null &&
            dTo !== null &&
            (await getUserSubscriptionReport(
              FormatDateOnly(dFrom),
              FormatDateOnly(dTo),
              selectSubscription,
            )),
        );
      }

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
            trainer,
          )),
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
            trainer,
          )),
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
    } else if (subscription === "select-all") {
    }
  };

  // const formatDateTimeLocal = (date) => {
  //   return new Date(date).toISOString().slice(0, 16);
  // };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{cModalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <label className="col-form-label">Category</label>
        <div>
          <select
            className="mySelect"
            name="subscription"
            onChange={handleChange}
          >
            <option value={0}>---- Select Category ----</option>
            <option value="all">All</option>
            <option value="extended-trainer">
              Extended Trainer/Personal Trainer
            </option>
            <option value="free-trainer">Free Trainer</option>
            <option value="clients-on-workout">Clients On Workout</option>
          </select>

          <br />
          <span style={{ color: "red" }}>select subscriptions</span>
        </div>
        {subscription === "all" ? (
          // add subscription fields here
          <>
            <label className="col-form-label">Subscription</label>
            <div>
              <select
                className="mySelect"
                name="selectSubscription"
                onChange={handleChange}
              >
                <option value={""}>-- Select Subscription --</option>
                <option
                  key={"select-all"}
                  value={"select-all"}
                  style={{ color: "green" }}
                >
                  SELECT ALL SUBSCRIPTION
                </option>
                {listOfSubscription?.map((subscription) => (
                  <option
                    key={subscription.id}
                    value={subscription?.gym_rate_desc?.toLowerCase()}
                  >
                    {subscription?.gym_rate_desc}
                  </option>
                ))}
              </select>
            </div>
          </>
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
      </Modal.Body>

      <Modal.Footer>
        {" "}
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleOnSearch}>
          Search
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GenerateReportModal;

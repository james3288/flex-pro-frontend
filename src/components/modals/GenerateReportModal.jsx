import React, { useEffect } from "react";
import { useReportStore } from "../../store/useReportStore";
import FormatDateISO from "../../others/FormatDateISO";

const GenerateReportModal = () => {
  const cModalTitle = useReportStore((state) => state.modalTitle);
  const cModalId = useReportStore((state) => state.modalId);

  //setter
  const { setSubscription, setTrainer, setDateFrom, setDateTo } =
    useReportStore((state) => ({
      setSubscription: state.setSubscription,
      setTrainer: state.setTrainer,
      setDateFrom: state.setDateFrom,
      setDateTo: state.setDateTo,
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
      case "subscription":
        setSubscription(e.target.value);
      case "dateFrom":
        setDateFrom(e.target.value);

      case "dateTo":
        setDateTo(e.target.value);
    }
  };

  useEffect(() => {
    console.log(subscription);
  }, [subscription]);

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
                </select>

                <br />
                <span style={{ color: "red" }}>select subscriptions</span>
              </div>
              <label className="col-form-label">Trainer (optional)</label>
              <input
                type="text"
                className="form-control"
                id="personal-training-session"
                name="trainer"
                onChange={handleChange}
                value={trainer}
              />
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
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>

              <button type="button" className="btn btn-primary">
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

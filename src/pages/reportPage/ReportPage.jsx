import "./reportPage.scss";
import logo from "./../../assets/img/logo-2.png";
import GenerateReportModal from "../../components/modals/GenerateReportModal";
import { useReportStore } from "./../../store/useReportStore";
import formatTime from "../../others/ReadableFormatTime";
import FormatDateISO from "../../others/FormatDateISO";
import FormatDateOnly from "../../others/FormatDateOnly";
import { useState } from "react";
import ByAll from "./ByAll";
import ByExtendedTrainer from "./ByExtendedTrainer";
const ReportPage = () => {
  const cSetModalTitle = useReportStore((state) => state.setModalTitle);
  const cSetModalId = useReportStore((state) => state.setModalId);
  const cUserSubscriptionReport = useReportStore(
    (state) => state.userSubscriptionReport
  );
  const cSubscriptionTotalIncome = useReportStore(
    (state) => state.subscriptionTotalIncome
  );

  const cExtendedTrainerTotalSession = useReportStore(
    (state) => state.extendedTrainerTotalSession
  );
  const cSubscription = useReportStore(
    (state) => state.reportData.subscription
  );

  const [total, setTotal] = useState(0);

  const handleGenerateData = () => {
    cSetModalTitle("Generate Report");
    cSetModalId("generate-report-data");
  };

  return (
    <div className="container wrapper">
      <div className="banner">
        <img src={logo} alt="" />
        <button
          className="btn btn-danger"
          onClick={handleGenerateData}
          data-toggle="modal"
          data-target="#generate-report-data"
          data-whatever="@mdo"
        >
          Generate
        </button>
      </div>
      {cSubscription === "all" || cSubscription === "free-trainer" ? (
        <div className="row header">
          <div className="col-2 header-col">User</div>
          <div className="col-2 header-col">Date Subscribed</div>
          <div className="col-2 header-col">Subscription</div>
          <div className="col-2 header-col">Free Trainer</div>
          <div className="col-2 header-col">Rate</div>
          <div className="col-2 header-col">Per</div>
        </div>
      ) : (
        <div className="row header">
          <div className="col-2 header-col">User</div>
          <div className="col-2 header-col">Date Extended</div>
          <div className="col-2 header-col">Subscription</div>
          <div className="col-2 header-col">Trainer</div>
          <div className="col-2 header-col">Session days</div>
          <div className="col-2 header-col">Per</div>
        </div>
      )}

      {/* {cUserSubscriptionReport?.map((item) => (
        <>
          <div className="row body" key={item?.id}>
            <div className="col-2">
              <div className="body-col">{item?.user}</div>
            </div>
            <div className="col-2">
              <div className="body-col">
                {FormatDateOnly(item?.date_subscribed)}
                {item?.date_su}
              </div>
            </div>
            <div className="col-2">
              <div className="body-col">{item?.gym_rate_desc}</div>
            </div>
            <div className="col-2">
              <div className="body-col">{item?.trainer}</div>
            </div>
            <div className="col-2">
              <div className="body-col">{item?.rate?.toLocaleString()}</div>
            </div>
            <div className="col-2">
              <div className="body-col">{item?.category}</div>
            </div>
          </div>
        </>
      ))} */}

      {cSubscription === "all" ? <ByAll /> : <ByExtendedTrainer />}

      <div className="row total">
        <div className="col-2 total-col"></div>
        <div className="col-2 total-col"></div>
        <div className="col-2 total-col"></div>
        <div className="col-2 total-col">
          <h2>TOTAL:</h2>
        </div>
        <div className="col-2 total-col">
          <h2>
            {cSubscription === "all"
              ? cSubscriptionTotalIncome.toLocaleString()
              : cExtendedTrainerTotalSession + " DAYS"}
          </h2>
        </div>
        <div className="col-2 total-col"></div>
      </div>

      <GenerateReportModal />
    </div>
  );
};

export default ReportPage;

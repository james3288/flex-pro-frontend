import "./reportPage.scss";
import logo from "./../../assets/img/logo-2.png";
import GenerateReportModal from "../../components/modals/GenerateReportModal";
import { useReportStore } from "./../../store/useReportStore";
const ReportPage = () => {
  const cSetModalTitle = useReportStore((state) => state.setModalTitle);
  const cSetModalId = useReportStore((state) => state.setModalId);

  const handleGenerateData = () => {
    cSetModalTitle("Generate Report");
    cSetModalId("generate-report-data");
  };
  return (
    <div className="container">
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
      <div className="row header">
        <div className="col-3 header-col">User</div>
        <div className="col-2 header-col">Date Subscribed</div>
        <div className="col-3 header-col">Subscription</div>
        <div className="col-2 header-col">Free Trainer</div>
        <div className="col-2 header-col">Rate</div>
      </div>

      <GenerateReportModal />
    </div>
  );
};

export default ReportPage;

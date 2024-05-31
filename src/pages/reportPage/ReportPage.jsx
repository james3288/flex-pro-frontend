import "./reportPage.scss";
import logo from "./../../assets/img/logo-2.png";
const ReportPage = () => {
  return (
    <div className="container">
      <div className="banner">
        <img src={logo} alt="" />
        <button className="btn btn-danger">Generate</button>
      </div>
      <div className="row header">
        <div className="col-3 header-col">User</div>
        <div className="col-2 header-col">Date Subscribed</div>
        <div className="col-3 header-col">Subscription</div>
        <div className="col-2 header-col">Free Trainer</div>
        <div className="col-2 header-col">Rate</div>
      </div>
    </div>
  );
};

export default ReportPage;

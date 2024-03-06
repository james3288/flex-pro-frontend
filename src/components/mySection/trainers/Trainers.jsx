import React from "react";
import Pic1 from "./../../../assets/img/team/team-2.jpg";
import Pic2 from "./../../../assets/img/team/team-1.jpg";
import Pic3 from "./../../../assets/img/team/team-3.jpg";
import Pic4 from "./../../../assets/img/team/team-4.jpg";
import Pic5 from "./../../../assets/img/team/team-5.jpg";
import Pic6 from "./../../../assets/img/team/team-6.jpg";
const Trainers = () => {
  return (
    // <div className="clients-online">
    //   <div className="row row2">
    //     <div className="col-3">
    //       <img
    //         src={blobPix}
    //         alt=""
    //         className="circle"
    //         style={{ border: "2px solid red" }}
    //       />
    //     </div>
    //     <div className="col-7">
    //       <div className="clients-flex">
    //         <h5>{registeredName}</h5>
    //         <p>weights: {weights}</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="row">
      <div className="col-lg-2 col-sm-3">
        <div className="ts-item set-bg bg">
          <img src={Pic3} alt="" />
          <div className="ts_text">
            <h4>Jackie Chan</h4>
            <span>Gym Trainer</span>
            <button className="btn btn-success">Select</button>
            {/* <div className="tt_social"></div> */}
          </div>
        </div>
      </div>
      <div className="col-lg-2 col-sm-3">
        <div className="ts-item set-bg bg">
          <img src={Pic1} alt="" />
          <div className="ts_text">
            <h4>John Mayer</h4>
            <span>Gym Trainer</span>
            <button className="btn btn-success">Select</button>
            {/* <div className="tt_social"></div> */}
          </div>
        </div>
      </div>
      <div className="col-lg-2 col-sm-3">
        <div className="ts-item set-bg bg">
          <img src={Pic2} alt="" />
          <div className="ts_text">
            <h4>Athart Rachel</h4>
            <span>Gym Trainer</span>
            <button className="btn btn-success">Select</button>
            {/* <div className="tt_social"></div> */}
          </div>
        </div>
      </div>
      <div className="col-lg-2 col-sm-3">
        <div className="ts-item set-bg bg">
          <img src={Pic4} alt="" />
          <div className="ts_text">
            <h4>Athart Rachel</h4>
            <span>Gym Trainer</span>
            <button className="btn btn-success">Select</button>
            {/* <div className="tt_social"></div> */}
          </div>
        </div>
      </div>
      <div className="col-lg-2 col-sm-3">
        <div className="ts-item set-bg bg">
          <img src={Pic5} alt="" />
          <div className="ts_text">
            <h4>Athart Rachel</h4>
            <span>Gym Trainer</span>
            <button className="btn btn-success">Select</button>
            {/* <div className="tt_social"></div> */}
          </div>
        </div>
      </div>
      <div className="col-lg-2 col-sm-3">
        <div className="ts-item set-bg bg">
          <img src={Pic6} alt="" />
          <div className="ts_text">
            <h4>Athart Rachel</h4>
            <span>Gym Trainer</span>
            <button className="btn btn-success">Select</button>
            {/* <div className="tt_social"></div> */}
          </div>
        </div>
      </div>
    </div>
    



  );
};

export default Trainers;

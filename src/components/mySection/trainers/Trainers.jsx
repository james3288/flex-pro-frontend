import React from "react";
import Pic1 from "./../../../assets/img/team/team-2.jpg";
import Pic2 from "./../../../assets/img/team/team-1.jpg";
import Pic3 from "./../../../assets/img/team/team-3.jpg";
import Pic4 from "./../../../assets/img/team/team-4.jpg";
import Pic5 from "./../../../assets/img/team/team-5.jpg";
import Pic6 from "./../../../assets/img/team/team-6.jpg";
const Trainers = ({ name, position, image }) => {
  return (
    <div className="col-lg-2 col-sm-3">
      <div className="ts-item set-bg bg">
        <img src={image} alt="" />
        <div className="ts_text">
          <h4>{name}</h4>
          <span>{position}</span>
          <button className="btn btn-success">Select</button>
          {/* <div className="tt_social"></div> */}
        </div>
      </div>
    </div>
  );
};

export default Trainers;

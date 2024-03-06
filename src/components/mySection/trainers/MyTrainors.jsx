import React from "react";
import Pic1 from "./../../../assets/img/team/team-2.jpg";
import Pic2 from "./../../../assets/img/hero/hero-1.jpg";
import Pic3 from "./../../../assets/img/team/team-3.jpg";
import Trainers from "./Trainers";
import TrainersModal from "./trainersModal";
const MyTrainors = () => {
  return (
    <>
      <section className="team-section team-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="team-title">
                <div className="section-title">
                  <span>Our Team</span>
                  <h2>TRAIN WITH EXPERTS</h2>
                </div>
                <button
                  className="primary-btn btn-normal appoinment-btn"
                  data-toggle="modal"
                  data-target="#trainersModal"
                  data-whatever="@mdo"
                >
                  Add Trainor
                </button>
              </div>
            </div>
          </div>
          <Trainers />
        </div>

        <TrainersModal />
      </section>
    </>
  );
};

export default MyTrainors;

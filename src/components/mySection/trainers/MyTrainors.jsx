import React, { useEffect, useMemo, useState } from "react";
import Pic1 from "./../../../assets/img/team/team-2.jpg";
import Pic2 from "./../../../assets/img/hero/hero-1.jpg";
import Pic3 from "./../../../assets/img/team/team-3.jpg";
import Trainers from "./Trainers";
import TrainersModal from "./trainersModal";
import getTrainors from "../../../getData/getTrainors";
import { useQuery } from "@tanstack/react-query";

const MyTrainors = () => {
  // useEffect(() => {
  //   const trainorData = async () => {
  //     return await getTrainors();
  //   };

  //   console.log(trainorData());
  // }, []);

  const [selectedTrainer, setSelectedTrainer] = useState();
  // useEffect(() => {
  //   // console.log(selectedTrainer);
  // }, [selectedTrainer]);

  const queryKey = useMemo(() => ["forTrainorsData"], []);

  const { isPending, error, data } = useQuery({
    queryKey,
    queryFn: () => getTrainors(),
    // refetchInterval: 1000,
  });

  if (isPending)
    return (
      <div id="preloder">
        <div class="loader"></div>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return (
    <>
      <section
        className="team-section team-page"
        style={{ paddingTop: "20px" }}
      >
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
          <div className="row">
            {data?.map(
              (trainor, index) => (
                <Trainers
                  key={index}
                  name={trainor.name}
                  position={trainor.position}
                  image={trainor.image}
                  trainer_id={trainor.id}
                  trainor={trainor}
                  setSelectedTrainer={setSelectedTrainer}
                />
              )
              // console.log(trainor)
            )}
          </div>
        </div>
      </section>

      <TrainersModal id={"trainersModal"} option={"Save"} />
      <TrainersModal
        id={"trainersModal2"}
        option={"Update"}
        selectedTrainer={selectedTrainer}
      />
    </>
  );
};

export default MyTrainors;

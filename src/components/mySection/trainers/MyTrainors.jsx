import React, { useEffect, useMemo, useState } from "react";
import Trainers from "./Trainers";
// import TrainersModal from "./trainersModal";
import getTrainors from "@getData/getTrainors";
import { useQuery } from "@tanstack/react-query";
import TrainersModal from "./TrainersModal";
import DeleteTrainerModal from "./DeleteTrainerModal";

const MyTrainors = () => {
  const [selectedTrainer, setSelectedTrainer] = useState();
  const [showTrainerModal, setShowTrainerModal] = useState();
  const [showCreateTrainerModal, setShowCreateTrainerModal] = useState();
  const [showDeleteTrainerModal, setShowDeleteTrainerModal] = useState();

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
                  onClick={() => setShowCreateTrainerModal(true)}
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
                  setShowTrainerModal={setShowTrainerModal}
                  setShowDeleteTrainerModal={setShowDeleteTrainerModal}
                />
              ),
              // console.log(trainor)
            )}
          </div>
        </div>
      </section>

      <TrainersModal
        id={"trainersModal"}
        option={"Save"}
        show={showCreateTrainerModal}
        onHide={() => setShowCreateTrainerModal(false)}
      />
      <TrainersModal
        id={"trainersModal2"}
        option={"Update"}
        selectedTrainer={selectedTrainer}
        show={showTrainerModal}
        onHide={() => setShowTrainerModal(false)}
      />
      <DeleteTrainerModal
        id={"deleteTrainersModal"}
        trainer_id={selectedTrainer?.id}
        show={showDeleteTrainerModal}
        onHide={() => setShowDeleteTrainerModal(false)}
      />
    </>
  );
};

export default MyTrainors;

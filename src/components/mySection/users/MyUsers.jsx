import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useRef, useState } from "react";
import getUsers from "../../../getData/getUsers";
import Users from "./Users";
import UsersModal from "./usersModal";
import DeleteUserModal from "./DeleteUserModal";
import UserContractModal from "./UserContractModal";
import LoadingEffect from "../loadingEffect/LoadingEffect";
import NoDataFound from "../noDataFound/NoDataFound";

const MyUsers = () => {
  const searchRef = useRef();
  const [selectedUser, setSelectedUser] = useState();
  const [filterData, setFilterData] = useState([]);
  const [counter, setCounter] = useState(0);

  const queryKey = useMemo(() => ["forUsersData"], []);

  const { isPending, error, data } = useQuery({
    queryKey,
    queryFn: () => getUsers(),
    // refetchInterval: 1000,
  });

  if (isPending)
    return (
      <div id="preloder">
        <div className="loader"></div>
      </div>
    );

  // if (error)
  //   return (
  //     <div className="">
  //       <div>
  //         <LoadingEffect />
  //         <h1>{error.message}</h1>
  //       </div>
  //     </div>
  //   );

  console.log(data);

  const handleOnChange = async (e) => {
    setFilterData(() =>
      data.filter(
        (row) =>
          row.flex_pro_user.name &&
          row.flex_pro_user.name
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
      )
    );

    setCounter((prev) => prev + 1);
  };

  return (
    <>
      <section
        className="team-section team-page"
        style={{ paddingTop: "20px" }}
      >
        {error ? ( // ERROR HERE
          <NoDataFound />
        ) : (
          // INFOR HERE
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-2">
                <div className="team-title">
                  <div className="section-title">
                    <span>Flex Pro</span>
                    <h2>CLIENTS/USERS</h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-10">
                <div className="team-title">
                  <div className="section-title">
                    <span>Search User:</span>
                    <div className="searchuser">
                      <input
                        ref={searchRef}
                        type="text"
                        placeholder="search user here..."
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {counter > 0 && filterData && filterData.length > 0 ? (
                filterData?.map(
                  (user, index) => (
                    <Users
                      key={index}
                      name={user.flex_pro_user.name}
                      weight={user.flex_pro_user.weights}
                      image={user.image}
                      user_id={user.flex_pro_user.id}
                      user={user}
                      setSelectedUser={setSelectedUser}
                      contactNo={user.flex_pro_user.contact_number}
                    />
                  )
                  // console.log(trainor)
                )
              ) : counter === 0 ? (
                data?.map(
                  (user, index) => (
                    <Users
                      key={index}
                      name={user.flex_pro_user.name}
                      weight={user.flex_pro_user.weights}
                      image={user.image}
                      user_id={user.flex_pro_user.id}
                      user={user}
                      setSelectedUser={setSelectedUser}
                      contactNo={user.flex_pro_user.contact_number}
                    />
                  )
                  // console.log(trainor)
                )
              ) : (
                <div className="col-lg-12 col-sm-3">
                  <div className="ts-item set-bg bg">
                    <h3 style={{ textAlign: "center", color: "orange" }}>
                      No user has been found...
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
      <UsersModal
        id={"usersModal1"}
        option={"Update"}
        name={selectedUser?.flex_pro_user?.name}
        selectedUsers={selectedUser}
      />
      <DeleteUserModal
        id={"deleteUserModal"}
        user_id={selectedUser?.flex_pro_user?.id}
      />

      <UserContractModal id={"userContractModal"} user={selectedUser} />

      {/* <TrainersModal
        id={"usersModal"}
        option={"Update"}
        selectedTrainer={selectedUser}
      /> */}
      {/* <DeleteTrainerModal
        id={"deleteUsersModal"}
        trainer_id={selectedUser?.id}
      /> */}
    </>
  );
};

export default MyUsers;

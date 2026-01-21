import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState, useTransition, useMemo } from "react";
import getUsers from "../../../getdata/getusers";

import Users from "./Users";
import UsersModal from "./usersModal";
import DeleteUserModal from "./DeleteUserModal";
import UserContractModal from "./UserContractModal";
import NoDataFound from "../noDataFound/NoDataFound";
import Loader3 from "../../ui/loader3/Loader3";

const MyUsers = () => {
  const [isPending2, startTransition] = useTransition();
  const searchRef = useRef();
  const [selectedUser, setSelectedUser] = useState();
  const [filterData, setFilterData] = useState([]);
  const [showUsersInfoModal, setShowUsersInfoModal] = useState(false);

  const {
    isPending,
    error,
    data = [],
  } = useQuery({
    queryKey: ["forUsersData"],
    queryFn: getUsers,
    staleTime: 1000 * 60, // cache for 1 minute
  });

  if (isPending) {
    return (
      <div id="preloder">
        <div className="loader"></div>
      </div>
    );
  }

  const handleOnChange = (e) => {
    const query = e.target.value.toLowerCase();

    startTransition(() => {
      if (!query) {
        setFilterData([]); // reset search
        return;
      }

      setFilterData(
        data.filter(
          (row) =>
            row.flex_pro_user.name &&
            row.flex_pro_user.name.toLowerCase().includes(query),
        ),
      );
    });
  };

  // Decide which dataset to render: filtered or all
  const usersToRender =
    filterData.length > 0 ? filterData : !searchRef.current?.value ? data : [];

  return (
    <>
      <section
        className="team-section team-page"
        style={{ paddingTop: "20px" }}
      >
        {error ? (
          <NoDataFound />
        ) : (
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
                        style={{ padding: "10px 20px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {isPending2 && (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Loader3 />
                </div>
              )}
              {usersToRender.length > 0 ? (
                usersToRender.map((user) => (
                  <Users
                    key={user.flex_pro_user.id}
                    name={user.flex_pro_user.name}
                    weight={user.flex_pro_user.weights}
                    image={user.image}
                    user_id={user.flex_pro_user.id}
                    user={user}
                    setSelectedUser={setSelectedUser}
                    contactNo={user.flex_pro_user.contact_number}
                    setShowUsersInfoModal={setShowUsersInfoModal}
                  />
                ))
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
        show={showUsersInfoModal}
        onHide={() => setShowUsersInfoModal(false)}
      />
      <DeleteUserModal
        id={"deleteUserModal"}
        user_id={selectedUser?.flex_pro_user?.id}
      />
      <UserContractModal id={"userContractModal"} user={selectedUser} />
    </>
  );
};

export default MyUsers;

import React, { useEffect, useState } from "react";
import instance from "../../../others/axiosInstance";

const useUsersServices = ({ setOnShow, searchField, onShow }) => {
  // const [onShow, setOnShow] = React.useState(isShow);
  const [flexProUsers, setFlexProUsers] = useState([]);
  const [searchOutput, setSearchOutput] = useState([]);

  useEffect(() => {
    //   get users here
    let getUsers = async () => {
      await instance.get(`/api/users/`).then((res) => {
        const users = res.data;

        setFlexProUsers(users);
      });
    };

    getUsers();
  }, []);

  // filtering users while typing
  useEffect(() => {
    const filteredUsers = flexProUsers.filter((user) =>
      user.flex_pro_user.name.toLowerCase().includes(searchField.toLowerCase()),
    );

    setSearchOutput(filteredUsers);
    setOnShow(true);
  }, [searchField]);

  return { onShow, searchOutput };
};

export const ListOfUsers = ({ searchField, handleSelectUser, isShow }) => {
  const [onShow, setOnShow] = React.useState(isShow);

  const { searchOutput } = useUsersServices({ setOnShow, searchField, onShow });

  return (
    <div className="list-of-user">
      {searchField.length > 0 && onShow && (
        <ul className="list-group">
          {searchOutput.map((user) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={user.flex_pro_user.id}
            >
              {user.flex_pro_user.name.toUpperCase()}
              <span
                className="badge badge-primary badge-pill dreg"
                onClick={() => {
                  handleSelectUser(
                    user.flex_pro_user.id,
                    user.flex_pro_user.name,
                    user.image1,
                  );

                  setOnShow(false);
                }}
              >
                Select
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

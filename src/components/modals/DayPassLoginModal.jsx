import { useEffect, useMemo, useState, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDayPassStore } from "../../store/useDayPassStore";

import "./daypassLoginModal.scss";
import getDaypassUser from "./../../../src/getData/getDayPassUser";
import DpUserInfo from "./DpUserInfo";
import postDayPassTimeRecords from "../../postData/postDayPassTimeRecords";
import FormatDateOnly from "../../others/FormatDateOnly";

const DayPassLoginModal = ({
  show,
  onHide,
  setIsOnGoing,
  setDayPassLogin,
  dayPassUsers,
}) => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const {
    dayPassUserId,
    modalTitle,
    dayPassUserOnline,
    setDayPassUser,
    setDayPassUserOnline,
    setIsLogin,
    setDayPassName,
    setIsAlreadyLogin,
    setSubscriptionName,
  } = useDayPassStore((state) => ({
    dayPassUserId: state.dayPassUserId,
    modalTitle: state.modalTitle,
    dayPassUserOnline: state.dayPassUserOnline,
    setDayPassUser: state.setDayPassUser,
    setDayPassUserOnline: state.setDayPassUserOnline,
    setIsLogin: state.setIsLogin,
    setDayPassName: state.setDayPassName,
    setIsAlreadyLogin: state.setIsAlreadyLogin,
    setSubscriptionName: state.setSubscriptionName,
  }));

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      const users = await getDaypassUser();
      if (isMounted) {
        setDayPassUser(users);
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, [dayPassUsers, setDayPassUser]);

  const selectedUser = useMemo(() => {
    return dayPassUsers?.find((u) => u.id === selectedUserId) || null;
  }, [selectedUserId, dayPassUsers]);

  const onChangeDaypassUser = useCallback(
    (e) => {
      const id = Number(e.target.value);
      setSelectedUserId(id || null);
      setDayPassUserOnline(id);
    },
    [setDayPassUserOnline],
  );

  const isAlreadyLoggedIn = useMemo(() => {
    return dayPassUserOnline?.some(
      (user) => FormatDateOnly(user.time_out) === "1990-01-01",
    );
  }, [dayPassUserOnline]);

  const handleLoginOnclick = async () => {
    if (!selectedUser) return;

    if (!isAlreadyLoggedIn) {
      postDayPassTimeRecords({
        dayPassId: selectedUser.id,
        time_in: new Date(),
        time_out: new Date(1990, 0, 1, 0, 0),
      });

      setIsLogin(true);
      setDayPassName(selectedUser.name);
      setIsOnGoing("on-going");
      setDayPassLogin(true);
      setIsAlreadyLogin(false);
      setSubscriptionName(selectedUser.subscription?.gym_rate_desc);
    } else {
      setIsLogin(true);
      setDayPassName(selectedUser.name);
      setIsOnGoing("already-login");
      setDayPassLogin(false);
      setIsAlreadyLogin(true);
      setSubscriptionName(selectedUser.subscription?.gym_rate_desc);
    }

    onHide(); // Close the modal after login
    setSelectedUserId(null);
  };

  return (
    <Modal show={show} onHide={onHide} style={{ zIndex: "9999" }} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <label className="col-form-label">FlexPro Daypass Users:</label>
        <br />
        <select className="mySelect" onChange={onChangeDaypassUser}>
          <option value={0}>--- Select User ---</option>
          {dayPassUsers?.map(
            (user) =>
              user?.remaining > -1 && (
                <option key={user.id} value={user.id}>
                  {user.name} - {user.subscription.gym_rate_desc}
                </option>
              ),
          )}
        </select>

        <div className="dp-user-info">
          {selectedUser && <DpUserInfo user={selectedUser} />}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        {selectedUser && (
          <Button variant="primary" onClick={handleLoginOnclick}>
            Daypass Login
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default DayPassLoginModal;

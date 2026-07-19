import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import getter from "../../getter/getter";
import { useReportStore } from "../../store/useReportStore";

const animatedComponents = makeAnimated();

const ReportsFilterModal = ({ show, onHide, onSearch }) => {
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState([]);

  const { cUserSubscriptionReport = [] } = getter();
  const [
    cSetSelectedUsers,
    cSetSubscriptionTotalIncome,
    cSetSelectedSubscriptions,
  ] = useReportStore((state) => {
    return [
      state.setSelectedUsers,
      state.setSubscriptionTotalIncome,
      state.setSelectedSubscriptions,
    ];
  });

  const myOptions = useMemo(() => {
    if (!Array.isArray(cUserSubscriptionReport)) return [];

    const uniqueUsers = [
      ...new Set(
        cUserSubscriptionReport
          .filter((item) => item?.user)
          .map((item) => item.user),
      ),
    ];

    return uniqueUsers.map((user) => ({
      value: user,
      label: user.toUpperCase(),
    }));
  }, [cUserSubscriptionReport]);

  const mySubscriptions = useMemo(() => {
    if (!Array.isArray(cUserSubscriptionReport)) return [];

    const uniqueSubscriptions = [
      ...new Set(
        cUserSubscriptionReport
          .filter((item) => item?.gym_rate_desc)
          .map((item) => item.gym_rate_desc),
      ),
    ];

    return uniqueSubscriptions.map((gym_sub) => ({
      value: gym_sub,
      label: gym_sub.toUpperCase(),
    }));
  }, [cUserSubscriptionReport]);

  const handleUserOnchange = useCallback((option) => {
    setSelectedUser(option ?? []);
    cSetSelectedUsers(option ?? []);

    cSetSubscriptionTotalIncome();
  }, []);

  const handleSubscriptionOnchange = useCallback((sub) => {
    setSelectedSubscription(sub ?? []);
    cSetSelectedSubscriptions(sub ?? []);

    cSetSubscriptionTotalIncome();
  }, []);

  const handleSearch = useCallback(() => {
    onSearch?.(selectedUser);
  }, [onSearch, selectedUser]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Filter</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <label htmlFor="users-select" className="col-form-label">
          Users
        </label>

        <Select
          inputId="users-select"
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={myOptions}
          value={selectedUser}
          onChange={handleUserOnchange}
        />

        <label htmlFor="subscription-select" className="col-form-label">
          Subscription
        </label>
        <Select
          inputId="subscription-select"
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={mySubscriptions}
          value={selectedSubscription}
          onChange={handleSubscriptionOnchange}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(ReportsFilterModal);

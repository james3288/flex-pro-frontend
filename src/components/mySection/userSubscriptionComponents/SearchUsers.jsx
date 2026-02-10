import React, { useEffect, useState } from "react";
import { ListOfUsers } from "./ListOfUsers";
import { ListOfTrainers } from "./ListOfTrainers";
import SessionDaysField from "../../subScribeNowComponents/SessionDaysField";
import z from "zod";
import { NavLink, useNavigate } from "react-router-dom";
import { use } from "react";
import { useMutation } from "@tanstack/react-query";
import instance from "../../../others/axiosInstance";
import SubscribedButton from "./components/subscribedButton/SubscribedButton";
import { is } from "zod/v4/locales";
import BackToDashboardButton from "./components/subscribedButton/BackToDashBoardButton";
import RefreshSubscription from "./components/subscribedButton/RefreshSubscription";
import { Button, Modal } from "react-bootstrap";

const useSaveSubscriptionServices = ({ data, isValid }) => {
  const [isSuccessfullySaved, setIsSuccessfullySaved] = useState(false);


  const saveSubscriptionMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await instance.post("/api/save_subscriptions/", payload);
      return res.data;
    },
    onSuccess: () => {
      setIsSuccessfullySaved(true);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const saveSubscription = async () => {
    if (!isValid) return;
    saveSubscriptionMutation.mutate(data);
  };

  const refreshSubscription = () => {
    setIsSuccessfullySaved(false);
  };

  return { saveSubscription, isSuccessfullySaved, refreshSubscription };
};

const IssueComponent = ({ countError, result }) => {
  if (countError > 0) {
    return (
      <div style={{ display: "flex", marginLeft: "20px" }}>
        <ul>
          {result?.error?.issues.map((issue) => (
            <li key={issue.path[0]} style={{ color: "red", fontSize: "14px" }}>
              {issue.message}
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

const InfoSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-info-square-fill"
      viewBox="0 0 16 16"
      style={{ color: "green" }}
    >
      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
    </svg>
  );
};

const MessageBoxModal = React.memo(
  ({ show, onHide, saveSubscription, setShowMessageAlert, result }) => {
    const [errorAlert, setErrorAlert] = useState(false);

    const countError = result?.error?.issues.length;

    return (
      <Modal show={show} onHide={onHide} style={{ zIndex: "9999" }} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <InfoSvg /> Subscription Message
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5 style={{ color: "green" }}>
            Are you sure you want to save the subscription?
          </h5>
          <span>
            {errorAlert && (
              <IssueComponent countError={countError} result={result} />
            )}
          </span>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            No
          </Button>
          <Button
            variant="success"
            onClick={() => {
              if (countError === undefined) {
                saveSubscription();
                setShowMessageAlert(false);
              } else {
                setErrorAlert(true);
              }
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  },
);

const isObjectNotEmpty = (obj) => {
  return Object.keys(obj).length > 0 ? true : false;
};

// main components
const SearchUsers = ({
  handleSelectUser,
  handleSelectTrainer,
  setSubscriptionData,
  planNow,
  subscriptionData,
  membershipData,
  handleCancelUser,
  handleCancelTrainer,
}) => {
  const [searchField, setSearchField] = useState("");
  const [trainerField, setTrainerField] = useState("");
  const [sessionDays, setSessionDays] = useState(0);
  const [showMessageAlert, setShowMessageAlert] = useState(false);
  const [promoRate, setPromoRate] = useState("");

  const subscriptionDataSchema = z.object({
    flexpro_id: z.number().gt(0, "Please select a user."),
    subscription_id: z.number(),
    date_subscribed: z.date(),
    trainer_id: z.number(),
    sub_session_days: z.number("session days must be a number.").min(0),
    promo_rate: z.number("promo rate must be a number").min(0),
    promo_option: z.string(),
  });

  const validationData = {
    flexpro_id: subscriptionData?.flexpro_id,
    subscription_id: subscriptionData?.subscription_id,
    date_subscribed: subscriptionData?.date_subscribed,
    trainer_id: subscriptionData?.trainer_id,
    sub_session_days: parseInt(sessionDays),
    promo_rate: isObjectNotEmpty(membershipData)
      ? /^\d+(\.\d+)?$/.test(String(promoRate).trim())
        ? parseFloat(promoRate)
        : NaN
      : 0,
    promo_option: isObjectNotEmpty(membershipData) ? "promo" : "",
  };

  const result = subscriptionDataSchema.safeParse(validationData);

  const { saveSubscription, isSuccessfullySaved, refreshSubscription } =
    useSaveSubscriptionServices({
      data: result.data,
      isValid: result.success,
    });

  const fieldStyle = { display: "flex", flexDirection: "column", gap: "3px" };
  return (
    <div className="row search-users">
      <div className="col-lg-12">
        <h2 style={{ color: "yellow" }}>
          {membershipData?.usersubscription?.subscription?.gym_rate_desc}
        </h2>
        {planNow.per.per === "day" && (
          // <SessionDaysField
          //   per={planNow.per.per}
          //   sessionDays={sessionDays}
          //   setSessionDays={setSessionDays}
          //   setSubscriptionData={setSubscriptionData}
          // />
          <div style={fieldStyle}>
            <label style={{ color: "orange" }}>Session days:</label>
            <input
              type="text"
              placeholder="Session days...."
              onChange={(e) => setSessionDays(e.target.value)}
              disabled={isSuccessfullySaved ? true : false}
            />
          </div>
        )}

        <div style={fieldStyle}>
          <label style={{ color: "orange" }}>FlexPro Users:</label>
          <input
            type="text"
            placeholder="Search User..."
            onChange={(e) => setSearchField(e.target.value)}
            disabled={isSuccessfullySaved ? true : false}
          />
        </div>

        <div style={fieldStyle}>
          <label style={{ color: "orange" }}>FlexPro Trainers:</label>
          <input
            type="text"
            placeholder="Search Trainer..."
            onChange={(e) => setTrainerField(e.target.value)}
            disabled={isSuccessfullySaved ? true : false}
          />
        </div>

        {isObjectNotEmpty(membershipData) && (
          <div style={fieldStyle}>
            <label style={{ color: "orange" }}>Promo Rate:</label>
            <input
              type="text"
              placeholder="Promo Rate..."
              onChange={(e) => setPromoRate(e.target.value)}
              disabled={isSuccessfullySaved ? true : false}
            />
          </div>
        )}

        <div>
          <ul>
            {result?.error?.issues.map((issue) => (
              <li
                key={issue.path[0]}
                style={{ color: "pink", fontSize: "14px" }}
              >
                {issue.message}
              </li>
            ))}
          </ul>
        </div>
        <ListOfUsers
          searchField={searchField}
          handleSelectUser={handleSelectUser}
          isShow={true}
        />
        <ListOfTrainers
          trainerField={trainerField}
          handleSelectTrainer={handleSelectTrainer}
        />

        {isSuccessfullySaved && (
          <div className="row messageBox" style={{ marginBottom: "10px" }}>
            <h3> Subscription saved successfully!</h3>
          </div>
        )}

        {isSuccessfullySaved ? (
          <div style={{ display: "flex", gap: "10px" }}>
            <NavLink to={"/"}>
              <BackToDashboardButton />
            </NavLink>
            <NavLink
              onClick={() => {
                refreshSubscription();
                setSearchField("");
                setTrainerField("");
                handleCancelUser();
                handleCancelTrainer();
              }}
            >
              <RefreshSubscription />
            </NavLink>
          </div>
        ) : (
          // <NavLink onClick={saveSubscription}>
          <NavLink
            onClick={() => {
              setShowMessageAlert(true);
            }}
          >
            <SubscribedButton />
          </NavLink>
        )}
      </div>

      <MessageBoxModal
        show={showMessageAlert}
        onHide={() => setShowMessageAlert(false)}
        saveSubscription={saveSubscription}
        setShowMessageAlert={setShowMessageAlert}
        result={result}
      />
    </div>
  );
};

export default SearchUsers;

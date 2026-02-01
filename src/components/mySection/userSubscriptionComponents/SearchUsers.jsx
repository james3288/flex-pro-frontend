import React, { useState } from "react";
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

const SearchUsers = ({
  handleSelectUser,
  handleSelectTrainer,
  setSubscriptionData,
  planNow,
  subscriptionData,
}) => {
  const [searchField, setSearchField] = useState("");
  const [trainerField, setTrainerField] = useState("");
  const [sessionDays, setSessionDays] = useState();

  const subscriptionDataSchema = z.object({
    flexpro_id: z.number().gt(0, "Please select a user"),
    subscription_id: z.number(),
    date_subscribed: z.date(),
    trainer_id: z.number(),
    sub_session_days: z.number().min(0),
  });

  const result = subscriptionDataSchema.safeParse({
    flexpro_id: subscriptionData?.flexpro_id,
    subscription_id: subscriptionData?.subscription_id,
    date_subscribed: subscriptionData?.date_subscribed,
    trainer_id: subscriptionData?.trainer_id,
    sub_session_days: subscriptionData?.sub_session_days,
  });

  const { saveSubscription, isSuccessfullySaved, refreshSubscription } =
    useSaveSubscriptionServices({
      data: result.data,
      isValid: result.success,
    });

  const navigateToDashboard = useNavigate("/");

  const fieldStyle = { display: "flex", flexDirection: "column", gap: "3px" };

  return (
    <div className="row search-users">
      <div className="col-lg-12">
        {planNow.per.per === "day" && (
          <SessionDaysField
            per={planNow.per.per}
            sessionDays={sessionDays}
            setSessionDays={setSessionDays}
            setSubscriptionData={setSubscriptionData}
          />
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
              }}
            >
              <RefreshSubscription />
            </NavLink>
          </div>
        ) : (
          <NavLink onClick={saveSubscription}>
            <SubscribedButton />
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default SearchUsers;

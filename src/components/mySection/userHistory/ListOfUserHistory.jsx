import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import FormatDate from "../../../others/FormatDate";
import UserHistory from "./UserHistory";
import { UserHistoryContext } from "../../../context/UserHistoryContext";
import LoadingEffect from "../loadingEffect/LoadingEffect";
import getExtendedTrainerForUserHistory from "../../../getData/getExtendedTrainerForUserHistory";
import formatTime from "@others/ReadableFormatTime";
import formatTimeToString from "../../../others/formatTimeToString";
import FormatDateOnly from "../../../others/FormatDateOnly";

const isMembership = ({ subscription_desc }) => {
  return subscription_desc?.toUpperCase() === "MEMBERSHIP" ? true : false;
};

const isExpired = ({ user }) => {
  return user?.extendedSubDays === "Expired" ? true : false;
};

const isSubscriptionDatasPendingOrError = ({
  subscriptionDatas,
  historyDatas,
}) => {
  return subscriptionDatas?.error ||
    subscriptionDatas?.pending ||
    historyDatas?.error ||
    historyDatas?.pending
    ? true
    : false;
};

// DATE SUBSCRIBED
const DateSubscribedComponent = memo(({ user }) => {
  return (
    <div style={{ marginBottom: "5px" }}>
      <span style={{ color: "orange" }}>
        <span style={{ fontWeight: "bold" }}>Date Subscribed:</span>
        {"  "}
        {FormatDate(user.date_subscribed)}
      </span>
    </div>
  );
});

const MembershipCard = ({ user }) => {
  return (
    <div className="col-lg-6">
      <h3 style={{ color: "yellow", marginTop: "15px" }}>
        {user.id} - {user.subscription.gym_rate_desc}
      </h3>
      <DateSubscribedComponent user={user} />
    </div>
  );
};

const getExtendedRemainingMs = (extended) => {
  const dateExtend = new Date(extended?.date_extend);
  if (isNaN(dateExtend)) {
    return 0;
  }

  const targetDate = new Date(dateExtend);
  targetDate.setDate(
    targetDate.getDate() + Number(extended?.extended_session_day || 0),
  );

  return targetDate.getTime() - Date.now();
};

const TotalTrainerRemainingDaysCard = memo(({ extendedTrainer = [] }) => {
  const totalRemainingMs = useMemo(() => {
    if (extendedTrainer == null) {
      return null;
    }

    return extendedTrainer.reduce((sum, extended) => {
      const remainingMs = getExtendedRemainingMs(extended);
      return sum + Math.max(0, remainingMs);
    }, 0);
  }, [extendedTrainer]);

  if (totalRemainingMs === null) {
    return (
      <div className="col-lg-6">
        <LoadingEffect />
      </div>
    );
  }

  const totalRemaining = Math.max(0, totalRemainingMs);
  const totalRemainingText = formatTime(totalRemaining, "days-hours-minutes");

  return (
    <div className="">
      <h4 style={{ color: "gray", marginTop: "15px" }}>
        Total Extended Remaining Days:
      </h4>
      <h5 style={{ color: "yellowgreen" }}>{totalRemainingText}</h5>
    </div>
  );
});

const RefreshButton = () => {
  return (
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM5.46058 11.0833C5.83333 7.79988 8.62406 5.25 12.0096 5.25C13.9916 5.25 15.7702 6.12471 16.9775 7.50653C17.25 7.81846 17.2181 8.29226 16.9061 8.56479C16.5942 8.83733 16.1204 8.80539 15.8479 8.49347C14.9136 7.42409 13.541 6.75 12.0096 6.75C9.45215 6.75 7.33642 8.63219 6.97332 11.0833H7.33654C7.63998 11.0833 7.91353 11.2662 8.02955 11.5466C8.14558 11.8269 8.08122 12.1496 7.86651 12.364L6.69825 13.5307C6.40544 13.8231 5.93113 13.8231 5.63832 13.5307L4.47005 12.364C4.25534 12.1496 4.19099 11.8269 4.30701 11.5466C4.42304 11.2662 4.69658 11.0833 5.00002 11.0833H5.46058ZM17.3018 10.4693C17.5947 10.1769 18.069 10.1769 18.3618 10.4693L19.53 11.636C19.7448 11.8504 19.8091 12.1731 19.6931 12.4534C19.5771 12.7338 19.3035 12.9167 19.0001 12.9167H18.5395C18.1668 16.2001 15.376 18.75 11.9905 18.75C10.0085 18.75 8.22995 17.8753 7.02263 16.4935C6.7501 16.1815 6.78203 15.7077 7.09396 15.4352C7.40589 15.1627 7.87968 15.1946 8.15222 15.5065C9.08654 16.5759 10.4591 17.25 11.9905 17.25C14.548 17.25 16.6637 15.3678 17.0268 12.9167H16.6636C16.3601 12.9167 16.0866 12.7338 15.9705 12.4534C15.8545 12.1731 15.9189 11.8504 16.1336 11.636L17.3018 10.4693Z"
        fill="#1C274C"
      />
    </svg>
  );
}

{/* ACTIVE EXTENDED TRAINER INCLUDING PREVIOUS */}
const ActiveExtendedTrainerSubscriptionsCard = memo(
  ({ extendedTrainer = [], user, user_subscription_id, isHavingMembership, noOfSubscription }) => {
    const [ref,setRef] = useState(false);

    const { countActiveExtendedTrainer, setCountActiveExtendedTrainer } =
      useContext(UserHistoryContext);

    if (extendedTrainer == null) {
      return (
        <div className="col-lg-6">
          <LoadingEffect />
        </div>
      );
    }

    if(isHavingMembership && noOfSubscription === 2){
      return "";
    }

    const activeExtendedTrainers = useMemo(
      () => (Array.isArray(extendedTrainer) ? extendedTrainer.filter((trainer) => (trainer?.PT ?? -1) >= 0) : []),
      [extendedTrainer],
    );

    const hasActiveExtendedTrainer = activeExtendedTrainers.length > 0;

    useEffect(() => {
      const nextCount = activeExtendedTrainers.reduce(
        (sum, trainer) => sum + (trainer.PT ?? 0),
        0,
      );

      setCountActiveExtendedTrainer(nextCount);
    }, [countActiveExtendedTrainer,ref]);

    if (isExpired({ user }) || !hasActiveExtendedTrainer) {
      return null;
    }

    return (
      <div className="mt-5">
        {/* <h4 className="text-secondary">
          Active Extended Trainer Subscriptions:
        </h4> */}
        <h6 style={{color:"gray"}}>Previous Subscription training days left:</h6>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <h5 className="text-warning">
            {formatTime(countActiveExtendedTrainer, "days-hours-minutes")}
          </h5>
          <button
            onClick={() => setRef((prev) => !prev)}
            style={{ backgroundColor: "yellowGreen", border: "none", outline: "none", borderRadius:'5px',color:"black" }}
          >
            <RefreshButton /> Refresh
          </button>
        </div>
      </div>
    );
  },
);

// USER SUBSCRIPTION INFO
const UserSubscriptionInfoCard = memo(({ user }) => {
  if (isMembership({ subscription_desc: user?.subscription.gym_rate_desc })) {
    return <MembershipCard user={user} />;
  }
  return (
    <div className="col-lg-6">
      {/* USER SUBSCRIPTION */}
      <h3 style={{ color: "orange", marginTop: "15px" }}>
        {user.id} - {user.subscription.gym_rate_desc}
      </h3>
      <DateSubscribedComponent user={user} />
      {/* USER EXTENDED SUBSCRIPTION */}
      <h4 style={{ color: "gray" }}>Extended Subscription:</h4>

      {user.extendedSubscriptions.length > 0 ? (
        user.extendedSubscriptions.map((extended) => (
          <h5 style={{ color: "yellowgreen" }} key={extended.id}>
            - {extended?.subscription?.gym_rate_desc} -{" "}
            {extended?.extended_session_day} day/s -{" "}
            {FormatDate(extended?.date_extend)}
          </h5>
        ))
      ) : (
        <h5 style={{ color: "yellowgreen" }}>None</h5>
      )}

      {/* DAYS LEFT */}
      <h4 style={{ color: "gray" }}>Subscription Days Left:</h4>
      <h5 style={{ color: "yellowgreen" }}>{user?.extendedSubDays}</h5>
    </div>
  );
});

const ExtendedTrainerInfo = ({trainer}) => {

  const isPTexpired = (pt) =>{
    return pt?.PT < 0;
  }

  return (
    <div style={{ display: "flex",flexDirection:"column", gap: "0px" }}>
      <h5 key={trainer.id} style={{ color: "pink" }}>
        {trainer.trainer?.name}
      </h5>
      {isPTexpired(trainer) ? (
        <span style={{ color: "yellowGreen" }}>Date Subscribed: <i style={{color:"red"}}>{FormatDate(trainer?.date_extend)}</i> - Expired</span>
      ) : (
        <span style={{ fontSize: "14px !important", color: "yellowGreen" }}>
          date started: {FormatDate(trainer?.date_extend)}
        </span>
      )}

      {!isPTexpired(trainer) && (
        <span style={{ color: "orange" }}>
          <i style={{color:"yellowGreen",fontWeight:"bold"}}>days left:</i> {formatTime(trainer?.PT, "days-hours-minutes")}
        </span>
      )}
      <hr/>
    </div>
  );
}

// TRAINERS INFO
const TrainersInfoCard = memo(({ user, extendedTrainers, user_subscription_id, noOfSubscription, isHavingMembership }) => {
  
  const sub_desc = user.subscription.gym_rate_desc;
  const { countActiveExtendedTrainer } = useContext(UserHistoryContext);

  if (isMembership({ subscription_desc: sub_desc })) {
    return null;
  }

  console.log(isHavingMembership);

  const userExtendedTrainers = extendedTrainers?.[user.id];

  return (
    <div className="col-lg-6">
      <h4 style={{ color: "gray", marginTop: "15px" }}>Main Trainer:</h4>
      <h5 style={{ color: "pink" }}>{user.trainer?.name}</h5>
      <h4 style={{ color: "gray", marginTop: "15px" }}>Extended Trainers:</h4>

      {userExtendedTrainers == null ? (
        <LoadingEffect />
      ) : userExtendedTrainers.length > 0 ? (
        userExtendedTrainers.map((trainer) => (
          <ExtendedTrainerInfo trainer={trainer} />
          // <h5 key={trainer.id} style={{ color: "pink" }}>
          //   {trainer.trainer?.name} -{" "}
          //   {trainer?.PT < 0 ? (
          //     <>
          //       <span style={{ color: "red" }}>Expired</span>
          //       <br />
          //       <span style={{ fontSize: "8px !important; color:gray !important" }}>
          //         date started: {FormatDate(trainer?.date_extend)}
          //       </span>
          //       <br />
          //       <br />
          //     </>
          //   ) : (
          //     <>
          //       <span style={{ color: "orange" }}>
          //         {formatTime(trainer?.PT, "days-hours-minutes")}
          //       </span>
          //       <br />
          //       <span style={{ fontSize: "8px !important;" }}>
          //         date started: {FormatDate(trainer?.date_extend)}
          //       </span>
          //     </>
          //   )}
          // </h5>
        ))
      ) : (
        <h5 style={{ color: "z  " }}>None</h5>
      )}

      {/* TOTAL EXTENDED REMAINING DAYS */}
      <TotalTrainerRemainingDaysCard extendedTrainer={userExtendedTrainers} />

      {noOfSubscription > 1 && (
        <ActiveExtendedTrainerSubscriptionsCard
          extendedTrainer={userExtendedTrainers}
          user={user}
          user_subscription_id={user_subscription_id}
          isHavingMembership={isHavingMembership}
          noOfSubscription={noOfSubscription}
        />
      )}
    </div>
  );
});

// HISTORY LOG
const UserHistoryLogCard = memo(({ userHistoryDatas, user2 }) => {
  if (userHistoryDatas.error || userHistoryDatas.pending) {
    return <LoadingEffect />;
  }

  return userHistoryDatas?.userHistoryData?.map(
    (user) =>
      user2.id === user.usersubscription?.id && (
        <UserHistory user={user} key={user.id} />
      ),
  );
});

// USERS NAME
const UsersNameComponent = memo(({ user }) => {
  return <h3 style={{ color: "white" }}>{user?.flexprouser.name}</h3>;
});

const UserSubscriptionComponent = ({
  datas,
  historyDatas,
  extendedTrainers,
  isNotIncludeMembership,
}) => {

  const isHavingMembership = datas?.userSubscriptionData?.some(
    (plan) => plan?.subscription?.gym_rate_desc === 'MEMBERSHIP'
  );

  return datas?.userSubscriptionData?.map((user2) => {
    const membership = isMembership({ subscription_desc: user2?.subscription.gym_rate_desc });

    if (
      membership &&
      isNotIncludeMembership
    ) {
      return null;
    }

    if (
      isExpired({ user: user2 }) &&
      membership
    ) {
      return null;
    }

    return (
      <div key={user2.id}>
        {/* USER NAME */}
        <UsersNameComponent user={user2} />

        {/* USER LOGS */}
        {isSubscriptionDatasPendingOrError({
          subscriptionDatas: datas,
          historyDatas: historyDatas,
        }) ? (
          <LoadingEffect />
        ) : (
          <div
            className="row subInfo"
            style={{
              border: isExpired({ user: user2 })
                ? "2px dashed maroon"
                : "2px dashed yellowGreen",
              marginBottom: "1px",
            }}
          >
            {/* SUBSCRIPTION INFO */}
            <UserSubscriptionInfoCard user={user2} />

            {/* TRAINERS */}
            <TrainersInfoCard
              user={user2}
              extendedTrainers={extendedTrainers}
              user_subscription_id={user2?.id}
              noOfSubscription={datas?.userSubscriptionData?.length}
              isHavingMembership={isHavingMembership}

            />
          </div>
        )}
        {/* HISTORY */}
        <div className="row subInfo">
          <UserHistoryLogCard
            userHistoryDatas={historyDatas}
            user2={user2}
          />
        </div>
        <hr />
      </div>
    );
  });
};

const UserSubscriptionWithoutMembershipComponents = memo(
  ({ subscriptionDatas, historyDatas, extendedTrainers }) => {
    return (
      <UserSubscriptionComponent
        datas={subscriptionDatas}
        historyDatas={historyDatas}
        extendedTrainers={extendedTrainers}
        isNotIncludeMembership={true}
      />
    );
  },
);

const UserSubscriptionWithMembershipComponents = memo(
  ({ subscriptionDatas, historyDatas, extendedTrainers }) => {
    const result = subscriptionDatas?.userSubscriptionData?.find(
      (x) => x.subscription.gym_rate_desc === "MEMBERSHIP",
    );

    const datas = {
      userSubscriptionData: [result],
    };

    if (result) {
      return (
        <UserSubscriptionComponent
          datas={datas}
          historyDatas={historyDatas}
          extendedTrainers={extendedTrainers}
        />
      );
    }
  },
);

// MAIN COMPONENTS
const ListOfUserHistory = () => {
  const { userSubscriptionDatas, userHistoryDatas } =
    useContext(UserHistoryContext);

  const [extendedTrainers, setExtendedTrainers] = useState({});

  const fetchExtendedTrainers = async (user_subscription_id) => {
    const data = await getExtendedTrainerForUserHistory(user_subscription_id);
    setExtendedTrainers((prev) => ({ ...prev, [user_subscription_id]: data }));
  };

  useEffect(() => {
    if (userSubscriptionDatas?.userSubscriptionData) {
      userSubscriptionDatas.userSubscriptionData.forEach((user) => {
        fetchExtendedTrainers(user.id);
      });
    }
  }, [userSubscriptionDatas]);

  return (
    <>
      <UserSubscriptionWithMembershipComponents
        subscriptionDatas={userSubscriptionDatas}
        historyDatas={userHistoryDatas}
        extendedTrainers={extendedTrainers}
      />
      <UserSubscriptionWithoutMembershipComponents
        subscriptionDatas={userSubscriptionDatas}
        historyDatas={userHistoryDatas}
        extendedTrainers={extendedTrainers}
      />
    </>
  );
};

export default ListOfUserHistory;

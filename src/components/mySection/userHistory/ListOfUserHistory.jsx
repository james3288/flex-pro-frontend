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

const ActiveExtendedTrainerSubscriptionsCard = memo(
  ({ extendedTrainer = [],user }) => {
    const { countActiveExtendedTrainer, setCountActiveExtendedTrainer } =
      useContext(UserHistoryContext);

    if (extendedTrainer == null) {
      return (
        <div className="col-lg-6">
          <LoadingEffect />
        </div>
      );
    }

    const activeExtendedTrainers = extendedTrainer.filter(
      (trainer) => trainer?.PT >= 0,
    );

    const hasActiveExtendedTrainer = useMemo(
      () => activeExtendedTrainers.length > 0,
      [activeExtendedTrainers],
    );

    useEffect(() => {
      if (hasActiveExtendedTrainer) {
        setCountActiveExtendedTrainer(
          activeExtendedTrainers.reduce(
            (sum, trainer) => sum + (trainer.PT ?? 0),
            0,
          ),
        );
      }
    }, [hasActiveExtendedTrainer, countActiveExtendedTrainer]);

    return !isExpired({user}) && (
      <div className="mt-5">
        <h4 className="text-secondary">
          Active Extended Trainer Subscriptions:
        </h4>
        <h5 className="text-warning">{formatTime(countActiveExtendedTrainer,"days-hours-minutes") }</h5>
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

// TRAINERS INFO
const TrainersInfoCard = memo(({ user, extendedTrainers }) => {
  const sub_desc = user.subscription.gym_rate_desc;
  const { countActiveExtendedTrainer } = useContext(UserHistoryContext);

  if (isMembership({ subscription_desc: sub_desc })) {
    return null;
  }

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
          <h5 key={trainer.id} style={{ color: "pink" }}>
            {trainer.trainer?.name} -{" "}
            {trainer?.PT < 0 ? (
              <>
                <span style={{ color: "red" }}>Expired</span>
                <h6 className="text-secondary">
                  date extend: {FormatDate(trainer?.date_extend)}
                </h6>
                <br />
              </>
            ) : (
              <span style={{ color: "orange" }}>
                {formatTime(trainer?.PT, "days-hours-minutes")}
              </span>
            )}
          </h5>
        ))
      ) : (
        <h5 style={{ color: "yellowgreen" }}>None</h5>
      )}

      {/* TOTAL EXTENDED REMAINING DAYS */}
      <TotalTrainerRemainingDaysCard extendedTrainer={userExtendedTrainers} />

      <ActiveExtendedTrainerSubscriptionsCard
        extendedTrainer={userExtendedTrainers}
        user={user}
      />
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
  return datas?.userSubscriptionData?.map((user2) => {
    if (
      isMembership({ subscription_desc: user2?.subscription.gym_rate_desc }) &&
      isNotIncludeMembership
    ) {
      return null;
    }

    if (
      isExpired({ user: user2 }) &&
      isMembership({ subscription_desc: user2?.subscription.gym_rate_desc })
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
            />
          </div>
        )}
        <div className="row subInfo">
          <UserHistoryLogCard userHistoryDatas={historyDatas} user2={user2} />
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

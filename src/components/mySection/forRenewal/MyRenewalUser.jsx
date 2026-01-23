import React, { useState } from "react";
import RenewalUsers from "./RenewalUsers";
import getForRenewalUsers from "../../../getData/getForRenewalUsers";
import { useQuery } from "@tanstack/react-query";
import formatTime from "../../../others/ReadableFormatTime";
import AddTrainerModal from "../activeUser/AddTrainerModal";
import RemoveExtendedSub from "../activeUser/RemoveExtendedSub";
import ExtendSubscriptionModal2 from "../activeUser/ExtendSubscriptionModal2";
import useGetActiveMembership from "../../../hooks/useGetActiveMembership";
import MembershipUser from "../membershipUser/MembershipUser";

const ActiveMembershipComponent = ({ users }) => {
  return users?.map((user) => {
    const remainingStatus = formatTime(user?.remaining, "days-only");
    return remainingStatus <= 2 && <MembershipUser key={user.id} user={user} />;
  });
};

const MyRenewalUser = () => {
  let value = false;

  const [modalTitle, setModalTitle] = useState();
  const [userSubscriptionId, setUserSubscriptionId] = useState(0);
  const [extendedTrainerId, setExtendedTrainerId] = useState(0);
  const [extendedSubId, setExtendedSubId] = useState(0);
  const [showAddTrainerModal, setShowAddTrainerModal] = useState(false);
  const [showExtendSubscriptionModal, setShowExtendSubscriptionModal] =
    useState(false);
  const [showRemoveExtendedSubModal, setShowRemoveExtendedSubModal] =
    useState(false);

  const { getMembershipUserActive } = useGetActiveMembership();

  const { isPending, error, data, fetchStatus } = useQuery({
    queryKey: ["forRenewalData"],
    queryFn: async () => {
      const renewalUsers = await getForRenewalUsers();
      const membershipUsers = await getMembershipUserActive();
      return {
        renewalUsers: renewalUsers,
        membershipUsers: membershipUsers,
      };
    },
  });

  if (isPending)
    return (
      <div id="preloder">
        <div className="loader"></div>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="container-fluid content-margin c-col-scrollbar">
        <div className="row">
          <div className="form-floating dateTimePicker">
            <h1>
              FOR <span>RENEWAL</span> USERS
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="c-col-wrapper">
            {data?.renewalUsers?.map(
              (user) =>
                (user.extendedSubDays <= 2 ||
                  (user.extendedTrainerDays <= 2 &&
                    user.extendedTrainerData > 0)) &&
                user.usersubscription.subscription.gym_rate_desc.toUpperCase() !=
                  "DAY PASS" && (
                  <RenewalUsers
                    key={user?.id}
                    blobPic={user.image}
                    registeredName={user.usersubscription.flexprouser.name}
                    date_subscribed={user.usersubscription.date_subscribed}
                    subscription={
                      user.usersubscription.subscription.gym_rate_desc
                    }
                    remainingDays={user.remainingDays}
                    per={user.usersubscription.subscription.per.per}
                    user_id={user.usersubscription.flexprouser.id}
                    id={user.id}
                    trainers={user.usersubscription.trainer?.name}
                    subscriptionId={user?.usersubscription.id}
                    trainerRemainingDays={user?.trainerRemainingDays}
                    session_days={user?.usersubscription.session_days}
                    setUserSubscriptionId={setUserSubscriptionId}
                    setModalTitle={setModalTitle}
                    setExtendedTrainerId={setExtendedTrainerId}
                    setExtendedSubId={setExtendedSubId}
                    setShowAddTrainerModal={setShowAddTrainerModal}
                    setShowExtendSubscriptionModal={
                      setShowExtendSubscriptionModal
                    }
                    setShowRemoveExtendedSubModal={
                      setShowRemoveExtendedSubModal
                    }
                    contactNo={
                      user?.usersubscription.flexprouser.contact_number
                    }
                    trainer_date_started={
                      user.usersubscription.trainer_date_started
                    }
                    sub_session_days={user.usersubscription.sub_session_days}
                  />
                ),
            )}

            <ActiveMembershipComponent users={data?.membershipUsers} />

            <AddTrainerModal
              show={showAddTrainerModal}
              onHide={() => setShowAddTrainerModal(false)}
              userSubscriptionId={userSubscriptionId}
              modalTitle={modalTitle}
              extendedTrainerId={extendedTrainerId}
            />

            <ExtendSubscriptionModal2
              show={showExtendSubscriptionModal}
              onHide={() => setShowExtendSubscriptionModal(false)}
              userSubscriptionId={userSubscriptionId}
              modalTitle={modalTitle}
            />
            <RemoveExtendedSub
              show={showRemoveExtendedSubModal}
              onHide={() => setShowRemoveExtendedSubModal(false)}
              extendedSubId={extendedSubId}
              extendedTrainerId={extendedTrainerId}
              modalTitle={modalTitle}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyRenewalUser;

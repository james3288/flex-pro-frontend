import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";

import RenewalUsers from "../forRenewal/RenewalUsers";
// import "./myActiveUser.scss";
import useGetActiveUsers from "../../../hooks/useGetActiveUsers";
import LoadingEffect from "../loadingEffect/LoadingEffect";
import useGetExpiredUsers from "../../../hooks/useGetExpiredUsers";
import NoDataFound from "../noDataFound/NoDataFound";

const PAGE_SIZE = 10;

const MyExpiredUser = () => {
  const [userSubscriptionId, setUserSubscriptionId] = useState(0);
  const [extendedSubId, setExtendedSubId] = useState(0);
  const [extendedTrainerId, setExtendedTrainerId] = useState(0);
  const [modalTitle, setModalTitle] = useState();

  const { getExpiredUsers } = useGetExpiredUsers();
  const scrollRef = useRef(null);

  // Infinite Query
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    status,
  } = useInfiniteQuery({
    queryKey: ["forExpiredUser"],
    queryFn: async ({ pageParam = 1 }) => {
      // Your getExpiredUsers should accept page and pageSize
      // and return { users: [...], hasMore: true/false }
      const result = await getExpiredUsers({
        page: pageParam,
        pageSize: PAGE_SIZE,
      });
      return result;
    },
    getNextPageParam: (lastPage, allPages) => {
      // If your API returns hasMore, use it to determine next page
      if (lastPage.hasMore) {
        return allPages.length + 1;
      }
      return undefined;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || isFetchingNextPage || !hasNextPage) return;
    if (el.scrollHeight - el.scrollTop <= el.clientHeight + 100) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  // Attach scroll event
  // You can also use a library like react-intersection-observer for better UX
  // but this is a simple approach
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (isLoading)
    return (
      <div id="preloder">
        <div className="loader"></div>
      </div>
    );

  if (error) return <NoDataFound caption="No Data has been found..." />;
  const users = data?.pages.flatMap((page) => page.users) || [];

  return (
    <>
      <div className="container-fluid content-margin c-col-scrollbar">
        <div className="row">
          <div className="form-floating title">
            <h1>
              {users?.length} <span>EXPIRED</span> USERS
            </h1>
          </div>
        </div>
        <div className="row">
          <div
            className="c-col-wrapper"
            ref={scrollRef}
            style={{ maxHeight: "70vh", overflowY: "auto" }}
          >
            {/* <ExpiredUserComponent /> */}
            {users.length === 0 && (
              <NoDataFound caption="No Data has been found..." />
            )}
            {users.map((user) => (
              <RenewalUsers
                key={user.id}
                blobPic={user.image}
                registeredName={user.usersubscription.flexprouser?.name}
                date_subscribed={user.usersubscription.date_subscribed}
                subscription={user.usersubscription.subscription.gym_rate_desc}
                remainingDays={user.remainingDays}
                per={user.usersubscription.subscription.per.per}
                user_id={user.usersubscription.flexprouser?.id}
                id={user.id}
                trainers={user.usersubscription.trainer?.name}
                trainerRemainingDays={user?.trainersRemainingDays}
                subscriptionId={user?.usersubscription.id}
                setUserSubscriptionId={setUserSubscriptionId}
                session_days={user.usersubscription.session_days}
                setModalTitle={setModalTitle}
                setExtendedSubId={setExtendedSubId}
                setExtendedTrainerId={setExtendedTrainerId}
                contactNo={user.usersubscription.flexprouser?.contact_number}
                trainer_date_started={
                  user.usersubscription.trainer_date_started
                }
                packages_details={
                  user.usersubscription.subscription.packages_details
                }
                sub_session_days={user?.usersubscription.sub_session_days}
                isExpired={true}
              />
            ))}
            {isFetchingNextPage && <LoadingEffect />}
            {!hasNextPage && users.length > 0 && (
              <div className="text-center my-3 text-muted">
                No more users to load.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyExpiredUser;

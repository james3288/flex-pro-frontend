import instance from "@others/axiosInstance";
import remainingDays from "@others/GetRemainingDays";
import getSubscriptionDaysLeft from "@getData/getSubscriptionDaysLeft";

const useGetActiveMembership = () => {
  // 🔹 Extract shared user processing logic
  const processUsers = async (users) => {
    return Promise.all(
      users.map(async (user) => {
        const remaining = await remainingDays(
          user.date_subscribed,
          "day",
          user.id
        );

        // If this is synchronous, remove `await`
        const subDaysLeft = getSubscriptionDaysLeft(
          remaining,
          [],
          user.date_subscribed,
          false
        );

        return {
          ...user,
          remaining,
          remainingHours: subDaysLeft,
        };
      })
    );
  };

  // 🔹 General fetcher
  const fetchUsers = async () => {
    try {
      const response = await instance.get(`/api/active_membership/`);
      return response.data || [];
    } catch (error) {
      console.error("Error fetching day pass users:", error.message);
      return []; // return empty array instead of undefined
    }
  };

  // 🔹 Public methods
  const getMembershipUsers = async () => {
    const users = await fetchUsers();
    return processUsers(users);
  };

  const getMembershipUserActive = async () => {
    const users = await fetchUsers();
    const processed = await processUsers(users);
    return processed.filter((x) => x.remainingHours !== "Expired");
  };

  return { getMembershipUsers, getMembershipUserActive };
};

export default useGetActiveMembership;

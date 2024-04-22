import React, { useEffect } from "react";
import MyDashboardSection from "../components/mySection/MyDashboardSection";
import MyUserRegistrationSection from "../components/mySection/myUserRegistrationSection";
import MyUserImageRegSection from "../components/mySection/clientsOnline/MyUserImageRegSection";
import MyUserLoginSection from "../components/mySection/MyUserLoginSection";
// import MySubscriptionPlan from "../components/mySection/MySubscriptionPlan";
import { useState } from "react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import MySubscribedNow from "../components/mySection/MySubscribedNow";
import MyCLientsOnWorkout from "../components/mySection/MyCLientsOnWorkout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MyRenewalUser from "../components/mySection/forRenewal/MyRenewalUser";
import MyTrainors from "../components/mySection/trainers/MyTrainors";
import MyActiveUser from "../components/mySection/activeUser/MyActiveUser";
import MySubscriptionPlan from "../components/mySection/Subscriptions/MySubscriptionPlan";
import MyUsers from "../components/mySection/users/MyUsers";
import MyUserHistory from "../components/mySection/userHistory/MyUserHistory";
import MyTrainerHistory from "../components/mySection/trainerHistory/MyTrainerHistory";

const queryClient = new QueryClient();

const DashboardPage = ({
  dashboardBg,
  page,
  formDone,
  setFormDone,
  formData,
  setFormData,
  state,
  dispatch,
}) => {
  let content;
  const [inputError, setInputError] = useState("");

  const scrollToBottom = () => {
    scroll.scrollToBottom({
      duration: 500,
      smooth: "easeInOutQuint",
    });
  };

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: "easeInOutQuint",
    });
  };

  const handleFormFilter = (param) => {
    // if (formData.name === "") {
    //   setInputError("Name is empty.");
    //   setFormDone(false);
    //   scrollToTop();
    //   return; // Exit the function if name is empty
    // } else if (formData.weights === "") {
    //   setInputError("Weights is empty.");
    //   setFormDone(false);
    //   scrollToTop();
    //   return; // Exit the function if weights is empty
    // } else if (isNaN(parseFloat(formData.weights))) {
    //   setInputError("Weights must be numeric.");
    //   setFormDone(false);
    //   scrollToTop();
    //   return;
    // } else if (formData.contact_number === "") {
    //   setInputError("Contact number is empty.");
    //   setFormDone(false);
    //   scrollToTop();
    //   return; // Exit the function if contact number is empty
    // } else if (formData.contact_number_ioe === "") {
    //   setInputError("Contact number IOE is empty.");
    //   setFormDone(false);
    //   scrollToTop();
    //   return; // Exit the function if contact number IOE is empty
    // }

    // param === 1 ? scrollToBottom() : scrollToTop();
    // param === 1 && setInputError("");

    if (param === 1) {
      scrollToBottom();
      setFormDone(true);
    }

    // setFormDone(true);
  };

  if (page === "dashboard") {
    content = <MyDashboardSection />;
  }

  if (page === "userRegistration") {
    content = (
      <QueryClientProvider client={queryClient}>
        <MyUserRegistrationSection
          formData={formData}
          setFormData={setFormData}
          handleFormFilter={handleFormFilter}
          formDone={formDone}
          inputError={inputError}
          state={state}
          dispatch={dispatch}
        />
      </QueryClientProvider>
    );
  }

  if (page === "userImageRegistration") {
    content = (
      <QueryClientProvider client={queryClient}>
        <MyUserImageRegSection
          formData={formData}
          setFormData={setFormData}
          formDone={formDone}
          inputError={inputError}
          state={state}
          dispatch={dispatch}
        />
      </QueryClientProvider>
    );
  }

  if (page === "userLogin") {
    content = <MyUserLoginSection />;
  }

  if (page === "subcriptionPlan") {
    content = (
      <QueryClientProvider client={queryClient}>
        <MySubscriptionPlan />
      </QueryClientProvider>
    );
  }

  if (page === "subscribeNow") {
    content = <MySubscribedNow />;
  }

  if (page === "clientsOnWorkout") {
    content = (
      <QueryClientProvider client={queryClient}>
        <MyCLientsOnWorkout />
      </QueryClientProvider>
    );
  }

  if (page === "forRenewalUser") {
    content = (
      <QueryClientProvider client={queryClient}>
        <MyRenewalUser />
      </QueryClientProvider>
    );
  }

  if (page === "trainor") {
    content = (
      <QueryClientProvider client={queryClient}>
        <MyTrainors />
      </QueryClientProvider>
    );
  }

  if (page === "active-user") {
    content = (
      <QueryClientProvider client={queryClient}>
        <MyActiveUser />
      </QueryClientProvider>
    );
  }

  if (page === "usersPage") {
    content = (
      <QueryClientProvider client={queryClient}>
        <MyUsers />
      </QueryClientProvider>
    );
  }

  if (page === "userHistoryPage") {
    content = (
      <QueryClientProvider client={queryClient}>
        <MyUserHistory />
      </QueryClientProvider>
    );
  }

  if (page === "trainerHistoryPage") {
    content = (
      <QueryClientProvider client={queryClient}>
        <MyTrainerHistory />
      </QueryClientProvider>
    );
  }

  return (
    <>
      {/* Hero section */}
      <section className="hero-section">
        <div className={`hs-item set-bg ${dashboardBg}`}>{content}</div>
      </section>

      {/* end Hero section */}
    </>
  );
};

export default DashboardPage;

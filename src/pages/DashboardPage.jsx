import React, { useEffect } from "react";
import MyDashboardSection from "../components/mySection/MyDashboardSection";
import MyUserRegistrationSection from "../components/mySection/myUserRegistrationSection";
import MyUserImageRegSection from "../components/mySection/clientsOnline/MyUserImageRegSection";
import MyUserLoginSection from "../components/mySection/MyUserLoginSection";
import MySubscriptionPlan from "../components/mySection/MySubscriptionPlan";
import { useState } from "react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import MySubscribedNow from "../components/mySection/MySubscribedNow";
import MyCLientsOnWorkout from "../components/mySection/MyCLientsOnWorkout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MyRenewalUser from "../components/mySection/forRenewal/MyRenewalUser";

const queryClient = new QueryClient();

const DashboardPage = ({
  dashboardBg,
  page,
  formDone,
  setFormDone,
  formData,
  setFormData,
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
    if (formData.name === "") {
      setInputError("Name is empty.");
      setFormDone(false);
      scrollToTop();
      return; // Exit the function if name is empty
    } else if (formData.weights === "") {
      setInputError("Weights is empty.");
      setFormDone(false);
      scrollToTop();
      return; // Exit the function if weights is empty
    } else if (isNaN(parseFloat(formData.weights))) {
      setInputError("Weights must be numeric.");
      setFormDone(false);
      scrollToTop();
      return;
    } else if (formData.contact_number === "") {
      setInputError("Contact number is empty.");
      setFormDone(false);
      scrollToTop();
      return; // Exit the function if contact number is empty
    } else if (formData.contact_number_ioe === "") {
      setInputError("Contact number IOE is empty.");
      setFormDone(false);
      scrollToTop();
      return; // Exit the function if contact number IOE is empty
    }

    param === 1 ? scrollToBottom() : scrollToTop();
    param === 1 && setInputError("");

    setFormDone(true);
  };

  if (page === "dashboard") {
    content = <MyDashboardSection />;
  }

  if (page === "userRegistration") {
    content = (
      <MyUserRegistrationSection
        formData={formData}
        setFormData={setFormData}
        handleFormFilter={handleFormFilter}
        formDone={formDone}
        inputError={inputError}
      />
    );
  }

  if (page === "userImageRegistration") {
    content = (
      <MyUserImageRegSection
        formData={formData}
        setFormData={setFormData}
        formDone={formDone}
        inputError={inputError}
      />
    );
  }

  if (page === "userLogin") {
    content = <MyUserLoginSection />;
  }

  if (page === "subcriptionPlan") {
    content = <MySubscriptionPlan />;
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

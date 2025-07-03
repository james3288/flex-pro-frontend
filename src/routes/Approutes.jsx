import { createBrowserRouter } from "react-router-dom";

import App from "../App.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";

// User-related pages
import UserRegistrationPage from "../pages/userRegistrationPage/UserRegistrationPage.jsx";
import UserImageRegistrationPage from "../pages/userImageRegistrationPage/UserImageRegistrationPage.jsx";
import UserLoginPage from "../pages/userLoginPage/UserLoginPage.jsx";
import UserSubscription from "../pages/userSubscriptionPage/UserSubscription.jsx";
import SubscribedNow from "../pages/subscribedNowPage/SubscribedNow.jsx";
import UsersPage from "../pages/usersPage/UsersPage.jsx";
import UserHistoryPage from "../pages/userHistory/UserHistoryPage.jsx";

// Trainer-related pages
import TrainorPage from "../pages/trainorPage/TrainorPage.jsx";
import TrainerHistoryPage from "../pages/trainorHistory/trainerHistoryPage.jsx";

// Client/workout pages
import ClientsOnWorkoutPage from "../pages/clientOnWorkOutPage/ClientsOnWorkoutPage.jsx";
import ForRenewalPage from "../pages/forRenewalPage/ForRenewalPage.jsx";
import ActiveUserPage from "../pages/activeUserPage/ActiveUserPage.jsx";

// Reports
import ReportPage from "../pages/reportPage/ReportPage.jsx";
import MainLayout from "../components/layout/mainLayout.jsx";
const routes = [
  {
    path: "/",
    element: (
      <>
        <MainLayout>
          <App />
        </MainLayout>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/user-registration",
    element: (
      <MainLayout>
        <UserRegistrationPage />{" "}
      </MainLayout>
    ),
  },
  {
    path: "/user-image-registration",
    element: (
      <>
        <MainLayout>
          <UserImageRegistrationPage />
        </MainLayout>
      </>
    ),
  },
  {
    path: "/user-login",
    element: <UserLoginPage />,
  },
  {
    path: "/user-subscription",
    element: (
      <>
        <MainLayout />
        <UserSubscription />
      </>
    ),
  },
  {
    path: "/subscribed-now",
    element: (
      <>
        <MainLayout>
          <SubscribedNow />
        </MainLayout>
      </>
    ),
  },
  {
    path: "/clients-on-workout",
    element: (
      <>
        <MainLayout>
          <ClientsOnWorkoutPage />
        </MainLayout>
      </>
    ),
  },
  {
    path: "/for-renewal-users",
    element: (
      <>
        <MainLayout>
          <ForRenewalPage />
        </MainLayout>
      </>
    ),
  },
  {
    path: "/trainors",
    element: (
      <MainLayout>
        <TrainorPage />
      </MainLayout>
    ),
  },
  {
    path: "/active-users",
    element: (
      <>
        <MainLayout>
          <ActiveUserPage />
        </MainLayout>
      </>
    ),
  },
  {
    path: "/users",
    element: (
      <>
        <MainLayout>
          <UsersPage />
        </MainLayout>
      </>
    ),
  },
  {
    path: "/user-history",
    element: (
      <>
        <MainLayout>
          <UserHistoryPage />
        </MainLayout>
      </>
    ),
  },
  {
    path: "/trainer-history",
    element: (
      <>
        <MainLayout>
          <TrainerHistoryPage />
        </MainLayout>
      </>
    ),
  },
  {
    path: "/reports",
    element: <ReportPage />,
  },
];

export const router = createBrowserRouter(routes);

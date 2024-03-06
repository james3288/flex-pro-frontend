import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import UserRegistrationPage from "./pages/userRegistrationPage/UserRegistrationPage.jsx";
import UserImageRegistrationPage from "./pages/userImageRegistrationPage/UserImageRegistrationPage.jsx";
import UserLoginPage from "./pages/userLoginPage/UserLoginPage.jsx";
import UserSubscription from "./pages/userSubscriptionPage/UserSubscription.jsx";
import SubscribedNow from "./pages/subscribedNowPage/SubscribedNow.jsx";

import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import ClientsOnWorkoutPage from "./pages/clientOnWorkOutPage/ClientsOnWorkoutPage.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ForRenewalPage from "./pages/forRenewalPage/ForRenewalPage.jsx";
import TrainorPage from "./pages/trainorPage/TrainorPage.jsx";

const queryClient = new QueryClient();

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user-registration",
    element: <UserRegistrationPage />,
  },
  {
    path: "/user-image-registration",
    element: <UserImageRegistrationPage />,
  },
  {
    path: "/user-login",
    element: <UserLoginPage />,
  },
  {
    path: "/user-subscription",
    element: <UserSubscription />,
  },
  {
    path: "/subscribed-now",
    element: <SubscribedNow />,
  },
  {
    path: "/clients-on-workout",
    element: <ClientsOnWorkoutPage />,
  },
  {
    path: "/for-renewal-users",
    element: <ForRenewalPage />,
  },
  {
    path: "/trainors",
    element: <TrainorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

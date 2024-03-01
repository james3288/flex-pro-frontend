import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import UserRegistrationPage from "./pages/UserRegistrationPage.jsx";
import UserImageRegistrationPage from "./pages/UserImageRegistrationPage.jsx";
import UserLoginPage from "./pages/UserLoginPage.jsx";
import UserSubscription from "./pages/UserSubscription.jsx";
import SubscribedNow from "./pages/SubscribedNow.jsx";

import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import ClientsOnWorkoutPage from "./pages/ClientsOnWorkoutPage.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

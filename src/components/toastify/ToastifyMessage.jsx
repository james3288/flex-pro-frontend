import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastifyMessage = () => {
  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: "top-right",
    });
  };
  return (
    <div>
      <button onClick={showToastMessage}>Notify</button>
      <ToastContainer />
    </div>
  );
};

import React, { useMemo } from "react";
import "./subscriptionModal.scss";
import ListOfPackages from "./ListOfPackages";
import getSuscriptionPackages from "../../../getData/getSubscriptionPackages";
import { useQuery } from "@tanstack/react-query";

const SubscriptionModal = ({ id, option }) => {
  const queryKey = useMemo(() => ["subscriptionPackage"], []);

  const { isPending, error, data } = useQuery({
    queryKey,
    queryFn: () => getSuscriptionPackages(),
    // refetchInterval: 1000,
  });

  if (isPending)
    return (
      <div id="preloder">
        <div class="loader"></div>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <div
      className="modal fade"
      id={id}
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Pricing Plan
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <label className="col-form-label">Gym Rate Description:</label>
            <input
              type="text"
              className="form-control"
              id="gym-rate-desc"
              name="gymRateDesc"
            />
            <label className="col-form-label">Rate:</label>
            <input type="text" className="form-control" id="rate" name="rate" />
            <label className="col-form-label">Per:</label>
            <div>
              <select className="mySelect">
                <option value="day">day</option>
                <option value="month">month</option>
                <option value="year">year</option>
              </select>
            </div>
            <label className="col-form-label">
              Personal Training Session (days):
            </label>
            <input
              type="text"
              className="form-control"
              id="personal-training-session"
              name="personal-training-session"
            />
            <div className="myList">
              <ul className="list-group">
                <ListOfPackages />
                <ListOfPackages />
              </ul>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;

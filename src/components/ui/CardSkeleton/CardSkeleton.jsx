import React from "react";
import "./cardSkeleton.scss";

const CardSkeleton = React.memo(() => {
  return (
    <div className="scrollable-list-of-user">
      <div className="skeleton-card">
        <div className="skeleton skeleton-img"></div>

        <div className="skeleton-body">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text short"></div>
          <div className="skeleton skeleton-btn"></div>
        </div>
      </div>
      <div className="skeleton-card">
        <div className="skeleton skeleton-img"></div>

        <div className="skeleton-body">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text short"></div>
          <div className="skeleton skeleton-btn"></div>
        </div>
      </div>
    </div>
  );
});

export default CardSkeleton;

import React, { useEffect, useState } from "react";
import "./MyLeftSideMenu.scss";
import { NavLink } from "react-router-dom";
const MyLeftSideMenu = ({
  leftMenuOpen,
  setLeftMenuOpen,
  offCanvasMenu,
  setOffCanvasMenu,
}) => {
  const handleOffCanvasMenu = () => {
    setOffCanvasMenu((prev) => !prev);
    setLeftMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    console.log(leftMenuOpen);
  }, [leftMenuOpen]);

  const activeItems = (isActive, isPending) => {
    const active = isActive ? "isActive" : isPending ? "isNotActive" : "";

    return active;
  };

  return (
    <>
      <div
        onClick={handleOffCanvasMenu}
        className={
          leftMenuOpen && offCanvasMenu
            ? "offcanvas-menu-overlay active"
            : "offcanvas-menu-overlay"
        }
      ></div>
      <div
        className={
          leftMenuOpen
            ? "offcanvas-menu-wrapper show-offcanvas-menu-wrapper"
            : "offcanvas-menu-wrapper"
        }
      >
        <div className="canvas-close" onClick={handleOffCanvasMenu}>
          <i className="fa fa-close"></i>
        </div>
        <div className="left-mobile-menu-wrapper">
          <div className="left-item">
            <NavLink
              className={({ isActive, isPending }) =>
                activeItems(isActive, isPending)
              }
              to={`/`}
            >
              Dashboard
            </NavLink>
          </div>
          <div className="left-item">
            <NavLink
              className={({ isActive, isPending }) =>
                activeItems(isActive, isPending)
              }
              to={`/user-registration`}
            >
              User Registration
            </NavLink>
          </div>
          <div className="left-item">
            <NavLink
              className={({ isActive, isPending }) =>
                activeItems(isActive, isPending)
              }
              to={`/trainors`}
            >
              Trainers
            </NavLink>
          </div>
          <div className="left-item">
            <NavLink
              className={({ isActive, isPending }) =>
                activeItems(isActive, isPending)
              }
              to={`/users`}
            >
              Users
            </NavLink>
          </div>
          <div className="left-item">
            <NavLink
              className={({ isActive, isPending }) =>
                activeItems(isActive, isPending)
              }
              to={`/user-login`}
            >
              Member Login
            </NavLink>
          </div>
          <div className="left-item">
            <NavLink
              className={({ isActive, isPending }) =>
                activeItems(isActive, isPending)
              }
              to={`/user-subscription`}
            >
              Subscription
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyLeftSideMenu;

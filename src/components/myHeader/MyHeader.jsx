import React from "react";
import logoImage from "./../../assets/img/logo-2.png";
import { NavLink } from "react-router-dom";
import "./myHeader.scss";

function MyHeader() {
  return (
    <>
      <header className="header-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <div className="logo">
                <a href="">
                  <img src={logoImage} alt="" />
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <nav className="nav-menu">
                <ul>
                  <li>
                    <NavLink
                      to={`/`}
                      className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                      }
                    >
                      DASHBOARD{" "}
                    </NavLink>
                    {/* <a href="">DASHBOARD</a> */}
                  </li>
                  <li>
                    <a>Pages</a>
                    <ul className="dropdown">
                      <li>
                        <NavLink
                          to={`/user-registration`}
                          className={({ isActive, isPending }) =>
                            isActive ? "active" : isPending ? "pending" : ""
                          }
                        >
                          USER REGISTRATION
                        </NavLink>
                      </li>
                      <li>
                        <a href="">TRAINER PROFILE</a>
                      </li>
                      <li>
                        <NavLink
                          to={`/user-login`}
                          className={({ isActive, isPending }) =>
                            isActive ? "active" : isPending ? "pending" : ""
                          }
                        >
                          MEMBER LOGIN
                        </NavLink>
                        {/* <a href="">MEMBER LOGIN</a> */}
                      </li>

                      <li>
                        <NavLink
                          to={`/user-subscription`}
                          className={({ isActive, isPending }) =>
                            isActive ? "active" : isPending ? "pending" : ""
                          }
                        >
                          SUBSCRIPTION
                        </NavLink>
                        {/* <a href="">MEMBER LOGIN</a> */}
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="">Contact</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="top-option">
                <div className="to-search search-switch">
                  <i className="fa fa-search"></i>
                </div>
                <div className="to-social">
                  <span style={{ color: "white" }}>
                    Welcome,<strong style={{ color: "#dc151c" }}> King</strong>
                  </span>
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path
                        fillRule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default MyHeader;

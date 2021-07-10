import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Axios from "axios";
import { domain, header_without_token, header } from "../../env/env";
import { useGlobalState } from "../../state/provider";

export const Header = (props) => {
  const [{ profile }, dispatch] = useGlobalState();

  const logoutButton = async () => {
    await Axios({
      method: "POST",
      url: `${domain}/logout/`,
      headers: header,
    })
      .then((response) => {
        window.localStorage.removeItem("token");
        dispatch({
          type: "ADD_PROFILE",
          profile: null,
        });
        window.location.href = "/";
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        {props.title}
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home{" "}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Profile">
              Profile
            </Link>
          </li>
        </ul>
        {profile !== null ? (
          <Link
            className="btn btn-outline-danger my-2 my-sm-0"
            onClick={logoutButton}
          >
            Logout
          </Link>
        ) : (
          <>
            <form className="form-inline my-2 my-lg-0 mr-0 mr-lg-2">
              <Link to="/login">
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Login
                </button>
              </Link>
            </form>
            <form className="form-inline my-2 my-lg-0">
              <Link to="/register">
                <button className="btn btn-warning my-2 my-sm-0" type="submit">
                  Sign Up
                </button>
              </Link>
            </form>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;

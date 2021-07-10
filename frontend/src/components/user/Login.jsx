import React, { useState, useEffect } from "react";
import Axios from "axios";
import { domain, header_without_token } from "../../env/env";
import { alertService } from "../app/service";
import { Alert } from "../app/Alert";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const loginRequest = async (e) => {
    e.preventDefault();
    await Axios({
      method: "POST",
      url: `${domain}/login/`,
      headers: header_without_token,
      data: {
        username: username,
        password: password,
      },
    })
      .then((response) => {
        console.log(response.data["token"]);
        window.localStorage.setItem("token", response.data["token"]);
        window.location.href = "/";
      })
      .catch((error) => {
        alertService.error("Invalid Credentials!", {
          id: "left-alert",
        });
        // console.log(error);
      });
  };

  return (
    <>
      <div className="container h-100 mt-5">
        <Alert id="left-alert" />
        <div className="d-flex justify-content-center h-100">
          <div className="user_card">
            <div className="d-flex justify-content-center">
              <h3 id="form-title">LOGIN</h3>
            </div>
            <div className="d-flex justify-content-center form_container">
              <form onSubmit={loginRequest}>
                <div className="input-group mb-3">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username..."
                    className="form-control"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="input-group mb-2">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    name="password"
                    placeholder="Password..."
                    className="form-control"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="d-flex justify-content-center mt-3 login_container">
                  <button className="btn login_btn" type="submit">
                    login
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-4">
              <div className="d-flex justify-content-center links">
                Don't have an account?{" "}
                <Link to="/register" className="ml-2">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

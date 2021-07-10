import React, { useState, useEffect } from "react";
import Axios from "axios";
import { domain, header, header_without_token } from "../../env/env";
import { alertService } from "../app/service";
import { Alert } from "../app/Alert";
import "./login.css";
import { Link, useHistory } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const history = useHistory();

  const RegisterRequest = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Password not match try again !");
    } else {
      Axios({
        method: "post",
        url: `${domain}/register/`,
        headers: header_without_token,
        data: {
          username: username,
          email: email,
          password: password,
        },
      })
        .then((response) => {
          // console.log(response.data);
          if (response.data["user"]) {
            history.push("/login");
          }
          alert(response.data.msg);
        })
        .catch((error) => {
          alertService.error("Try again!", {
            id: "left-alert",
          });
        });
    }
  };

  return (
    <>
      <div className="container h-100 mt-5">
        <Alert id="left-alert" />
        <div className="d-flex justify-content-center h-100">
          <div className="user_card">
            <div className="d-flex justify-content-center">
              <h3 id="form-title">Sign up</h3>
            </div>
            <div className="d-flex justify-content-center form_container">
              <form onSubmit={RegisterRequest}>
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
                <div className="input-group mb-3">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    name="Email"
                    placeholder="Email..."
                    className="form-control"
                    onChange={(e) => {
                      setEmail(e.target.value);
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
                <div className="input-group mb-2">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    name="password"
                    placeholder="Confirm Password..."
                    className="form-control"
                    onChange={(e) => {
                      setPassword2(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="d-flex justify-content-center mt-3 login_container">
                  <button className="btn login_btn" type="submit">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-4">
              <div className="d-flex justify-content-center links">
                Already have an account?{" "}
                <Link to="/login" className="ml-2">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

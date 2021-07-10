import "./App.css";
import { Header } from "../header/Header";
import Todo from "../todo/Todo";
import TodoDetails from "../todo/TodoDetails";
import Login from "../user/Login";
import Register from "../user/Register";
import Profile from "../user/Profile";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { domain, header, token } from "../../env/env";
import { useGlobalState } from "../../state/provider";

function App() {
  const [{ profile, pageReload }, dispatch] = useGlobalState();

  useEffect(() => {
    if (token !== null) {
      const getdata = async () => {
        await Axios({
          method: "Get",
          url: `${domain}/profile/`,
          headers: header,
        }).then((response) => {
          // console.log(response.data);
          dispatch({
            type: "ADD_Profile",
            profile: response.data,
          });
        });
      };
      getdata();
    }
  }, [pageReload]);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/">
            {token === null ? (
              <Redirect to="/login" />
            ) : (
              <>
                <Header title={"My Todo List"} />
                <Todo />
              </>
            )}
          </Route>
          <Route exact path="/todo/:id">
            {token === null ? (
              <Redirect to="/login" />
            ) : (
              <>
                <Header title={"My Todo List"} />
                <TodoDetails />
              </>
            )}
          </Route>
          <Route exact path="/profile">
            {token === null ? (
              <Redirect to="/login" />
            ) : (
              <>
                <Header title={"My Todo List"} />
                <Profile />
              </>
            )}
          </Route>

          {/* if there is no url exit redirect to home page */}
          <Route exact>
            <Header title={"My Todo List"} login={false} />
            <Todo />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

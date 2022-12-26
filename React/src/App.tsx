import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/UI/NavBar";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import AddProject from "./pages/AddProject";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Chats from "./pages/Chats";
import Error from "./components/UI/Error";
import UserProfile from "./pages/UserProfile";
import { useSelector } from "react-redux";
import { login, logout, selectUser } from "./redux/user";
import { useDispatch } from "react-redux";
import { useHttpClient } from "./hooks/http-hook";
import { selectErrorMsg } from "./redux/error";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [storedData, setStoredData] = useState(JSON.parse(localStorage.getItem("userData")))

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const errorMsg = useSelector(selectErrorMsg);

  const { error } = useHttpClient();

  let routes;
  let logoutTimer;

  useEffect(() => {
    if (user.token && storedData.expiration) {
      const remainingTime = storedData.expiration.getTime() - new Date().getTime();
      logoutTimer = setTimeout(handler, remainingTime);
      function handler() {
        dispatch(logout());
      }
    } else {
      clearTimeout(logoutTimer);
    }
  }, [user.token, logout, storedData.expiration]);

  useEffect(() => {
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      dispatch(
        login({
          userId: storedData.userId,
          token: storedData.token,
          expiration: new Date(new Date().getTime() + 1000 * 60 * 60),
        })
      );
    }
  }, [login]);

  if (user.token) {
    routes = (
      <Switch>
        <Route path={["/", "/projects"]} exact>
          <Projects />
        </Route>
        <Route path="/projects/:projectId" exact>
          <ProjectDetails />
        </Route>
        <Route path="/add-project" exact>
          <AddProject />
        </Route>
        <Route path="/chats" exact>
          <Chats />
        </Route>
        <Route path="/user/:uid" exact>
          <UserProfile />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login" exact>
          <LogIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <NavBar />
      {error && <Error errorMessage={errorMsg}/>}
      {routes}
    </BrowserRouter>
  );
};

export default App;

import React, { useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { login, logout, selectUser } from "./redux/user";
import { useDispatch } from "react-redux";
import { useHttpClient } from "./hooks/http-hook";
import { selectErrorMsg } from "./redux/error";
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
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const errorMsg = useSelector(selectErrorMsg);

  const { error } = useHttpClient();

  let routes;

  useEffect(() => {
    let logoutTimer;
    if (user.token && user.expirationDate) {
      let remainingTime =
        new Date(user.expirationDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(handler, remainingTime);
      function handler() {
        dispatch(logout());
      }
    } else {
      clearTimeout(logoutTimer);
    }
  }, [user.token, logout, user.expirationDate]);

  useEffect(() => {
    let storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expirationDate) > new Date()
    ) {
      dispatch(
        login({
          userId: storedData.userId,
          token: storedData.token,
          expirationDate: new Date(
            new Date().getTime() + 36000000
          ).toISOString(),
        })
      );
    }
  }, [dispatch]);

  if (user.token) {
    routes = (
      <Switch>
        <Route path={["/", "/my-projects/:userId"]} exact>
          <Projects />
        </Route>
        <Route path="/projects/:projectId" exact>
          <ProjectDetails />
        </Route>
        <Route path="/add-project" exact>
          <AddProject />
        </Route>
        <Route path={["/chats", "/chats/:projectId"]} exact>
          <Chats />
        </Route>
        <Route path="/user/:userId" exact>
          <UserProfile />
        </Route>
        <Route path="*">
          <Projects />
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
          <Home />
        </Route>
      </Switch>
    );
  }

  return (
    <HashRouter>
      <NavBar />
      {error && <Error errorMessage={errorMsg} />}
      {routes}
    </HashRouter>
  );
};

export default App;

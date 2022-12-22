import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/UI/NavBar";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import AddProject from "./pages/AddProject";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Chats from "./pages/Chats";
import "bootstrap/dist/css/bootstrap.min.css";
import UserProfile from "./pages/UserProfile";
import { useSelector } from "react-redux";
import { selectLogged } from "./redux/user";

const App = () => {
  const logged = useSelector(selectLogged);
  let routes;

  if (logged) {
    routes = (
      <Switch>
        <Route path="/" exact>
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
        <Redirect to="/" />
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
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <NavBar />
      {routes}
    </BrowserRouter>
  );
};

export default App;

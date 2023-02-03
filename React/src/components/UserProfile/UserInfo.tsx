import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "src/hooks/http-hook";
import TaskList from "../ProjectDetails/ProjectTasks/TaskList";
import ProjectList from "../Projects/ProjectList";
import { SearchBarUsers } from "../UI/SearchBar";
import classes from "./UserInfo.module.css";

const UserInfo = () => {
  const { sendRequest } = useHttpClient();

  const [currentUser, setCurrentUser] = useState<any>();

  const userId = useParams<any>().userId;

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/user/${userId}`
        );
        setCurrentUser(responseData.user);
        console.log("currentUser ", currentUser);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCurrentUser();
  }, [sendRequest, userId]);

  return currentUser ? (
    <Fragment>
      <div className={classes.cover} />
      <div className={classes.user_info}>
        <img
          alt="user_img"
          src={currentUser.image}
          className={classes.user_img}
        />
        <div className={classes.text}>
          <p>
            Name: {currentUser.name} {currentUser.surname}
          </p>
          <p>Email: {currentUser.email}</p>
          <p>Age: {currentUser.age}</p>
        </div>
      </div>
      <ProjectList heading={`${currentUser.name}'s projects`} target={[]}/>
      <TaskList viewModeOnly={true} heading={`${currentUser.name}'s tasks`} target={[]}/>
    </Fragment>
  ) : (
    <p>No current user</p>
  );
};

export default UserInfo;

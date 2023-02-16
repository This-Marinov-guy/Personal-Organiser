import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "src/hooks/http-hook";
import ProjectList from "../Projects/ProjectList";
import { OverlayTrigger } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import { SearchBarUsers } from "../UI/SearchBar";
import classes from "./UserInfo.module.css";

const UserInfo = () => {
  const [currentUser, setCurrentUser] = useState<{
    id:string;
    name: string;
    surname: string;
    email: string;
    image: string;
    age: number;
  }>();
  const [userProjects, setUserProjects] = useState<{
    viewMode:boolean;
    id: string;
    title: string;
    description: string;
    image:string;
  }[]>();
  const [searchMode, setSearchMode] = useState<boolean>(false);

  const { sendRequest } = useHttpClient();

  const userId = useParams<any>().userId;

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/user/${userId}`
        );
        setCurrentUser(responseData.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCurrentUser();
  }, [sendRequest, userId]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/projects/my-projects/${currentUser.id}`
        );
        setUserProjects(responseData.projects);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, currentUser]);

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
        <div className={classes.searchbar}>
          {searchMode ? (
            <SearchBarUsers redirect={true} />
          ) : (
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip id={`tooltip-right`}>Tap to Search User</Tooltip>
              }
            >
              <i
                style={{ fontSize: "3rem" }}
                className="fa-solid fa-magnifying-glass"
                onClick={() => setSearchMode(true)}
              ></i>
            </OverlayTrigger>
          )}
        </div>
      </div>
      <ProjectList
        viewMode={true}
        heading={`${currentUser.name}'s projects`}
        target={userProjects}
      />
    </Fragment>
  ) : (
    <p>No current user</p>
  );
};

export default UserInfo;

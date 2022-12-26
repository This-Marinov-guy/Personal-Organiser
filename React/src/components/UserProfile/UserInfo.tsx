import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "src/hooks/http-hook";
import classes from "./UserInfo.module.css";

const UserInfo = () => {
  const [currentUser, setCurrentUser] = useState();

  const { sendRequest } = useHttpClient();

  const userId = useParams();
  console.log(userId);
  
  // useEffect(() => {
  //   const fetchCurrentUser = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         `http://localhost:5000/api/users/${userId}`
  //       );
  //       setCurrentUser(responseData.user);
  //     } catch (err) {}
  //   };
  //   fetchCurrentUser();
  // }, [sendRequest, userId]);

  return (
    <Fragment>
      <div className={classes.cover} />
      <div className={classes.user_info}>
        <img
          src="https://fossbytes.com/wp-content/uploads/2021/06/rick-and-morty-s5-5.jpg"
          className={classes.user_img}
        />
        <div className={classes.text}>
          <p>Name: Ivan Madakov</p>
          <p>Email: Ivan@test.com</p>
          <p>Age: 22</p>
        </div>
      </div>
    </Fragment>
  );
};

export default UserInfo;

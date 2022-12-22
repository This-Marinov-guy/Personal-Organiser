import React, { Fragment } from "react";
import classes from "./UserInfo.module.css";

const UserInfo = () => {
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

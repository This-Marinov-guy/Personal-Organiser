import React from "react";
import classes from "./SomeoneTyping.module.css";

const SomeoneTyping = () => {
  return (
    <div className={classes.typing}>
      <p className={classes.text}>Someone is typing</p>
      <svg height="40" width="40" className={classes.loader}>
        <circle
          className={classes.dot}
          cx="10"
          cy="20"
          r="3"
          style={{ fill: "grey" }}
        />
        <circle
          className={classes.dot}
          cx="20"
          cy="20"
          r="3"
          style={{ fill: "grey" }}
        />
        <circle
          className={classes.dot}
          cx="30"
          cy="20"
          r="3"
          style={{ fill: "grey" }}
        />
      </svg>
    </div>
  );
};

export default SomeoneTyping;

import React from "react";
import classes from "./Background.module.css";

const Background = (props: { src: string }) => {
  return (
    <video src={props.src} className={classes.video} autoPlay loop muted />
  );
};

export default Background;

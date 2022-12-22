import React from "react";
import classes from "./Heading.module.css";

const Heading = (props: { children: string }) => {
  return <h3 className={classes.heading}>{props.children}</h3>;
};

const SemiHeading = (props: { children: string }) => {
  return <h5 className={classes.heading}>{props.children}</h5>;
};

export { Heading, SemiHeading };

import React, { useState, useEffect } from "react";
import classes from "./Status.module.css";

const Status = (props: { level: string; children?: string }) => {
  const [importancyColor, setimportancyColor] = useState("#00e100");

  useEffect(() => {
    switch (props.level) {
      case "1":
        return setimportancyColor("#00e100");
      case "2":
        return setimportancyColor("#3cb371");
      case "3":
        return setimportancyColor("yellow");
      case "4":
        return setimportancyColor("#ffa500");
      case "5":
        return setimportancyColor("#ff0000");
      default:
        return setimportancyColor("#6f7271");
    }
  }, [props.level]);

  return (
    <div
      style={{ backgroundColor: importancyColor }}
      className={classes.importancy_level}
    >
      {props.children}
    </div>
  );
};

export default Status;

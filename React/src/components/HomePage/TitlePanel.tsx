import React from "react";
import Button from "react-bootstrap/Button";
import classes from "./TitlePanel.module.css";

const HomePanel = () => {
  return (
    <div className={classes.panel}>
      <h1>Welcome to the HR Organiser</h1>
      <p>Slide down to find more about us or join the program immediately</p>
      <div className={classes.buttons}>
        <Button href="/signup" variant="primary">
          Let's start
        </Button>
        <Button href="/login" variant="outline-primary">
          Already in
        </Button>
      </div>
    </div>
  );
};

export default HomePanel;

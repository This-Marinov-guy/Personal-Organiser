import React from "react";
import Button from "react-bootstrap/Button";
import classes from "./Navigation.module.css";

interface NavProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Navigation = (props: NavProps) => {
  return (
    <div className={classes.navigation_buttons}>
      <Button
        variant="outline-primary"
        name="ProjectTasks"
        onClick={props.onClick}
      >
        Tasks
      </Button>
      <Button
        variant="outline-primary"
        name="ProjectWorkers"
        onClick={props.onClick}
      >
        Workers
      </Button>
    </div>
  );
};

export default Navigation;

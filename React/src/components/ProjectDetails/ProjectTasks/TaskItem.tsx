import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Status from "src/components/UI/Status";
import classes from "./Tasks.module.css";

interface TaskProps {
  id: string;
  title: string;
  content: string;
  level: string;
  status: string;
  editHandler?: any;
  abortHandler?: any;
  completeHandler?: any;
}

const TaskItem = (props: TaskProps) => {
  return (
      <Card style={{ width: "18rem" }}>
        {(props.status === "aborted" || props.status === "completed") && (
          <div className={classes.inactive_task}></div>
        )}
        {props.status === "aborted" && (
          <i
            style={{ color: "#e22440" }}
            className={"fa-solid fa-ban " + classes.status_icon}
          ></i>
        )}
        {props.status === "completed" && (
          <i
            style={{ color: "green" }}
            className={"fa-solid fa-check " + classes.status_icon}
          ></i>
        )}
        <Card.Body>
          <div className={classes.task_status}>
            <Card.Title>{props.title}</Card.Title>
            <Status level={props.level}></Status>
          </div>
          <br />
          <Card.Subtitle>Objectives</Card.Subtitle>
          <Card.Text>{props.content}</Card.Text>
          <br />
          <div className={classes.task_buttons}>
            <Button
              id={props.id}
              onClick={props.completeHandler}
              variant="outline-success"
            >
              Done
            </Button>
            <Button
              id={props.id}
              onClick={props.editHandler}
              variant="outline-info"
            >
              Edit
            </Button>
            <Button
              id={props.id}
              onClick={props.abortHandler}
              variant="outline-danger"
            >
              Abort
            </Button>
          </div>
        </Card.Body>
      </Card>
  );
};

export default TaskItem;

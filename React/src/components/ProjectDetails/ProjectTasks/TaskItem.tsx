import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Status from "src/components/UI/Status";
import classes from "./Tasks.module.css";

interface TaskProps {
  id: string;
  title: string;
  content: string;
  level: string;
  onClick?: any;
  editHandler?: any;
}

const TaskItem = (props: TaskProps) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <div className={classes.task_status}>
        <Card.Title>{props.title}</Card.Title>
        <Status level={props.level}>{props.level}</Status>
        </div>
        <br />
        <Card.Subtitle>Objectives</Card.Subtitle>
        <Card.Text>{props.content}</Card.Text>
        <br />
        <div className={classes.task_buttons}>
          <Button variant="outline-success">Done</Button>
          <Button onClick={props.editHandler} variant="outline-info">
            Edit
          </Button>
          <Button variant="outline-danger">Abort</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskItem;

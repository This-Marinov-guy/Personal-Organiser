import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import NavDropdown from "react-bootstrap/NavDropdown";
import classes from "./Tasks.module.css";

interface TaskProps {
  id: string;
  title: string;
  notes: string[];
  participants: string[];
  onClick?:any;
  editHandler?:any;
}

const TaskItem = (props: TaskProps) => {

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <br/>
        <Card.Subtitle>Sub-tasks</Card.Subtitle>
        <ListGroup className="list-group-flush">
          {props.notes.map((note) => {
            return <ListGroup.Item>{note}</ListGroup.Item>;
          })}
        </ListGroup>
        <br />
        <NavDropdown title="Participants" id="basic-nav-dropdown">
          {props.participants.map((participant) => {
            return (
              <Fragment>
                <NavDropdown.Item>{participant}</NavDropdown.Item>
                <NavDropdown.Divider />
              </Fragment>
            );
          })}
        </NavDropdown>
        <br/>
        <div className={classes.task_buttons}>
          <Button variant="outline-success">Done</Button>
          <Button onClick={props.editHandler} variant="outline-info">Edit</Button>
          <Button variant="outline-danger">Abort</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskItem;

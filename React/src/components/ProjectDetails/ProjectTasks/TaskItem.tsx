import React, { Fragment, useState } from "react";
import Card from "react-bootstrap/Card";
import Warning from "src/components/UI/Warning";
import Modal from "src/components/UI/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useHttpClient } from "src/hooks/http-hook";
import { removeWarning, selectWarning, showWarning } from "src/redux/modal";
import Button from "react-bootstrap/Button";
import Status from "src/components/UI/Status";
import classes from "./Tasks.module.css";

interface TaskProps {
  id: string;
  title: string;
  content: string;
  level: string;
  status: string;
  editHandler: any;
}

const TaskItem = (props: TaskProps) => {
  const [taskStatus, setTaskStatus] = useState("");

  const { sendRequest } = useHttpClient();

  const warning = useSelector(selectWarning);
  const dispatch = useDispatch();

  const projectId = useParams<any>().projectId;

  const abortTaskHandler = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/tasks/abort-task/${projectId}`,
        "PATCH",
        JSON.stringify({
          taskId: props.id,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      dispatch(removeWarning());
    } catch (err) {}
  };

  const completeTaskHandler = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/tasks/complete-task/${projectId}`,
        "PATCH",
        JSON.stringify({
          taskId: props.id,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      dispatch(removeWarning());
    } catch (err) {}
  };

  let actionWarning;
  if (taskStatus === "abort") {
    actionWarning = (
      <Warning
        warning="You are about to abort the task! Once aborted, it cannot be reverse!"
        onClick={abortTaskHandler}
        submit_message="Abort"
      />
    );
  } else if (taskStatus === "complete") {
    actionWarning = (
      <Warning
        variant="success"
        warning="You are about to complete the task! Once completed, it cannot be reverse!"
        onClick={completeTaskHandler}
        submit_message="Complete"
      />
    );
  }

  return (
    <Fragment>
      {warning && <Modal>{actionWarning}</Modal>}
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
              onClick={() => {
                setTaskStatus("complete");
                dispatch(showWarning());
              }}
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
              onClick={() => {
                setTaskStatus("abort");
                dispatch(showWarning());
              }}
              variant="outline-danger"
            >
              Abort
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default TaskItem;

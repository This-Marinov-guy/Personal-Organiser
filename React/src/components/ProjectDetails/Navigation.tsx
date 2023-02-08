import React, { useState, Fragment } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useHttpClient } from "src/hooks/http-hook";
import { selectWarning, showWarning } from "src/redux/modal";
import { selectUser } from "src/redux/user";
import Modal from "../UI/Modal";
import Warning from "../UI/Warning";
import classes from "./Navigation.module.css";

interface NavigationProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  projectCreator: string;
}

const Navigation = (props: NavigationProps) => {
  const [userAction, setUserAction] = useState();

  const { sendRequest } = useHttpClient();

  const user = useSelector(selectUser);
  const warning = useSelector(selectWarning);

  const dispatch = useDispatch();

  const projectId = useParams<any>().projectId;

  const history = useHistory();

  const openWarningHandler = (event) => {
    setUserAction(event.target.id);
    dispatch(showWarning());
  };

  const abortprojectHandler = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/projects/abort-project/${projectId}`,
        "PATCH",
        JSON.stringify({
          userId: user.userId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.userId,
        }
      );
      history.push("/");
    } catch (err) {}
  };

  const deleteProjectHandler = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/projects/delete-project/${projectId}`,
        "DELETE",
        {},
        { Authorization: "Bearer " + user.userId }
      );
      history.push("/");
    } catch (err) {}
  };

  let warningPanel;
  if (userAction === "leave") {
    warningPanel = (
      <Warning
        warning="You are about to exit this project as well as its chat. Do you wish to proceed?"
        onClick={abortprojectHandler}
        submit_message="Leave"
      />
    );
  } else if (userAction === "delete") {
    warningPanel = (
      <Warning
        warning="You are about to delete this project as well as its chat. Do you wish to proceed?"
        onClick={deleteProjectHandler}
        submit_message="Delete"
      />
    );
  }

  return (
    <Fragment>
      {warning && <Modal>{warningPanel}</Modal>}
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
        <OverlayTrigger
          overlay={<Tooltip id="tooltip-disabled">Abort project</Tooltip>}
        >
          <span className="d-inline-block">
            <Button
              id="leave"
              variant="outline-danger"
              onClick={openWarningHandler}
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </Button>
          </span>
        </OverlayTrigger>
        {props.projectCreator === user.userId && (
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Delete project</Tooltip>}
          >
            <span className="d-inline-block">
              <Button
                id="delete"
                variant="outline-danger"
                onClick={openWarningHandler}
              >
                <i className="fa-solid fa-trash"></i>
              </Button>
            </span>
          </OverlayTrigger>
        )}
      </div>
    </Fragment>
  );
};

export default Navigation;

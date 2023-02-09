import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { removeError } from "src/redux/error";
import ReactDOM from "react-dom";
import Alert from "react-bootstrap/Alert";
import classes from "./Overlay.module.css";

const portalElement: any = document.getElementById("overlays");

const Error = (props: { errorMessage: string }) => {
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(removeError());
  };
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={classes.overlay_backdrop} onClick={closeHandler} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <div className={classes.error_overlay_panel}>
          <Alert variant="danger" onClose={closeHandler} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{props.errorMessage}</p>
          </Alert>
        </div>,
        portalElement
      )}
    </Fragment>
  );
};
export default Error;

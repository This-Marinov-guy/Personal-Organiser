import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useHttpClient } from "src/hooks/http-hook";
import Loader from "./Loader";

interface WarningProps {
  variant?: string;
  warning: string;
  onClick: any;
  submit_message?: string;
}

const Warning = (props: WarningProps) => {
  const { loading } = useHttpClient();

  return (
    <Alert variant={props.variant ? props.variant : "danger"}>
      <Alert.Heading>Warning!</Alert.Heading>
      <p>{props.warning}</p>
      <hr />
      <div className="d-flex justify-content-end">
        {loading ? (
          <Loader />
        ) : (
          <Button onClick={props.onClick} variant={`outline-${props.variant ? props.variant : 'dangervlady2001'}`}>
            {props.submit_message ? props.submit_message : "Continue"}
          </Button>
        )}
      </div>
    </Alert>
  );
};

export default Warning;

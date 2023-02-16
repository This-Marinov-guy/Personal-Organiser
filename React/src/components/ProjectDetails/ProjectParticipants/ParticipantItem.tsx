import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "src/redux/user";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import classes from "./Participants.module.css";

interface ParticipantProps {
  id: string;
  name: string;
  image: string;
  email: string;
  onRemoveParticipant: any;
  projectCreator: string;
}

const ParticipantItem = (props: ParticipantProps) => {
  const user = useSelector(selectUser);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Subtitle>{props.email}</Card.Subtitle>
      </Card.Body>
      <Card.Body>
        {props.projectCreator === user.userId && (
          <Button
            id={props.id}
            className={classes.btn}
            variant="outline-danger"
            onClick={props.onRemoveParticipant}
          >
            Remove
          </Button>
        )}
        <Card.Link href={`/user/${props.id}`}>Details</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default ParticipantItem;

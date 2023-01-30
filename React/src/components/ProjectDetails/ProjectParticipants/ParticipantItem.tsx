import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import classes from './Participants.module.css'

interface ParticipantProps {
  id: string;
  name: string;
  image: string;
  email: string;
}

const ParticipantItem = (props: ParticipantProps) => {

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Subtitle>{props.email}</Card.Subtitle>
      </Card.Body>
      <Card.Body>
        <Button className={classes.btn} variant="outline-primary">Chat</Button>
        <Button className={classes.btn} variant="outline-danger">Remove</Button>
        <Card.Link href="#">Details</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default ParticipantItem;

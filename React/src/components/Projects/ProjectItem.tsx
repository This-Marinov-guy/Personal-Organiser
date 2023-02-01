import React, { Fragment } from "react";
import Button from "react-bootstrap/Button";
import { NavDropdown } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import classes from "./Project.module.css";


interface ProjectProps {
  id: string;
  title: string;
  description: string;
  participants: string[];
  image: string;
}

const ProjectItem: React.FC<ProjectProps> = (props: ProjectProps) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        {props.participants.map((participant) => {
          return (
            <Fragment>
              <NavDropdown.Item>{participant}</NavDropdown.Item>
              <NavDropdown.Divider />
            </Fragment>
          );
        })}
        <Button variant="primary" href={`/projects/${props.id}`}>
          Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProjectItem;

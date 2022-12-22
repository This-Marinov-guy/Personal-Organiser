import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import classes from "./Project.module.css";
import { useDispatch } from "react-redux";
import { showModal } from "src/redux/modal";

interface ProjectProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

const ProjectItem: React.FC<ProjectProps> = (props: ProjectProps) => {
  const dispatch = useDispatch();
  
  const editHandler = () => {
    dispatch(showModal());
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Button variant="primary" href={`/projects/${props.id}`}>
          Details
        </Button>
        <Button
          className={classes.btn}
          variant="outline-info"
          onClick={editHandler}
        >
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProjectItem;

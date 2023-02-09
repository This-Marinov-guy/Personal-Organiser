import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

interface ProjectProps {
  viewMode?: boolean;
  id: string;
  title: string;
  description: string;
  image: string;
}

const ProjectItem: React.FC<ProjectProps> = (props: ProjectProps) => {
  return (
    <Card style={{ width: props.viewMode ? "10rem" : "18rem" }}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        {!props.viewMode && (
          <Button variant="primary" href={`/projects/${props.id}`}>
            Details
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProjectItem;

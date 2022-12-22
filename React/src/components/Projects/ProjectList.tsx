import React, { Fragment, useState } from "react";
import ProjectItem from "./ProjectItem";
import Row from "react-bootstrap/Row";
import { selectModal, showModal } from "src/redux/modal";
import { useSelector, useDispatch } from "react-redux";
import { Heading } from "../UI/Heading";
import { SearchBarAuto } from "../UI/SearchBar";
import classes from "./Project.module.css";
import Modal from "../UI/Modal";
import Error from "../UI/Error";
import AddProjectItem from "../AddProject/AddProjectItem";
import { selectError } from "src/redux/error";

const DUMMY_PROJECTS = [
  {
    id: "p1",
    title: "My bug business",
    description: "A very cool and stinky one",
    image:
      "https://i.pinimg.com/originals/61/e3/55/61e3552467f1f697195b9ea9b07c9cd5.jpg",
  },
  {
    id: "p2",
    title: "My bug business",
    description: "A very cool and stinky one",
    image:
      "https://i.pinimg.com/originals/61/e3/55/61e3552467f1f697195b9ea9b07c9cd5.jpg",
  },
  {
    id: "p3",
    title: "Lovely",
    description: "A very cool and stinky one",
    image:
      "https://i.pinimg.com/originals/61/e3/55/61e3552467f1f697195b9ea9b07c9cd5.jpg",
  },
  {
    id: "p4",
    title: "Hello",
    description: "A very cool and stinky one",
    image:
      "https://i.pinimg.com/originals/61/e3/55/61e3552467f1f697195b9ea9b07c9cd5.jpg",
  },
  {
    id: "p5",
    title: "Hello",
    description: "A very cool and stinky one",
    image:
      "https://i.pinimg.com/originals/61/e3/55/61e3552467f1f697195b9ea9b07c9cd5.jpg",
  },
  {
    id: "p6",
    title: "Lovely",
    description: "A very cool and stinky one",
    image:
      "https://i.pinimg.com/originals/61/e3/55/61e3552467f1f697195b9ea9b07c9cd5.jpg",
  },
];

const ProjectList = () => {
  const [filter, setFilter] = useState('');

  const modal = useSelector(selectModal);
  const error = useSelector(selectError);
  const dispatch = useDispatch()

  return (
    <Fragment>
      <Heading>Your projects</Heading>
      {modal && <Modal>
        <AddProjectItem/></Modal>}
        {error && <Error errorMessage="Be careful"/>}
      <SearchBarAuto setFilter={setFilter} />
      <div className={classes.projects_display}>
        <Row
          xs={1}
          sm={2}
          md={3}
          lg={4}
          xll={5}
          className={classes.projects_display + " g-4"}
        >
          {DUMMY_PROJECTS.filter((value: any) => {
            return value.title.toLowerCase().includes(filter.toLowerCase());
          }).map((project) => {
            return (
              <ProjectItem
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
              />
            );
          })}
        </Row>
      </div>
    </Fragment>
  );
};

export default ProjectList;

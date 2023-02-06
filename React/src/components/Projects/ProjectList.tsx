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

interface ProjectListprops {
  heading: string;
  target: Array<any>;
}

const ProjectList = (props: ProjectListprops) => {
  const [filter, setFilter] = useState("");

  return (
    <Fragment>
      <Heading>{props.heading}</Heading>
      <SearchBarAuto setFilter={setFilter} />
      <div className={classes.projects_display}>
        {props.target ? (
          <Row
            xs={1}
            sm={2}
            md={3}
            lg={4}
            xll={5}
            className={classes.projects_display + " g-4"}
          >
            {props.target
              .filter((value: any) => {
                return value.title.toLowerCase().includes(filter.toLowerCase());
              })
              .map((project) => {
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
        ) : (
          <p style={{ textAlign: "center" }}>
            No Projects exist under this criteria
          </p>
        )}
      </div>
    </Fragment>
  );
};

export default ProjectList;

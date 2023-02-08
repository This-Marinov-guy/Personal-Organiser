import React, { Fragment, useState } from "react";
import ProjectItem from "./ProjectItem";
import Row from "react-bootstrap/Row";
import { Heading } from "../UI/Heading";
import { SearchBarAuto } from "../UI/SearchBar";
import classes from "./Project.module.css";

interface ProjectListprops {
  viewMode?: boolean;
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
            xs={props.viewMode ? 2 : 1}
            sm={props.viewMode ? 4 : 2}
            md={props.viewMode ? 6 : 3}
            lg={props.viewMode ? 8 : 4}
            xll={props.viewMode ? 10 : 5}
            className={classes.projects_display + " g-4"}
          >
            {props.target
              .filter((value: any) => {
                return value.title.toLowerCase().includes(filter.toLowerCase());
              })
              .map((project) => {
                return (
                  <ProjectItem
                    viewMode={props.viewMode}
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

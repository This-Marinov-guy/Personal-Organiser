import React, { Fragment, useState } from "react";
import Navigation from "src/components/ProjectDetails/Navigation";
import TaskList from "src/components/ProjectDetails/ProjectTasks/TaskList";
import WorkerList from "src/components/ProjectDetails/ProjectWorkers/WorkerList";

const ProjectTasks = (
  <Fragment>
    <TaskList />
  </Fragment>
);

const ProjectWorkers = (
  <Fragment>
    <WorkerList />
  </Fragment>
);

const ProjectDetails = () => {
  const [currentPage, setCurrentPage] = useState("ProjectTasks");

  const pageModifierHandler = (event: any) => {
    console.log(event.target.name);
    setCurrentPage(event.target.name);
  };

  const renderSwitch = () => {
    switch (currentPage) {
      case "ProjectTasks":
        return ProjectTasks;
      case "ProjectWorkers":
        return ProjectWorkers;
      default:
        return ProjectTasks;
    }
  };

  return (
    <Fragment>
      <Navigation onClick={pageModifierHandler} />
      {renderSwitch()}
    </Fragment>
  );
};

export default ProjectDetails;

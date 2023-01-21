import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "src/components/ProjectDetails/Navigation";
import TaskList from "src/components/ProjectDetails/ProjectTasks/TaskList";
import WorkerList from "src/components/ProjectDetails/ProjectWorkers/WorkerList";
import { useHttpClient } from "src/hooks/http-hook";

const ProjectDetails = () => {
  const [currentPage, setCurrentPage] = useState("ProjectTasks");
  const [projectTasks, setProjectTasks] = useState();

  const { sendRequest } = useHttpClient();

  const projectId = useParams<any>().projectId;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/projects/tasks/${projectId}`
        );
        setProjectTasks(responseData.tasks.sort((a, b) => b.level - a.level));
      } catch (err) {}
    };
    fetchTasks();
  }, []);

  const pageModifierHandler = (event: any) => {
    setCurrentPage(event.target.name);
  };

  const renderSwitch = () => {
    switch (currentPage) {
      case "ProjectTasks":
        return <TaskList heading={"Project Tasks"} target={projectTasks} />;
      case "ProjectWorkers":
        return <WorkerList />;
      default:
        return <p>Nothing to see</p>;
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

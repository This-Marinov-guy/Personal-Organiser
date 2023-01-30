import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "src/components/ProjectDetails/Navigation";
import TaskList from "src/components/ProjectDetails/ProjectTasks/TaskList";
import ParticipantsList from "src/components/ProjectDetails/ProjectParticipants/ParticipantsList";
import { useHttpClient } from "src/hooks/http-hook";

const ProjectDetails = () => {
  const [currentPage, setCurrentPage] = useState("ProjectTasks");
  const [projectTasks, setProjectTasks] = useState();
  const [projectParticipants, setProjectParticipants] = useState();
  const [projectCreator, setPojectCreator] = useState();

  const { sendRequest } = useHttpClient();

  const projectId = useParams<any>().projectId;

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/user/project-users/${projectId}`
        );
        console.log(responseData);
       setProjectParticipants(responseData.users)
      } catch (err) {}
    };
    fetchParticipants();
  }, [sendRequest]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/tasks/${projectId}`
        );
        setProjectTasks(responseData.tasks.sort((a, b) => b.level - a.level));
        setPojectCreator(responseData.projectCreator);
      } catch (err) {}
    };
    fetchTasks();
  }, [sendRequest]);

  const pageModifierHandler = (event: any) => {
    setCurrentPage(event.target.name);
  };

  const renderSwitch = () => {
    switch (currentPage) {
      case "ProjectTasks":
        return <TaskList heading={"Project Tasks"} target={projectTasks} />;
      case "ProjectWorkers":
        return <ParticipantsList heading={"Project Participants"} target={projectParticipants} />;
      default:
        return <p>Nothing to see</p>;
    }
  };

  return (
    <Fragment>
      <Navigation
        projectCreator={projectCreator}
        onClick={pageModifierHandler}
      />
      {renderSwitch()}
    </Fragment>
  );
};

export default ProjectDetails;

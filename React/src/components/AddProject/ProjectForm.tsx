import React, { useState } from "react";
import AddTaskItem from "../ProjectDetails/ProjectTasks/AddTaskItem";
import AddParticipantsPanel from "../ProjectDetails/ProjectParticipants/AddParticipantsPanel";
import { Heading } from "../UI/Heading";
import { SemiHeading } from "../UI/Heading";
import AddProjectItem from "./AddProjectItem";
import classes from "./ProjectForm.module.css";
import { useHistory } from "react-router-dom";

const ProjectForm = () => {
  const [projectId, setProjectId] = useState();
  const [formSubmitted, setFormSubmitted] = useState({
    projectForm: false,
    taskForm: false,
    participantForm: false,
  });

  const history = useHistory();

  if (
    formSubmitted.projectForm &&
    formSubmitted.taskForm &&
    formSubmitted.participantForm
  ) {
    history.push(`/projects/${projectId}`);
  }

  return (
    <div className={classes.main_form}>
      <div className={classes.left_panel}>
        <Heading>Build your new project</Heading>
        <AddProjectItem
          setProjectId={setProjectId}
          setFormSubmitted={setFormSubmitted}
          formSubmitted={formSubmitted}
        />
      </div>
      <div className={classes.right_panel}>
        <SemiHeading>Add the first task</SemiHeading>
        <AddTaskItem
          projectId={projectId}
          submitAction="addFirstTask"
          setFormSubmitted={setFormSubmitted}
          formSubmitted={formSubmitted}
        />
        <SemiHeading>Include people to the project</SemiHeading>
        <AddParticipantsPanel
          projectId={projectId}
          workAloneOption={true}
          setFormSubmitted={setFormSubmitted}
          formSubmitted={formSubmitted}
        />
      </div>
    </div>
  );
};

export default ProjectForm;

import React, { useState } from "react";
import AddTaskItem from "../ProjectDetails/ProjectTasks/AddTaskItem";
import AddParticipantsPanel from "../ProjectDetails/ProjectParticipants/AddParticipantsPanel";
import { Heading } from "../UI/Heading";
import { SemiHeading } from "../UI/Heading";
import AddProjectItem from "./AddProjectItem";
import classes from "./ProjectForm.module.css";

const ProjectForm = () => {
  const [projectId, setProjectId] = useState();
  
  return (
    <div className={classes.main_form}>
      <div className={classes.left_panel}>
        <Heading>Build your new project</Heading>
        <AddProjectItem setProjectId={setProjectId} />
      </div>
      <div className={classes.right_panel}>
        <SemiHeading>Add the first task</SemiHeading>
        <AddTaskItem projectId={projectId} submitAction="addFirstTask" />
        <SemiHeading>Include people to the project</SemiHeading>
        <AddParticipantsPanel projectId={projectId} workAloneOption={true}/>
      </div>
    </div>
  );
};

export default ProjectForm;

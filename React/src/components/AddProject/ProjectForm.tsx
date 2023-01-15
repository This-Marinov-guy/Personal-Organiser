import React, { useState, Fragment } from "react";
import { classicNameResolver } from "typescript";
import AddTaskItem from "../ProjectDetails/ProjectTasks/AddTaskItem";
import AddWorkersPanel from "../ProjectDetails/ProjectWorkers/AddWorkersPanel";
import { Heading } from "../UI/Heading";
import { SemiHeading } from "../UI/Heading";
import AddProjectItem from "./AddProjectItem";
import classes from "./ProjectForm.module.css";

const ProjectForm = () => {
  const [projectId, setProjectId] = useState();
  console.log('projectId ', projectId);
  
  return (
    <div className={classes.main_form}>
      <div className={classes.left_panel}>
        <Heading>Build your new project</Heading>
        <AddProjectItem setProjectId={setProjectId}/>
      </div>
      <div className={classes.right_panel}>
        <SemiHeading>Add the first task</SemiHeading>
        <AddTaskItem projectId={projectId}/>
        <SemiHeading>Include people to the project</SemiHeading>
        <AddWorkersPanel projectId={projectId}/>
      </div>
    </div>
  );
};

export default ProjectForm;

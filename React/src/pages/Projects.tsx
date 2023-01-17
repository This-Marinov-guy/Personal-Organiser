import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHttpClient } from "src/hooks/http-hook";
import { selectUser } from "src/redux/user";
import ProjectList from "../components/Projects/ProjectList";

const Projects = () => {
  const [userProjects, setUserProjects] = useState();
  const { sendRequest } = useHttpClient();

  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/projects/my-projects/${user.userId}`
        );
        setUserProjects(responseData.projects);
      } catch (err) {        
      }
    };
    fetchPlaces();
  }, []);
  return <ProjectList target={userProjects} heading={"All Projects"} />;
};

export default Projects;

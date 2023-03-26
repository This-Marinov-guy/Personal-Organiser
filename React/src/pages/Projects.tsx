import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHttpClient } from "src/hooks/http-hook";
import { selectUser } from "src/redux/user";
import ProjectList from "../components/Projects/ProjectList";

const Projects = () => {
  const [userProjects, setUserProjects] = useState<
    {
      id: string;
      viewMode: boolean;
      title: string;
      description: string;
      image: string;
    }[]
  >();

  const { sendRequest } = useHttpClient();

  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_URL}/projects/my-projects/${user.userId}`
        );
        setUserProjects(responseData.projects);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest]);
  return (
    <ProjectList
      viewMode={false}
      target={userProjects}
      heading={"All Projects"}
    />
  );
};

export default Projects;

import React, { useState, useEffect } from "react";
import PersonalChat from "./PersonalChat";
import ChatBubble from "./ChatBubble";
import classes from "./ChatsList.module.css";
import { Heading } from "../UI/Heading";
import { useHttpClient } from "src/hooks/http-hook";
import { useSelector } from "react-redux";
import { selectUser } from "src/redux/user";
import { useParams } from "react-router-dom";

const ChatsList = () => {
  const { sendRequest } = useHttpClient();

  const [chatBubbles, setChatBubbles] = useState([]);

  const user = useSelector(selectUser);

  const projectId = useParams<any>().projectId;

  useEffect(() => {
    const fetchProjectBubbles = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/projects/my-projects/${user.userId}`
        );
        setChatBubbles(responseData.projects);
        console.log(responseData.projects)
      } catch (err) {}
    };
    fetchProjectBubbles();
  }, [sendRequest]);

  return (
    <div className={classes.chats_display}>
      <Heading>Your chats</Heading>
      <div className={classes.chats_list}>
        {chatBubbles.map((project) => (
          <ChatBubble key={project.id} src={project.image} to={`/chats/${project.id}`} />
        ))}
      </div>
      <PersonalChat projectId={projectId}/>
    </div>
  );
};

export default ChatsList;

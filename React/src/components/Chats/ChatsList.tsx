import React, { useState, useEffect } from "react";
import { useHttpClient } from "src/hooks/http-hook";
import { useSelector } from "react-redux";
import { selectUser } from "src/redux/user";
import { useParams } from "react-router-dom";
import PersonalChat from "./PersonalChat";
import ChatBubble from "./ChatBubble";
import { Heading } from "../UI/Heading";
import classes from "./ChatsList.module.css";

const ChatsList = () => {
  const [chatBubbles, setChatBubbles] = useState<
    { id: string; title: string; image: string }[]
  >([]);

  const { sendRequest } = useHttpClient();

  const user = useSelector(selectUser);

  const projectId = useParams<{ projectId: string }>().projectId;

  useEffect(() => {
    const fetchProjectBubbles = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_URL}/projects/my-projects/${user.userId}`
        );
        setChatBubbles(responseData.projects);
      } catch (err) {}
    };
    fetchProjectBubbles();
  }, [sendRequest]);

  return (
    <div className={classes.chats_display}>
      <Heading>Your chats</Heading>
      <div className={classes.chats_list}>
        {chatBubbles.map((project) => (
          <ChatBubble
            key={project.id}
            name={project.title}
            src={project.image}
            to={`/chats/${project.id}`}
          />
        ))}
      </div>
      <PersonalChat projectId={projectId} />
    </div>
  );
};

export default ChatsList;

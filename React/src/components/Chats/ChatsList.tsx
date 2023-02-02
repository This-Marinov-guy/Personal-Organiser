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
    const fetchChats = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/chats/get-chats/${user.userId}`
        );
        setChatBubbles(responseData.chats);
      } catch (err) {}
    };
    fetchChats();
  }, [sendRequest]);

  return (
    <div className={classes.chats_display}>
      <Heading>Your chats</Heading>
      <div className={classes.chats_list}>
        {chatBubbles.map((chat) => (
          <ChatBubble key={chat.id} src={chat.image} to={`/chats${chat.id}`} />
        ))}
      </div>
      <PersonalChat projectId={projectId} />
    </div>
  );
};

export default ChatsList;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatMessage from "./ChatMessage";
import SendMessage from "./SendMessage";
import classes from "./PersonalChat.module.css";
import { useHttpClient } from "src/hooks/http-hook";

const PersonalChat = (props: { projectId: string }) => {
  const [chatMessages, setChatMessages] = useState([]);

  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/chats/get-messages/${props.projectId}`
        );
        setChatMessages(responseData.chat);
      } catch (err) {}
    };
    if (props.projectId) {
      fetchChatMessages();
    }
  }, [sendRequest]);

  return (
    <div className={classes.chat_window}>
      <div className={classes.chat_heading}>
        <h3>{new Date().toLocaleDateString("de-DE")}</h3>
        <h3>Someone</h3>
      </div>
      <div className={classes.chat_display}>
        {chatMessages.length !== 0 ? (
          chatMessages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        ) : (
          <h4 className={classes.no_messages_alert}>
            Access one of the chat rooms by clicking the bubbles above
          </h4>
        )}
      </div>
      <SendMessage projectId={props.projectId} />
    </div>
  );
};

export default PersonalChat;

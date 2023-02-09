import React, { useState, useEffect, useRef } from "react";
import { useHttpClient } from "src/hooks/http-hook";
import ChatMessage from "./ChatMessage";
import SendMessage from "./SendMessage";
import classes from "./PersonalChat.module.css";

const PersonalChat = (props: { projectId: string }) => {
  const [chatMessages, setChatMessages] = useState([]);

  const { sendRequest } = useHttpClient();

  const messagesEndRef = useRef(null);

  const fetchChatMessages = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/chats/get-messages/${props.projectId}`
      );
      setChatMessages(responseData.chat);
      messagesEndRef.current.scrollIntoView();
      console.log("sent");
    } catch (err) {}
  };

  useEffect(() => {
    if (props.projectId) {
      fetchChatMessages();
    }
  }, [sendRequest, props.projectId]);

  return (
    <div className={classes.chat_window}>
      <div className={classes.chat_heading}>
        <h3>{new Date().toLocaleDateString("de-DE")}</h3>
        <h3>Chat</h3>
      </div>
      <div className={classes.chat_display}>
        {chatMessages.length > 0 ? (
          chatMessages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        ) : (
          <h4 className={classes.no_messages_alert}>
            {props.projectId
              ? "No messages, start by typing something"
              : "Access one of the chat rooms by clicking the bubbles above"}
          </h4>
        )}
        <div ref={messagesEndRef}></div>
      </div>
      <SendMessage projectId={props.projectId} onSubmit={fetchChatMessages} />
    </div>
  );
};

export default PersonalChat;

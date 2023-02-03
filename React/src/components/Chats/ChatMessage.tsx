import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "src/redux/user";
import classes from "./ChatMessage.module.css";

const ChatMessage = ({ message }) => {
  const user = useSelector(selectUser);

  const messageClass =
    message.sender === user.userId
      ? classes.sent_message
      : classes.received_message;
  return (
    <div className={messageClass}>
      <p className={classes.message_sender}>{message.senderName}</p>
      <p className={classes.message_content}>{message.text}</p>
    </div>
  );
};

export default ChatMessage;

import React from "react";
import classes from "./ChatMessage.module.css";

const ChatMessage = ({ message }) => {

  const messageClass = message.uid === 'me' ? classes.sent_message : classes.received_message;
  return (
    <div className={messageClass}>
      <p className={classes.message_sender}>{message.sender}</p>
      <p className={classes.message_content}>{message.text}</p>
    </div>
  );
}

export default ChatMessage;

import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ChatMessage from "./ChatMessage";
import SendMessage from "./SendMessage";
import classes from "./PersonalChat.module.css";

const messages = [
  {
    id: "m1",
    uid: "me",
    sender: "Gosho",
    text: "hello mate how r u?",
  },
  {
    id: "m2",
    uid: "me",
    sender: "Gosho",
    text: "hello mate how r u?",
  },
  {
    id: "m3",
    uid: "you",
    sender: "Gosho",
    text: "hello mate how r u?",
  },
  {
    id: "m1",
    uid: "me",
    sender: "Gosho",
    text: "hello mate how r u?",
  },
  {
    id: "m2",
    uid: "me",
    sender: "Gosho",
    text: "hello mate how r u?",
  },
  {
    id: "m3",
    uid: "you",
    sender: "Gosho",
    text: "hello mate how r u?",
  },
  {
    id: "m1",
    uid: "me",
    sender: "Gosho",
    text: "hello mate how r u?",
  },
  {
    id: "m2",
    uid: "me",
    sender: "Gosho",
    text: "hello mate how r u?",
  },
  {
    id: "m3",
    uid: "you",
    sender: "Gosho",
    text: "hello mate how r u?",
  },
  {
    id: "m1",
    uid: "me",
    sender: "Gosho",
    text: "hello mate how r u?",
  },
  {
    id: "m2",
    uid: "me",
    sender: "Gosho",
    text: "hello mate how r u?",
  },
  {
    id: "m3",
    uid: "you",
    sender: "Gosho",
    text: "hello mate how r u?",
  },
];

const PersonalChat = () => {
  return (
    <div className={classes.chat_window}>
      <div className={classes.chat_heading}>
        <h3>{new Date().toLocaleDateString("de-DE")}</h3>
        <h3>Someone</h3>
      </div>
      <div className={classes.chat_display}>
        {messages.length !== 0 ? (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        ) : (
          <h4 className={classes.no_messages_alert}>
            Access one of the chat rooms by clicking the bubbles above
          </h4>
        )}
      </div>
        <SendMessage />
    </div>
  );
};

export default PersonalChat;

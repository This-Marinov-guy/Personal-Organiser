import React from "react";
import { Link } from "react-router-dom";
import classes from "./ChatBubble.module.css";

interface ChatBubbleProps {
  to: string;
  src: string;
}

const ChatBubble = (props: ChatBubbleProps) => {
  return (
    <Link style={{ padding: "1rem" }} to={props.to}>
      <img src={props.src} className={classes.chat_bubble}></img>
    </Link>
  );
};

export default ChatBubble;

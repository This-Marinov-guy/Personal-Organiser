import React from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import classes from "./ChatBubble.module.css";

interface ChatBubbleProps {
  to: string;
  src: string;
  name: string
}

const ChatBubble = (props: ChatBubbleProps) => {
  return (
    <OverlayTrigger
    placement="top"
    overlay={
      <Tooltip id={`tooltip-top`}>{props.name}</Tooltip>
    }
  >
    <Link style={{ padding: "1rem" }} to={props.to}>
      <img src={props.src} className={classes.chat_bubble}></img>
    </Link>
    </OverlayTrigger>
  );
};

export default ChatBubble;

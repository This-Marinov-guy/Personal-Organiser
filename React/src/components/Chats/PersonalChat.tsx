import React, { useState, useEffect, useRef } from "react";
import { useHttpClient } from "src/hooks/http-hook";
import ChatMessage from "./ChatMessage";
import SendMessage from "./SendMessage";
import NavDropdown from "react-bootstrap/NavDropdown";
import SomeoneTyping from "../UI/SomeoneTyping";
import classes from "./PersonalChat.module.css";

const PersonalChat = (props: { projectId: string }) => {
  const [chatMessages, setChatMessages] = useState<
    { id: string; message: string }[]
  >([]);
  const [chatTitle, setChatTitle] = useState<string>();
  const [chatParticipants, setChatParticipants] = useState<
    { id: string; name: string; surname: string }[]
  >([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const { sendRequest } = useHttpClient();

  const messagesEndRef = useRef(null);

  const fetchChatMessages = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/chats/get-messages/${props.projectId}`
      );
      setChatMessages(responseData.chat);
      setChatTitle(responseData.title);
      setChatParticipants(responseData.participants);
      messagesEndRef.current.scroll({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth",
      });
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
        <h3>Project: {chatTitle}</h3>
        <h3>
          <NavDropdown title="Participants" id="navbarScrollingDropdown">
            {chatParticipants.map((user) => (
              <NavDropdown.Item href={`/user/${user.id}`}>
                {user.name + " " + user.surname}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </h3>
      </div>
      <div className={classes.chat_display} ref={messagesEndRef}>
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
        {isTyping && <SomeoneTyping />}
      </div>
      <SendMessage
        projectId={props.projectId}
        onSubmit={fetchChatMessages}
        setIsTyping={setIsTyping}
      />
    </div>
  );
};

export default PersonalChat;

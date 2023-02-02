import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Input from "../UI/Input";
import classes from "./SendMessage.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "src/redux/user";
import { useHttpClient } from "src/hooks/http-hook";

const SendMessage = (props: { projectId: string }) => {
  const [message, setMessage] = useState();

  const { sendRequest } = useHttpClient();

  const user = useSelector(selectUser);

  const changeHandler = (event) => {
    setMessage(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/chats/add-message/${props.projectId}`,
        "PATCH",
        {
          senderId: user.userId,
          text: message,
        },
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}
  };

  return (
    <Form className={classes.send_message_display} onSubmit={submitHandler}>
      <div style={{ width: "80%" }}>
        <Input
          type="text"
          name="text"
          placeholder="Message"
          onChange={changeHandler}
        />
      </div>
      <Button type="submit" variant="primary">
        Send
      </Button>
    </Form>
  );
};

export default SendMessage;

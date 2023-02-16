import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "src/redux/user";
import { useHttpClient } from "src/hooks/http-hook";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Input from "../UI/Input";
import classes from "./SendMessage.module.css";

interface SendMessageProps {
  projectId: string;
  onSubmit: Function;
  setIsTyping: Function;
}

const SendMessage = (props: SendMessageProps) => {
  const [message, setMessage] = useState<string>();

  const { sendRequest } = useHttpClient();

  const user = useSelector(selectUser);

  const changeHandler = (event) => {
    setMessage(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_URL}/chats/add-message/${props.projectId}`,
        "PATCH",
        JSON.stringify({
          senderId: user.userId,
          text: message,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        }
      );
      setMessage('')
      props.onSubmit();
    } catch (err) {}
  };

  return (
    <Fragment>
      {props.projectId && (
        <Form id='message' className={classes.send_message_display} onSubmit={submitHandler}>
          <div style={{ width: "80%" }}>
            <Input
              autoComplete="off"
              type="text"
              name="text"
              placeholder="Message"
              value={message}
              onChange={changeHandler}
              onFocus={() => {
                props.setIsTyping(true);
              }}
              onBlur={() => {
                props.setIsTyping(false);
              }}
            />
          </div>
          <Button type="submit" variant="primary">
            Send
          </Button>
        </Form>
      )}
    </Fragment>
  );
};

export default SendMessage;

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Input from "../UI/Input";
import classes from "./SendMessage.module.css";

const SendMessage = () => {
  return (
    <Form className={classes.send_message_display} onSubmit={() => {}}>
      <div style={{width:'80%'}}>
        <Input type="text" name="text" placeholder="Message" />
      </div>
      <Button type='submit' variant="primary">Send</Button>
    </Form>
  );
};

export default SendMessage;

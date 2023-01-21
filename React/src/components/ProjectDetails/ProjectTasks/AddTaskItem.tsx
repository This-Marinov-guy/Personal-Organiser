import React, { Fragment, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Input from "src/components/UI/Input";
import { v4 as uuidv4 } from "uuid";
import classes from "./AddTaskItem.module.css";
import { useHttpClient } from "src/hooks/http-hook";
import { useSelector } from "react-redux";
import { selectUser } from "src/redux/user";
import Loader from "src/components/UI/Loader";
import Status from "src/components/UI/Status";

const AddTaskItem = (props: { projectId?: string }) => {
  const { loading, sendRequest } = useHttpClient();

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    level: "1",
  });

  const [isSubmitted, setisSubmitted] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const clickHandler = () => {
    setIsButtonClicked(true);
  };

  const user = useSelector(selectUser);

  const changeFormInputHandler = (event) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/projects/add-task",
        "POST",
        JSON.stringify({
          projectId: props.projectId,
          creator: user.userId,
          title: inputs.title,
          content: inputs.content,
          level: inputs.level,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setisSubmitted(true);
    } catch (err) {}
  };

  return (
    <Fragment>
      <Form onSubmit={submitHandler} className={classes.form_panel}>
        {isSubmitted ? (
          <i className={classes.icon + " fa-solid fa-check"}></i>
        ) : (
          <Fragment>
            <Input
              label="Title"
              type="text"
              name="title"
              onChange={changeFormInputHandler}
            />
            <Input
              as="textarea"
              label="Task"
              type="description"
              name="content"
              onChange={changeFormInputHandler}
            />
            <div className={classes.importancy_options}>
              <Input
                label="Level of Importancy"
                type="number"
                min="1"
                max="5"
                placeholder="between 1-5"
                name="level"
                onChange={changeFormInputHandler}
              />
              <Status level={inputs.level}/>
            </div>
            {loading && isButtonClicked ? (
              <Loader />
            ) : (
              <Button
                className={classes.form_btn}
                onClick={clickHandler}
                type="submit"
              >
                Add Task
              </Button>
            )}
          </Fragment>
        )}
      </Form>
    </Fragment>
  );
};

export default AddTaskItem;

import React, { Fragment, useEffect, useCallback, useState } from "react";
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
import { useDispatch } from "react-redux";
import { removeModal } from "src/redux/modal";

interface AddTaskItemProps {
  projectId: string;
  taskId?: string;
  editMode?: boolean;
  addMode?: boolean;
}

const AddTaskItem = (props) => {
  const { loading, sendRequest } = useHttpClient();

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    level: "1",
  });

  const [isSubmitted, setisSubmitted] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [placeholders, setPlaceholders] = useState({
    title: "",
    content: "",
    level: "",
  });

  const clickHandler = () => {
    setIsButtonClicked(true);
  };

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const changeFormInputHandler = (event) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const addFirstTaskSubmitHandler = async (event) => {
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
      dispatch(removeModal());
    } catch (err) {}
  };

  const addDirectTaskSubmitHandler = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/projects/add-task/${props.projectId}`,
        "POST",
        JSON.stringify({
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
      dispatch(removeModal());
    } catch (err) {}
  };

  const editTaskSubmitHandler = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/projects/edit-task/${props.projectId}`,
        "PATCH",
        JSON.stringify({
          taskId: props.taskId,
          title: inputs.title,
          content: inputs.content,
          level: inputs.level,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setisSubmitted(true);
      dispatch(removeModal());
    } catch (err) {}
  };

  const submitHandler = (event) => {
    if (props.addMode && !props.editMode) {
      addDirectTaskSubmitHandler();
    } else if (!props.addMode && props.editMode) {
      editTaskSubmitHandler();
    } else {
      addFirstTaskSubmitHandler(event);
    }
  };

  useEffect(() => {
    if (props.taskId) {
      const fetchCurrentTask = async () => {
        try {
          const responseData = await sendRequest(
            `http://localhost:5000/api/projects/fetch-task/${props.projectId}`,
            "POST",
            JSON.stringify({
              taskId: props.taskId,
            }),
            {
              "Content-Type": "application/json",
            }
          );
          setPlaceholders({
            title: responseData.targetTask.title,
            content: responseData.targetTask.content,
            level: responseData.targetTask.level,
          });
        } catch (err) {}
      };
      fetchCurrentTask();
    }
  }, []);

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
              placeholder={props.taskId && placeholders.title}
              onChange={changeFormInputHandler}
            />
            <Input
              as="textarea"
              label="Task"
              type="description"
              name="content"
              placeholder={props.taskId && placeholders.content}
              onChange={changeFormInputHandler}
            />
            <div className={classes.importancy_options}>
              <Input
                label="Level of Importancy"
                type="number"
                min="1"
                max="5"
                placeholder={props.taskId ? placeholders.level : "between 1-5"}
                name="level"
                onChange={changeFormInputHandler}
              />
              <Status level={inputs.level} />
            </div>
            {loading && isButtonClicked ? (
              <Loader />
            ) : (
              <Button
                className={classes.form_btn}
                onClick={clickHandler}
                type="submit"
              >
                {props.editMode ? "Update Task" : "Add Task"}
              </Button>
            )}
          </Fragment>
        )}
      </Form>
    </Fragment>
  );
};

export default AddTaskItem;

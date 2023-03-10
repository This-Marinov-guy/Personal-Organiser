import React, { Fragment, useEffect, useCallback, useState } from "react";
import { useHttpClient } from "src/hooks/http-hook";
import { useSelector } from "react-redux";
import { selectUser } from "src/redux/user";
import { useDispatch } from "react-redux";
import { removeModal } from "src/redux/modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Input from "src/components/UI/Input";
import Loader from "src/components/UI/Loader";
import Status from "src/components/UI/Status";
import classes from "./AddTaskItem.module.css";

interface AddTaskItemProps {
  projectId: string;
  taskId?: string;
  submitAction: string;
  setFormSubmitted?: Function;
  formSubmitted?: any;
}

const AddTaskItem = (props: AddTaskItemProps) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    level: "1",
  });

  const { loading, sendRequest } = useHttpClient();

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.taskId) {
      const fetchCurrentTask = async () => {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_URL}/tasks/fetch-task/${props.projectId}`,
            "POST",
            JSON.stringify({
              taskId: props.taskId,
            }),
            {
              "Content-Type": "application/json",
              Authorization: "Bearer " + user.token,
            }
          );
          setInputs({
            title: responseData.targetTask.title,
            content: responseData.targetTask.content,
            level: responseData.targetTask.level,
          });
        } catch (err) {}
      };
      fetchCurrentTask();
    }
  }, [sendRequest]);

  const clickHandler = () => {
    setIsButtonClicked(true);
  };

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
        `${process.env.REACT_APP_URL}/tasks/add-task`,
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
          Authorization: "Bearer " + user.token,
        }
      );
      if (props.formSubmitted) {
        props.setFormSubmitted((prevState) => {
          return { ...prevState, taskForm: true };
        });
      }
      dispatch(removeModal());
    } catch (err) {}
  };

  const addDirectTaskSubmitHandler = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_URL}/tasks/add-task/${props.projectId}`,
        "POST",
        JSON.stringify({
          creator: user.userId,
          title: inputs.title,
          content: inputs.content,
          level: inputs.level,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        }
      );
      if (props.formSubmitted) {
        props.setFormSubmitted((prevState) => {
          return { ...prevState, taskForm: true };
        });
      }
      dispatch(removeModal());
      window.location.reload();
    } catch (err) {}
  };

  const editTaskSubmitHandler = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_URL}/tasks/edit-task/${props.projectId}`,
        "PATCH",
        JSON.stringify({
          taskId: props.taskId,
          title: inputs.title,
          content: inputs.content,
          level: inputs.level,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        }
      );
      if (props.formSubmitted) {
        props.setFormSubmitted((prevState) => {
          return { ...prevState, taskForm: true };
        });
      }
      dispatch(removeModal());
      window.location.reload();
    } catch (err) {}
  };

  const submitHandler = (event) => {
    if (props.submitAction === "addFirstTask") {
      addFirstTaskSubmitHandler(event);
    } else if (props.submitAction === "addDirectTask") {
      addDirectTaskSubmitHandler();
    } else if (props.submitAction === "editTask") {
      editTaskSubmitHandler();
    }
  };

  return (
    <Fragment>
      <Form onSubmit={submitHandler} className={classes.form_panel}>
        {props.formSubmitted && props.formSubmitted.taskForm ? (
          <i className={classes.icon + " fa-solid fa-check"}></i>
        ) : (
          <Fragment>
            <Input
              label="Title"
              type="text"
              name="title"
              value={inputs.title}
              onChange={changeFormInputHandler}
            />
            <Input
              as="textarea"
              label="Task"
              type="description"
              name="content"
              value={inputs.content}
              onChange={changeFormInputHandler}
            />
            <div className={classes.importancy_options}>
              <Input
                label="Level of Importancy"
                type="number"
                min="1"
                max="5"
                value={inputs.level}
                placeholder="between 1-5"
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
                {props.submitAction === "editTask" ? "Update Task" : "Add Task"}
              </Button>
            )}
          </Fragment>
        )}
      </Form>
    </Fragment>
  );
};

export default AddTaskItem;

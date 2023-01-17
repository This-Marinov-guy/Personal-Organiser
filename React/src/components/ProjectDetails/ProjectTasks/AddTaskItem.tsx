import React, { Fragment, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Input from "src/components/UI/Input";
import { v4 as uuidv4 } from "uuid";
import classes from "./AddTaskItem.module.css";
import { useHttpClient } from "src/hooks/http-hook";
import { useSelector } from "react-redux";
import { selectUser } from "src/redux/user";
import Loader from "src/components/UI/Loader";

const AddTaskItem = (props: { projectId?: string }) => {
  const { loading, sendRequest } = useHttpClient();

  const [title, setTitle] = useState("Nameless task");

  const [subtasks, setSubtasks] = useState([
    {
      id: 1,
      subtask: "",
    },
  ]);

  const [isSubmitted, setisSubmitted] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const clickHandler = () => {
    setIsButtonClicked(true);
  };

  const user = useSelector(selectUser);

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const taskChangeHandler = (i: any, event: any) => {
    const values: any = [...subtasks];
    values[i][event.target.name] = event.target.value;
    setSubtasks(values);
  };

  const addSubTaskHandler = () => {
    setSubtasks([...subtasks, { id: uuidv4(), subtask: "" }]);
  };

  const deleteTaskHandler = (i: any) => {
    const values: any = [...subtasks];
    values.splice(i, 1);
    setSubtasks(values);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/project/add-task",
        "POST",
        JSON.stringify({
          projectId: props.projectId,
          creator: user.userId,
          title: title,
          subtasks: subtasks,
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
              onChange={titleChangeHandler}
            />
            <div className={classes.notes}>
              <Form.Label>Sub-tasks</Form.Label>
              <Button
                size="sm"
                variant="outline-success"
                className={classes.notes_btn}
                onClick={() => {
                  addSubTaskHandler();
                }}
              >
                Add Note
              </Button>
            </div>
            <br />
            {subtasks.map((subtask, i) => {
              return (
                <div key={subtask.id} className={classes.extra_tasks}>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      <i className="fa-solid fa-thumbtack"></i>
                    </InputGroup.Text>
                    <Form.Control
                      name="subtask"
                      onChange={(event) => taskChangeHandler(i, event)}
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                    />
                  </InputGroup>
                  <Button
                    disabled={subtask.id === 1}
                    onClick={() => {
                      deleteTaskHandler(i);
                    }}
                    size="sm"
                    variant="outline-danger"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </Button>
                </div>
              );
            })}
            {loading && isButtonClicked ? (
              <Loader />
            ) : (
              <Button className={classes.form_btn} onClick={clickHandler} type="submit">
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

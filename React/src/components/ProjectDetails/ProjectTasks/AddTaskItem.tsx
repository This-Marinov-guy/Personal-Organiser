import React, { Fragment, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Input from "src/components/UI/Input";
import classes from "./AddTaskItem.module.css";
import { useHttpClient } from "src/hooks/http-hook";
import { useSelector } from "react-redux";
import { selectUser } from "src/redux/user";
import Loader from "src/components/UI/Loader";

const AddTaskItem = (props : {projectId?:string}) => {
  const { loading, sendRequest } = useHttpClient();

  const [inputs, setInputs] = useState([
    {
      id: 1,
      task: "",
    },
  ]);

  const [isSubmitted, setisSubmitted] = useState(false);

  const user = useSelector(selectUser);

  const taskChangeHandler = (i: any, event: any) => {
    const values: any = [...inputs];
    values[i][event.target.name] = event.target.value;
    setInputs(values);
  };

  const addTaskHandler = () => {
    setInputs([...inputs, { id: Math.random(), task: "" }]);
  };

  const deleteTaskHandler = (i: any) => {
    const values: any = [...inputs];
    values.splice(i, 1);
    setInputs(values);
  };

  const submitHandler = async () => {
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/project//add-task",
        "POST",
        JSON.stringify({
          projectId: props.projectId,
          task: inputs
        }),
        { Authorization: "Bearer " + user.token }
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
            <Input label="Title" type="text" name="title" />
            <div className={classes.notes}>
              <Form.Label>Sub-tasks</Form.Label>
              <Button
                size="sm"
                variant="outline-success"
                className={classes.notes_btn}
                onClick={() => {
                  addTaskHandler();
                }}
              >
                Add Note
              </Button>
            </div>
            <br />
            {inputs.map((input, i) => {
              return (
                <div key={input.id} className={classes.extra_tasks}>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      <i className="fa-solid fa-thumbtack"></i>
                    </InputGroup.Text>
                    <Form.Control
                      name="task"
                      value={input.task}
                      onChange={(event) => taskChangeHandler(i, event)}
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                    />
                  </InputGroup>
                  <Button
                    disabled={input.id === 1}
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
            {loading ? (
              <Loader />
            ) : (
              <Button className={classes.form_btn} type="submit">
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

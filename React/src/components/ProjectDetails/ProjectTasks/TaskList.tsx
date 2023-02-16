import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { selectUser } from "src/redux/user";
import { useSelector, useDispatch } from "react-redux";
import { useHttpClient } from "src/hooks/http-hook";
import {
  selectModal,
  showModal,
  showWarning,
  selectWarning,
} from "src/redux/modal";
import TaskItem from "./TaskItem";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { SearchBarAuto } from "../../UI/SearchBar";
import Warning from "src/components/UI/Warning";
import Modal from "src/components/UI/Modal";
import AddTaskItem from "./AddTaskItem";
import { Heading } from "src/components/UI/Heading";
import classes from "./Tasks.module.css";

interface TaskListprops {
  viewModeOnly?: boolean;
  heading: string;
  target: Array<any>;
}

const TaskList = (props: TaskListprops) => {
  const [filter, setFilter] = useState("");
  const [submitAction, setSubmitAction] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskId, setTaskId] = useState();

  const { sendRequest } = useHttpClient();

  const user = useSelector(selectUser);

  const warning = useSelector(selectWarning);
  const modal = useSelector(selectModal);

  const dispatch = useDispatch();

  const projectId = useParams<any>().projectId;

  const addHandler = () => {
    setSubmitAction("addDirectTask");
    dispatch(showModal());
  };

  const editHandler = (event) => {
    setTaskId(event.target.id);
    setSubmitAction("editTask");
    dispatch(showModal());
  };

  const abortTaskHandler = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_URL}/tasks/abort-task/${projectId}`,
        "PATCH",
        JSON.stringify({
          taskId: taskId,
        }),
        {
          "Content-Type": "application/json",
          Authorization : "Bearer " + user.token
        }
      );
      window.location.reload();
    } catch (err) {}
  };

  const completeTaskHandler = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_URL}/tasks/complete-task/${projectId}`,
        "PATCH",
        JSON.stringify({
          taskId: taskId,
        }),
        {
          "Content-Type": "application/json",
          Authorization : "Bearer " + user.token
        }
      );
      window.location.reload();
    } catch (err) {}
  };

  let actionWarning;
  if (taskStatus === "abort") {
    actionWarning = (
      <Warning
        warning="You are about to abort the task! Once aborted, it cannot be reverse!"
        onClick={abortTaskHandler}
        submit_message="Abort"
      />
    );
  } else if (taskStatus === "complete") {
    actionWarning = (
      <Warning
        variant="success"
        warning="You are about to complete the task! Once completed, it cannot be reverse!"
        onClick={completeTaskHandler}
        submit_message="Complete"
      />
    );
  }

  return (
    <Fragment>
      {warning && <Modal>{actionWarning}</Modal>}
      {modal && (
        <Modal>
          <AddTaskItem
            projectId={projectId}
            taskId={taskId}
            submitAction={submitAction}
          />
        </Modal>
      )}

      <Heading>{props.heading}</Heading>
      <SearchBarAuto setFilter={setFilter} />
      <div className={classes.tasks_display}>
        {props.target ? (
          <Row
            xs={1}
            sm={2}
            md={3}
            lg={4}
            xll={5}
            className={classes.tasks_display + " g-4"}
          >
            {props.target
              .filter((value: any) => {
                return value.title.toLowerCase().includes(filter.toLowerCase());
              })
              .map((task) => {
                return (
                  <TaskItem
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    content={task.content}
                    level={task.level}
                    status={task.status}
                    editHandler={editHandler}
                    abortHandler={(event) => {
                      setTaskId(event.target.id);
                      setTaskStatus("abort");
                      dispatch(showWarning());
                    }}
                    completeHandler={(event) => {
                      setTaskId(event.target.id);
                      setTaskStatus("complete");
                      dispatch(showWarning());
                    }}
                  />
                );
              })}
           {!props.viewModeOnly && <Card className={classes.icon}>
              <i className={"fa-solid fa-plus"} onClick={addHandler}></i>
            </Card>}
          </Row>
        ) : (
          <p style={{ textAlign: "center" }}>No tasks with such criteria</p>
        )}
      </div>
    </Fragment>
  );
};

export default TaskList;

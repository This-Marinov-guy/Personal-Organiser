import React, { Fragment, useState } from "react";
import TaskItem from "./TaskItem";
import Row from "react-bootstrap/Row";
import { SearchBarAuto } from "../../UI/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Tasks.module.css";
import Modal from "src/components/UI/Modal";
import AddTaskItem from "./AddTaskItem";
import { v4 as uuidv4 } from "uuid";
import AddWorkersPanel from "../ProjectWorkers/AddWorkersPanel";
import { selectModal, showModal } from "src/redux/modal";
import { Heading } from "src/components/UI/Heading";
import { useParams } from "react-router-dom";

interface TaskListprops {
  heading: string;
  target: Array<any>;
}

const TaskList = (props: TaskListprops) => {
  const [filter, setFilter] = useState("");
  const [addMode, setAddMode] = useState(false);
  const [editMode, setEditMode] = useState(false);


  const modal = useSelector(selectModal);
  const dispatch = useDispatch();

  const projectId = useParams<any>().projectId;

  const addHandler = () => {
    setAddMode(true)
    setEditMode(false)
    dispatch(showModal());
  };

  const editHandler = () => {
    setEditMode(true)
    setAddMode(false)
    dispatch(showModal());
  };
  return (
    <Fragment>
      {modal && (
        <Modal>
          <AddTaskItem projectId={projectId} editMode={editMode} addMode={addMode}/>
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
                    editHandler={editHandler}
                  />
                );
              })}
            <div className={classes.icon}>
              <i className={"fa-solid fa-plus"} onClick={addHandler}></i>
            </div>
          </Row>
        ) : (
          <p style={{ textAlign: "center" }}>No tasks with such criteria</p>
        )}
      </div>
    </Fragment>
  );
};

export default TaskList;

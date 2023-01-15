import React, { Fragment, useState } from "react";
import TaskItem from "./TaskItem";
import Row from "react-bootstrap/Row";
import { SearchBarAuto } from "../../UI/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Tasks.module.css";
import Modal from "src/components/UI/Modal";
import AddTaskItem from "./AddTaskItem";
import AddWorkersPanel from "../ProjectWorkers/AddWorkersPanel";
import { selectModal, showModal } from "src/redux/modal";
import { Heading } from "src/components/UI/Heading";

interface TaskListprops {
  heading: string
  target: Array<any>,
}

const TaskList = (props: TaskListprops) => {
  const [filter, setFilter] = useState("");

  const modal = useSelector(selectModal);
  const dispatch = useDispatch()

  const editHandler = () => {
    dispatch(showModal())
  }
  return (
    <Fragment>
      {modal && <Modal>
        <AddTaskItem/>
        <AddWorkersPanel/>
      </Modal>}
      <Heading>{props.heading}</Heading>
      <SearchBarAuto setFilter={setFilter} />
      <div className={classes.tasks_display}>
        {props.target.length > 0 ? <Row
          xs={1}
          sm={2}
          md={3}
          lg={4}
          xll={5}
          className={classes.tasks_display + " g-4"}
        >
          {props.target.filter((value: any) => {
            return value.title.toLowerCase().includes(filter.toLowerCase());
          }).map((task) => {
            return (
              <TaskItem
                key={task.id}
                id={task.id}
                title={task.title}
                notes={task.notes}
                participants={task.participants}
                editHandler={editHandler}
              />
            );
          })}
        </Row> : <p style={{textAlign : 'center'}}>No tasks with such criteria</p>}
      </div>
    </Fragment>
  );
};

export default TaskList;

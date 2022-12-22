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

const DUMMY_TASKS = [
  {
    id: "t1",
    title: "Emergency meeting",
    notes: ["do this", "then do this"],
    participants: ["Ivan", "Gosho", "Niki"],
  },
  {
    id: "t2",
    title: "Emergency meeting",
    notes: ["do this", "then do this"],
    participants: ["Ivan", "Gosho", "Niki"],
  },
  {
    id: "t3",
    title: "Emergency meeting",
    notes: ["do this", "then do this"],
    participants: ["Ivan", "Gosho", "Niki"],
  },
  {
    id: "t1",
    title: "Emergency meeting",
    notes: ["do this", "then do this"],
    participants: ["Ivan", "Gosho", "Niki"],
  },
  {
    id: "t2",
    title: "Emergency meeting",
    notes: ["do this", "then do this"],
    participants: ["Ivan", "Gosho", "Niki"],
  },
  {
    id: "t3",
    title: "Emergency meeting",
    notes: ["do this", "then do this"],
    participants: ["Ivan", "Gosho", "Niki"],
  },
];

const TaskList = () => {
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
      <SearchBarAuto setFilter={setFilter} />
      <div className={classes.tasks_display}>
        <Row
          xs={1}
          sm={2}
          md={3}
          lg={4}
          xll={5}
          className={classes.tasks_display + " g-4"}
        >
          {DUMMY_TASKS.filter((value: any) => {
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
        </Row>
      </div>
    </Fragment>
  );
};

export default TaskList;

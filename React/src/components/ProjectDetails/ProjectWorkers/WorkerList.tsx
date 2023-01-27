import React, { Fragment, useState } from "react";
import WorkerItem from "./WorkerItem";
import { Heading } from "src/components/UI/Heading";
import Row from "react-bootstrap/Row";
import { SearchBarAuto } from "../../UI/SearchBar";
import classes from "./Workers.module.css";

interface WrokersListprops {
  heading: string;
  target: Array<any>;
}

const DUMMY_WORKERS = [
  {
    id: "w1",
    name: "Ivan",
    image:
      "https://nerdist.com/wp-content/uploads/2017/10/Rick-and-Morty-Rick.jpg",
    email: "ivan1@abv.bg",
    tasks: ["work", "sleep", "repeat"],
  },
  {
    id: "w2",
    name: "Ivan",
    image:
      "https://nerdist.com/wp-content/uploads/2017/10/Rick-and-Morty-Rick.jpg",
    email: "ivan1@abv.bg",
    tasks: ["work", "sleep", "repeat"],
  },
  {
    id: "w3",
    name: "Ivan",
    image:
      "https://nerdist.com/wp-content/uploads/2017/10/Rick-and-Morty-Rick.jpg",
    email: "ivan1@abv.bg",
    tasks: ["work", "sleep", "repeat"],
  },
];

const WorkerList = (props:WrokersListprops) => {
  const [filter, setFilter] = useState("");

  return (
    <Fragment>
      <Heading>{props.heading}</Heading>
      <SearchBarAuto setFilter={setFilter} />
      <div className={classes.workers_display}>
        <Row
          xs={1}
          sm={2}
          md={3}
          lg={4}
          xll={5}
          className={classes.workers_display + " g-4"}
        >
          {DUMMY_WORKERS.filter((value: any) => {
            return value.name.toLowerCase().includes(filter.toLowerCase());
          }).map((worker) => {
            return (
              <WorkerItem
                key={worker.id}
                id={worker.id}
                name={worker.name}
                image={worker.image}
                email={worker.email}
                tasks={worker.tasks}
              />
            );
          })}
        </Row>
      </div>
    </Fragment>
  );
};

export default WorkerList;

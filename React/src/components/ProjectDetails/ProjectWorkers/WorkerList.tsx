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
          {props.target.filter((value: any) => {
            return value.name.toLowerCase().includes(filter.toLowerCase());
          }).map((worker) => {
            return (
              <WorkerItem
                key={worker.id}
                id={worker.id}
                name={worker.name + ' ' + worker.surname}
                image={worker.image}
                email={worker.email}
              />
            );
          })}
        </Row>
      </div>
    </Fragment>
  );
};

export default WorkerList;

import React, { Fragment, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { SemiHeading } from "src/components/UI/Heading";
import classes from "./AddWorkersPanel.module.css";
import {SearchBarClick} from "src/components/UI/SearchBar";

const DUMMY_WORKERS = [
  {
    id: "1",
    name: "Gosho Mineta",
  },
  {
    id: "2",
    name: "Ivan",
  },
  {
    id: "3",
    name: "asda Mineta",
  },
  {
    id: "4",
    name: "Goskd nskho",
  },
  {
    id: "5",
    name: "Ivadsadsan Mineta",
  },
  {
    id: "6",
    name: "Nnsdiki Mineta",
  },
];

const AddWorkersPanel = () => {
  //majke only the initial value set so you can use it in other places as normal array
  const [searchResults, setSeachResults] = useState([]);
  console.log("searchResults ", searchResults);

  const removeWorkerHandler = (event) => {
    setSeachResults(
      searchResults.filter((id) => id !== event.target.id)
    );
  };

  return (
    <Fragment>
      <Form onSubmit={() => {}} className={classes.form_panel}>
        <Button size="sm" variant="outline-success">
          I will work alone
        </Button>
        <SearchBarClick
          setSeachResults={setSeachResults}
          searchedValues={DUMMY_WORKERS.map((worker) => {
            return worker.name;
          })}
        />
        <div className={classes.search_results}>
          {searchResults.map((worker) => {
            return (
              <OverlayTrigger
                key={Math.random()}
                placement="left"
                overlay={
                  <Tooltip id={`tooltip-left`}>Click to Remove</Tooltip>
                }
              >
                <p
                  id={`${worker}`}
                  className={classes.workers}
                  onClick={removeWorkerHandler}
                >
                  {worker}
                </p>
              </OverlayTrigger>
            );
          })}
        </div>
        <Button size="sm" className={classes.form_btn} type="submit">
          Add Workers
        </Button>
      </Form>
    </Fragment>
  );
};

export default AddWorkersPanel;

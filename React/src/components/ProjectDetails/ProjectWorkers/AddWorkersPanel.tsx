import React, { Fragment, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { SemiHeading } from "src/components/UI/Heading";
import classes from "./AddWorkersPanel.module.css";
import { SearchBarClick } from "src/components/UI/SearchBar";
import { useHttpClient } from "src/hooks/http-hook";
import { useSelector } from "react-redux";
import { selectUser } from "src/redux/user";
import Loader from "src/components/UI/Loader";

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

const AddWorkersPanel = (props: { projectId?: string }) => {
  const { loading, sendRequest } = useHttpClient();

  const [searchResults, setSeachResults] = useState([]);
  const [isSubmitted, setisSubmitted] = useState(false);

  const user = useSelector(selectUser);

  const removeWorkerHandler = (event) => {
    setSeachResults(searchResults.filter((id) => id !== event.target.id));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/project/add-workers",
        "POST",
        JSON.stringify({
          projectId: props.projectId,
          workers: searchResults,
        }),
        { Authorization: "Bearer " + user.token }
      );
      setisSubmitted(true);
    } catch (err) {}
  };

  const shortcutHandler = () => {
    setSeachResults([user.id]);
    setisSubmitted(true);
  };

  return (
    <Fragment>
      <Form onSubmit={submitHandler} className={classes.form_panel}>
        {isSubmitted ? (
          <i className={classes.icon + " fa-solid fa-check"}></i>
        ) : (
          <Fragment>
            <Button
              size="sm"
              variant="outline-success"
              onClick={shortcutHandler}
            >
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
            {loading ? (
              <Loader />
            ) : (
              <Button size="sm" className={classes.form_btn} type="submit">
                Add Workers
              </Button>
            )}
          </Fragment>
        )}
      </Form>
    </Fragment>
  );
};

export default AddWorkersPanel;

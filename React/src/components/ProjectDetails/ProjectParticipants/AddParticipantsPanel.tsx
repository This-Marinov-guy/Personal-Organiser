import React, { Fragment, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { SearchBarUsers } from "src/components/UI/SearchBar";
import { useHttpClient } from "src/hooks/http-hook";
import { useSelector } from "react-redux";
import { selectUser } from "src/redux/user";
import Loader from "src/components/UI/Loader";
import { removeDuplicates } from "src/usefulFunctions/removeDuplicates";
import classes from "./AddParticipantsPanel.module.css";

const AddParticipantsPanel = (props: {
  projectId?: string;
  workAloneOption?: boolean;
}) => {
  const { loading, sendRequest } = useHttpClient();
  const [searchResults, setSeachResults] = useState([]);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const clickHandler = () => {
    setIsButtonClicked(true);
  };

  const user = useSelector(selectUser);

  const removeParticipantHandler = (event) => {
    setSeachResults(
      searchResults.filter((user) => user.id !== event.target.id)
    );
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/projects/add-participants",
        "POST",
        JSON.stringify({
          projectId: props.projectId,
          participants: searchResults.filter((value, index) => {
            const _value = JSON.stringify(value);
            return (
              index ===
              searchResults.findIndex((obj) => {
                return JSON.stringify(obj) === _value;
              })
            );
          }),
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setisSubmitted(true);
    } catch (err) {}
  };

  const shortcutHandler = () => {
    setSeachResults([{ id: user.userId }]);
    setisSubmitted(true);
  };

  return (
    <Fragment>
      <Form onSubmit={submitHandler} className={classes.form_panel}>
        {isSubmitted ? (
          <i className={classes.icon + " fa-solid fa-check"}></i>
        ) : (
          <Fragment>
            {props.workAloneOption && (
              <Button
                size="sm"
                variant="outline-success"
                onClick={shortcutHandler}
              >
                I will work alone
              </Button>
            )}
            <SearchBarUsers setSeachResults={setSeachResults} />
            <div className={classes.search_results}>
              {searchResults
                .filter((value, index) => {
                  const _value = JSON.stringify(value);
                  return (
                    index ===
                    searchResults.findIndex((obj) => {
                      return JSON.stringify(obj) === _value;
                    })
                  );
                })
                .map((participant) => {
                  console.log("searchResults", searchResults);
                  return (
                    <OverlayTrigger
                      key={Math.random()}
                      placement="left"
                      overlay={
                        <Tooltip id={`tooltip-left`}>Click to Remove</Tooltip>
                      }
                    >
                      <p
                        id={participant.id}
                        className={classes.participants}
                        onClick={removeParticipantHandler}
                      >
                        {participant.name}
                      </p>
                    </OverlayTrigger>
                  );
                })}
            </div>
            <div className={classes.form_btn}>
              {loading && isButtonClicked ? (
                <Loader />
              ) : (
                <Button size="sm" onClick={clickHandler} type="submit">
                  Add Participant
                </Button>
              )}
            </div>
          </Fragment>
        )}
      </Form>
    </Fragment>
  );
};

export default AddParticipantsPanel;

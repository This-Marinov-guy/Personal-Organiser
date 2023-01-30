import React, { Fragment, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import classes from "./AddParticipantsPanel.module.css";
import { SearchBarClick } from "src/components/UI/SearchBar";
import { useHttpClient } from "src/hooks/http-hook";
import { useSelector } from "react-redux";
import { selectUser } from "src/redux/user";
import Loader from "src/components/UI/Loader";

const AddParticipantsPanel = (props: { projectId?: string }) => {
  const { loading, sendRequest } = useHttpClient();

  const [allUsers, setAllUsers] = useState([]);
  const [searchResults, setSeachResults] = useState([]);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const clickHandler = () => {
    setIsButtonClicked(true);
  };

  const user = useSelector(selectUser);

  const removeParticipantHandler = (event) => {
    setSeachResults(searchResults.filter((id) => id !== event.target.id));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/project/add-participants",
        "POST",
        JSON.stringify({
          projectId: props.projectId,
          participants: searchResults,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setisSubmitted(true);
    } catch (err) {}
  };

  const shortcutHandler = () => {
    setSeachResults([user.id]);
    setisSubmitted(true);
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/user/users"
        );
        console.log(responseData);
        setAllUsers(responseData.users);
      } catch (err) {}
    };
    fetchAllUsers();
  }, [sendRequest]);

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
              searchedValues={allUsers.map((participant) => {
                console.log(participant);
                
                return participant.name;
              })}
            />
            <div className={classes.search_results}>
              {searchResults.map((participant) => {
                return (
                  <OverlayTrigger
                    key={Math.random()}
                    placement="left"
                    overlay={
                      <Tooltip id={`tooltip-left`}>Click to Remove</Tooltip>
                    }
                  >
                    <p
                      id={`${participant}`}
                      className={classes.participants}
                      onClick={removeParticipantHandler}
                    >
                      {participant}
                    </p>
                  </OverlayTrigger>
                );
              })}
            </div>
            {loading && isButtonClicked ? (
              <Loader />
            ) : (
              <Button
                size="sm"
                className={classes.form_btn}
                onClick={clickHandler}
                type="submit"
              >
                Add Participant
              </Button>
            )}
          </Fragment>
        )}
      </Form>
    </Fragment>
  );
};

export default AddParticipantsPanel;

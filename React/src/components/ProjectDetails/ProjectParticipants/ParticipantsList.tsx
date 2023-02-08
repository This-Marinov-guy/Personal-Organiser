import React, { Fragment, useState } from "react";
import ParticipantItem from "./ParticipantItem";
import { Heading } from "src/components/UI/Heading";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Modal from "src/components/UI/Modal";
import Warning from "src/components/UI/Warning";
import { SearchBarAuto } from "../../UI/SearchBar";
import classes from "./Participants.module.css";
import {
  removeWarning,
  selectModal,
  selectWarning,
  showModal,
  showWarning,
} from "src/redux/modal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AddParticipantsPanel from "./AddParticipantsPanel";
import { useParams } from "react-router-dom";
import { useHttpClient } from "src/hooks/http-hook";

interface ParticipantsListprops {
  heading: string;
  target: Array<any>;
  projectCreator: any;
}

const ParticipantsList = (props: ParticipantsListprops) => {
  const { sendRequest } = useHttpClient();

  const [filter, setFilter] = useState("");
  const [participantId, setParticipantId] = useState();

  const projectId = useParams<any>().projectId;

  const modal = useSelector(selectModal);
  const warning = useSelector(selectWarning);

  const dispatch = useDispatch();

  const addHandler = () => {
    dispatch(showModal());
  };

  const removeParticipantHandler = async () => {
    try {
      console.log(participantId)
      const responseData = await sendRequest(
        `http://localhost:5000/api/projects/abort-project/${projectId}`,
        "PATCH",
        JSON.stringify({
          userId: participantId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      window.location.reload()
    } catch (err) {}
  };

  return (
    <Fragment>
      {warning && (
        <Modal>
          <Warning
            warning="This will remove the user from the project, as well as from the group chat. Are you sure you want to continue?"
            onClick={removeParticipantHandler}
          />
        </Modal>
      )}
      {modal && (
        <Modal>
          <AddParticipantsPanel projectId={projectId} />
        </Modal>
      )}
      <Heading>{props.heading}</Heading>
      <SearchBarAuto setFilter={setFilter} />
      <div className={classes.participants_display}>
        {props.target ? (
          <Row
            xs={1}
            sm={2}
            md={3}
            lg={4}
            xll={5}
            className={classes.participants_display + " g-4"}
          >
            {props.target
              .filter((value: any) => {
                return value.name.toLowerCase().includes(filter.toLowerCase());
              })
              .map((participant) => {
                return (
                  <ParticipantItem
                    key={participant.id}
                    id={participant.id}
                    name={participant.name + " " + participant.surname}
                    image={participant.image}
                    email={participant.email}
                    onRemoveParticipant={(event) => {
                      setParticipantId(event.target.id);
                      dispatch(showWarning());
                    }}
                    projectCreator={props.projectCreator}
                  />
                );
              })}
            <Card className={classes.icon}>
              <i className={"fa-solid fa-plus"} onClick={addHandler}></i>
            </Card>
          </Row>
        ) : (
          <p style={{ textAlign: "center" }}>No users found</p>
        )}
      </div>
    </Fragment>
  );
};

export default ParticipantsList;

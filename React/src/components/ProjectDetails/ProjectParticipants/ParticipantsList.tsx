import React, { Fragment, useState } from "react";
import ParticipantItem from "./ParticipantItem";
import { Heading } from "src/components/UI/Heading";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Modal from "src/components/UI/Modal";
import { SearchBarAuto } from "../../UI/SearchBar";
import classes from "./Participants.module.css";
import { selectModal, showModal } from "src/redux/modal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AddParticipantsPanel from "./AddParticipantsPanel";
import { useParams } from "react-router-dom";

interface ParticipantsListprops {
  heading: string;
  target: Array<any>;
}

const ParticipantsList = (props: ParticipantsListprops) => {
  const [filter, setFilter] = useState("");

  const projectId = useParams<any>().projectId;

  const modal = useSelector(selectModal);

  const dispatch = useDispatch();

  const addHandler = () => {
    dispatch(showModal());
  };
  
  return (
    <Fragment>
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

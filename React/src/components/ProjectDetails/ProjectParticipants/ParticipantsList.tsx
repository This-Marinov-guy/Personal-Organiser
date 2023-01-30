import React, { Fragment, useState } from "react";
import ParticipantItem from "./ParticipantItem";
import { Heading } from "src/components/UI/Heading";
import Row from "react-bootstrap/Row";
import { SearchBarAuto } from "../../UI/SearchBar";
import classes from "./Participants.module.css";

interface ParticipantsListprops {
  heading: string;
  target: Array<any>;
}


const ParticipantsList = (props: ParticipantsListprops) => {
  const [filter, setFilter] = useState("");
  
  console.log(props.target);
  return (
    <Fragment>
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
          </Row>
        ) : (
          <p style={{ textAlign: "center" }}>No users found</p>
        )}
      </div>
    </Fragment>
  );
};

export default ParticipantsList;

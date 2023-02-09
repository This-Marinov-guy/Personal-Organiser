import React from "react";
import classes from "./InfoPanel.module.css";

const InfoPanel = () => {
  return (
    <div className={classes.info_panel}>
      <h4>This is your Personal Organiser. Here you can:</h4>
      <div className={classes.info_divider}>
        <div className={classes.info_points}>
        <h6>As a project owner</h6>
          <li>See all your projects and the participants involved</li>
          <li>Gain real time information about your colleagues</li>
          <li>See agendas and schedules not only yours, but also others</li>
          <li>
            Modify working schedules real time that everyone you want to access
          </li>
          <li>Chat with your collegues</li>
          <li>Appoint meetings and teambuilings</li>
        </div>
        <div className={classes.info_points}>
        <h6>As a project participant</h6>
          <li>See all your projects, tasks and collegues involved in them</li>
          <li>Gain real time information about your collegues and employers</li>
          <li>See agendas and schedules not only yours, but also partial information for other's</li>
          <li>
            Modify working schedules real time that everyone you want to access
          </li>
          <li>Chat with your collegues</li>
          <li>Join meetings and teambuilings</li>
        </div>
      </div>
      <h4>'Your Virtual Human Resource'</h4>
    </div>
  );
};

export default InfoPanel;

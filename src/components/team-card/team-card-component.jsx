import React from "react";
import "./team-card-component.scss";
import Popup from "../popup/popup-component";
import TeamCardHead from "./team-card-head";
import TeamCardGrid from "./team-card-grid";

const TeamCard = () => {
  return (
    <Popup>
      <div className="teamcard">
        <h2 className="teamcard__heading"><span className="teamcard__heading--main">Seamless Transitions</span> Care Team</h2>
        <TeamCardHead />
        <TeamCardGrid />
      </div>
    </Popup>
  );
};
export default TeamCard;

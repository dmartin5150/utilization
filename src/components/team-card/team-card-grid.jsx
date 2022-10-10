import "./team-card-grid.scss";
import TeamCardGridRow from "./team-card-grid-row";

const TeamCardGrid = ({ teamData }) => {
  return (
    <div className="team-card-grid">
      <header className="team-card-grid__header">
        <div className="team-card-grid__header--item">Provider Name</div>
        <div className="team-card-grid__header--item">Specialty</div>
        <div className="team-card-grid__header--item">Contact Info</div>
        <div className="team-card-grid__header--item">Last Appt.</div>
        <div className="team-card-grid__header--item">Next Appt.</div>
      </header>
      {teamData.map(team => {
        return <TeamCardGridRow key={team.id} teamData={team} />
      })}
      </div>
  );
};

export default TeamCardGrid;

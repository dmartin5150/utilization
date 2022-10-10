const TeamCardGridRow = ({ teamData }) => {
  return (
    <div className="team-card-grid__row">
      <div className="team-card-grid__row--item">{teamData.fname} {teamData.lname}</div>
      <div className="team-card-grid__row--item">{teamData.specialty}</div>
      <div className="team-card-grid__row--contact">
        <div className="team-card-grid__row--contact--address">
          {teamData.address}
        </div>
        <div className="team-card-grid__row--contact--city">
          {teamData.city}, {teamData.state} {teamData.zip}
        </div>
        <div className="team-card-grid__row--contact--phone">
          {teamData.phone}
        </div>
      </div>
      <div className="team-card-grid__row--item">{teamData.last}</div>
      <div className="team-card-grid__row--item">{teamData.next}</div>
    </div>
  );
};

export default TeamCardGridRow;

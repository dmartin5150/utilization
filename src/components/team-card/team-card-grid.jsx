import './team-card-grid.scss';

const TeamCardGrid = (props) => {
  return (
    <div className="team-card-grid">
      <header className="team-card-grid__header">
        <div className="team-card-grid__header--item">Provider Name</div>
        <div className="team-card-grid__header--item">Specialty</div>
        <div className="team-card-grid__header--item">Contact Info</div>
        <div className="team-card-grid__header--item">Last Appt.</div>
        <div className="team-card-grid__header--item">Next Appt.</div>
      </header>
      <div className="team-card-grid__row">
        <div className="team-card-grid__row--item">David Martin</div>
        <div className="team-card-grid__row--item">Internal Medicine</div>
        <div className="team-card-grid__row--contact">
          <div className="team-card-grid__row--contact--address">
            3333 Spider Lily Way
          </div>
          <div className="team-card-grid__row--contact--city">
            Pensacola, FL 32526
          </div>
          <div className="team-card-grid__row--contact--phone">850-555-5555</div>
        </div>
        <div className="team-card-grid__row--item">01-02-2022</div>
        <div className="team-card-grid__row--item">10-02-2022</div>
      </div>
      <div className="team-card-grid__row">
        <div className="team-card-grid__row--item">David Martin</div>
        <div className="team-card-grid__row--item">Internal Medicine</div>
        <div className="team-card-grid__row--contact">
          <div className="team-card-grid__row--contact--address">
            3333 Spider Lily Way
          </div>
          <div className="team-card-grid__row--contact--city">
            Pensacola, FL 32526
          </div>
          <div className="team-card-grid__row--contact--phone">850-555-5555</div>
        </div>
        <div className="team-card-grid__row--item">01-02-2022</div>
        <div className="team-card-grid__row--item">10-02-2022</div>
      </div>
      <div className="team-card-grid__row">
        <div className="team-card-grid__row--item">David Martin</div>
        <div className="team-card-grid__row--item">Internal Medicine</div>
        <div className="team-card-grid__row--contact">
          <div className="team-card-grid__row--contact--address">
            3333 Spider Lily Way
          </div>
          <div className="team-card-grid__row--contact--city">
            Pensacola, FL 32526
          </div>
          <div className="team-card-grid__row--contact--phone">850-555-5555</div>
        </div>
        <div className="team-card-grid__row--item">01-02-2022</div>
        <div className="team-card-grid__row--item">10-02-2022</div>
      </div>
      <div className="team-card-grid__row">
        <div className="team-card-grid__row--item">David Martin</div>
        <div className="team-card-grid__row--item">Internal Medicine</div>
        <div className="team-card-grid__row--contact">
          <div className="team-card-grid__row--contact--address">
            3333 Spider Lily Way
          </div>
          <div className="team-card-grid__row--contact--city">
            Pensacola, FL 32526
          </div>
          <div className="team-card-grid__row--contact--phone">850-555-5555</div>
        </div>
        <div className="team-card-grid__row--item">01-02-2022</div>
        <div className="team-card-grid__row--item">10-02-2022</div>
      </div>
      <div className="team-card-grid__row">
        <div className="team-card-grid__row--item">David Martin</div>
        <div className="team-card-grid__row--item">Internal Medicine</div>
        <div className="team-card-grid__row--contact">
          <div className="team-card-grid__row--contact--address">
            3333 Spider Lily Way
          </div>
          <div className="team-card-grid__row--contact--city">
            Pensacola, FL 32526
          </div>
          <div className="team-card-grid__row--contact--phone">850-555-5555</div>
        </div>
        <div className="team-card-grid__row--item">01-02-2022</div>
        <div className="team-card-grid__row--item">10-02-2022</div>
      </div>
    </div>
  );
};

export default TeamCardGrid;

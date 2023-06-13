import "./team-card-head.scss";

const TeamCardHead = ({teamData}) => {

    if(!teamData) {
      return null;
    }
    
    return (
        <div className="teamcardhead">
          <div className="teamcardhead__row">
            <h2 className="teamcardhead__item">
              <span className="teamcardhead__item--name">FIN:</span>
              {teamData.fin}
            </h2>
            <h2 className="teamcardhead__item">
              <span className="teamcardhead__item--name">Discharge Date:</span>
              {teamData.date}
            </h2>
          </div>
          <div className="teamcardhead__row">
            <h2 className="teamcardhead__item">
              <span className="teamcardhead__item--name">Admission Type:</span>
              {teamData.type}
            </h2>
            <h2 className="teamcardhead__item">
              <span className="teamcardhead__item--name">
                Discharge Disposition:
              </span>
              {teamData.disp}
            </h2>
          </div>
        </div>
    )




}
export default TeamCardHead;
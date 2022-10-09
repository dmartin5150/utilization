import "./team-card-head.scss";

const TeamCardHead = (props) => {
    return (
        <div className="teamcardhead">
          <div className="teamcardhead__row">
            <h2 className="teamcardhead__item">
              <span className="teamcardhead__item--name">FIN:</span>
              5555555
            </h2>
            <h2 className="teamcardhead__item">
              <span className="teamcardhead__item--name">Discharge Date:</span>
              8/1/2020
            </h2>
          </div>
          <div className="teamcardhead__row">
            <h2 className="teamcardhead__item">
              <span className="teamcardhead__item--name">Admission Type:</span>
              Inpatient
            </h2>
            <h2 className="teamcardhead__item">
              <span className="teamcardhead__item--name">
                Discharge Disposition:
              </span>
              Hospice
            </h2>
          </div>
        </div>
    )




}
export default TeamCardHead;
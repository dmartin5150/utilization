import "../../sass/base/_typography.scss";
import "./fin-careteam-row.scss";

let pageSize = 12;

const FinCareTeamRow = ({fin, size,onSelectTeam }) => {


  const openPopUpHandler = (e)=> {
    console.log(e.target.id);
    onSelectTeam(true);
  }


  return (
    <div className="fincareteamrow">
      <p className="header-tertiary no-left-border">{fin}</p>
      <p className="header-tertiary">{size}</p>
      <button onClick={openPopUpHandler} className="fin-btn" id={fin}>Show Team</button>
    </div>
  );
};

export default FinCareTeamRow;

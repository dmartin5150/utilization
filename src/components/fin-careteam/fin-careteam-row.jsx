import "../../sass/base/_typography.scss";
import "./fin-careteam-row.scss";

let pageSize = 12;

const FinCareTeamRow = ({fin, size }) => {
  return (
    <div className="fincareteamrow">
      <p className="header-tertiary no-left-border">{fin}</p>
      <p className="header-tertiary">{size}</p>
      <button className=" fin-btn">Show Team</button>
    </div>
  );
};

export default FinCareTeamRow;

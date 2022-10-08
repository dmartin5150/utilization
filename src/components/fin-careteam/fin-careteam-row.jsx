import "../../sass/base/_typography.scss";
import "./fin-careteam-row.scss";
import { format } from "date-fns";

const FinCareTeamRow = ({ reqDate, fin, size }) => {
  const date = reqDate.split(" ")[0];
  return (
    <div className="fincareteamrow">
      <p className="header-tertiary no-left-border">{fin}</p>
      <p className="header-tertiary">{size}</p>
      <button className=" fin-btn">Show Team</button>
    </div>
  );
};

export default FinCareTeamRow;

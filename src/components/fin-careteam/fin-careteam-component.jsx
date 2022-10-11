import "./fin-careteam-component.scss";
import FinCareTeamRow from "./fin-careteam-row";

const FinCareTeam = (props) => {
  const {headings} = props;
  return (
    <div className="fin-careteam">
      <header className="fin-careteam__header">
        <h2 className="header-secondary">{headings[0]}</h2>
        <h2 className="header-secondary">{headings[1]}</h2>
        <h2 className="header-secondary">{headings[2]}</h2>
      </header>
      {props.data.map((item) => {
        return(<FinCareTeamRow key={item.fin}  fin={item.fin}size={item.size} onSelectTeam={props.onSelectTeam} />)
      })}
    </div>
  );
};

export default FinCareTeam;

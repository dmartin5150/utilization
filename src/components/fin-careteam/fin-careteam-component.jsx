import "./fin-careteam-component.scss";
import FinCareTeamRow from "./fin-careteam-row";

const FinCareTeam = (props) => {
    console.log('data =', props.data)
  return (
    <div className="fin-careteam">
      <header className="fin-careteam__header">
        <h2 className="header-secondary">FIN</h2>
        <h2 className="header-secondary">Care team size</h2>
        <h2 className="header-secondary">Show team</h2>
      </header>
      {props.data.map((item) => {
        return(<FinCareTeamRow key={item.fin} reqDate={item.date} fin={item.fin}size={item.size} />)
      })}
    </div>
  );
};

export default FinCareTeam;

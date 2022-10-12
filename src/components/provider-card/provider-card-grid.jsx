import ProviderCardRow from "./provider-card-row";
import "./provider-card-grid.scss";

const ProviderCardGrid = ({ providerData }) => {
    console.log('in provider grid')
    console.log('griddata', providerData)

    if (!providerData){
        return;
    }

  return (
    <div className="providercard-grid">
      <header className="header">
        <div className="header--item">Name</div>
        <div className="header--item">Discharge Date</div>
        <div className="header--item">Disposition</div>
        <div className="header--item">Last Appt.</div>
        <div className="header--item">Next Appt.</div>
      </header>
      {providerData.map((team, idx) => {
        return <ProviderCardRow key={idx} providerData={team} />
      })}
      </div>
  );
};

export default ProviderCardGrid;
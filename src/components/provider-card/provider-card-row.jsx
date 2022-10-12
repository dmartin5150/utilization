import './provider-card-row.scss';

const ProviderCardRow = ({ providerData }) => {
    let nextAppt = providerData.next.split(' ')[0];
    if (nextAppt === '2030-01-01'){
      nextAppt = 'No follow up';
    }
    let prevAppt = providerData.prev.split(' ')[0];
    if (prevAppt === '2000-01-01'){
      prevAppt = 'No previous appt.';
    }


    return (
      <div className="providercard-row">
        <div className="providercard-row--item">{providerData.fin}</div>
        <div className="providercard-row--item">{providerData.discharge}</div>
        <div className="providercard-row--item">{providerData.disp}</div>
        <div className="providercard-row--item">{prevAppt}</div>
        <div className="providercard-row--item">{nextAppt}</div>
      </div>
    );
  };
  
  export default ProviderCardRow;
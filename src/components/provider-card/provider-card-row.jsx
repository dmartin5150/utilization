import './provider-card-row.scss';

const ProviderCardRow = ({ providerData }) => {
    // let nextAppt = providerData.next.split(' ')[0];
    // if (nextAppt === '2030-01-01'){
    //   nextAppt = 'No follow up';
    // }


    return (
      <div className="providercard-row">
        <div className="providercard-row--item">{providerData.fname} {providerData.lname}</div>
        <div className="providercard-row--item">{providerData.discharge}</div>
        <div className="providercard-row--item">{providerData.disp}</div>
        <div className="providercard-row--item">{providerData.prev}</div>
        <div className="providercard-row--item">{providerData.next}</div>
      </div>
    );
  };
  
  export default ProviderCardRow;
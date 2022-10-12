import "../../sass/base/_typography.scss";
import "./summary-grid-row.scss";



const SummaryGridRow = ({unit, stat,itemid, buttonText, onSelectItem }) => {


    
  const updateItemHandler = (e)=> {
    onSelectItem(e.target.id);
    console.log('npi', e.target.id)
  }
  
  return (
    <div className="summary-grid-row">
      <p className="header-tertiary no-left-border">{unit}</p>
      <p className="header-tertiary">{stat}</p>
      <button onClick={updateItemHandler} className="item-btn" id={itemid}>{buttonText}</button>
    </div>
  );
};

export default SummaryGridRow;
import "../../sass/base/_typography.scss";
import "./summary-grid-row.scss";



const SummaryGridRow = ({unit, stat,onSelectItem }) => {


    
  const updateItemHandler = (e)=> {
    // e.preventDefault();
    onSelectItem(e.target.id);
  }
  
  return (
    <div className="summary-grid-row">
      <p className="header-tertiary no-left-border">{unit}</p>
      <p className="header-tertiary">{stat}</p>
      <button onClick={updateItemHandler} className="item-btn" id={unit}>Show Team</button>
    </div>
  );
};

export default SummaryGridRow;
import "../../sass/base/_typography.scss";
import "./summary-grid-row.scss";
import React, {Fragment} from "react";




interface SummaryGridRowProps {
  id: string;
  name:string;
  property:string;
  buttonText:string;
  onSelectItem: (id:string)=>void
}



const SummaryGridRow: React.FC<SummaryGridRowProps> = ({id, name,property, buttonText, onSelectItem }) => {

    
  const updateItemHandler = (event:React.MouseEvent<HTMLButtonElement>)=> {
    onSelectItem((event.target as HTMLButtonElement).name);
  }
  
  return (
    <Fragment>
    <div className="summary-grid-row">
      <p className="header-tertiary no-left-border">{name}</p>
      <p className="header-tertiary">{property}</p>
      <button onClick={updateItemHandler} className="item-btn" id={id} name={name}>{buttonText}</button>
    </div>
    </Fragment>
  );
};

export default SummaryGridRow;
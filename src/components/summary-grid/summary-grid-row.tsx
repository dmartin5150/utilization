import "../../sass/base/_typography.scss";
import "./summary-grid-row.scss";
import React, {Fragment} from "react";
import { SummaryGridData } from "./summary-grid";




interface SummaryGridRowProps {
  id: string;
  name:string;
  property:string;
  buttonText:string;
  onSelectItem: (data:SummaryGridData)=>void
}



const SummaryGridRow: React.FC<SummaryGridRowProps> = ({id, name,property, buttonText, onSelectItem }) => {

    
  const updateItemHandler = (event:React.MouseEvent<HTMLButtonElement>)=> {
   id = (event.target as HTMLButtonElement).id
    onSelectItem({"id":id,"name":name,"property":property});
  }
  
  return (
    <Fragment>
    <div className="summary-grid-row">
      <p className="header-tertiary no-left-border">{name}</p>
      <div className="header-all-properties">
        <div className="header-properties">
          <p><span>Utilization:</span> {property}</p>
          <p><span>Procedures:</span> 3</p>
        </div>
        <div className="header-properties">
          <p>PT: 3H 20M</p>
          <p>nPT: 3H 20M</p>
        </div>
      </div>
      <button onClick={updateItemHandler} className="item-btn" id={id} name={name}>{buttonText}</button>
    </div>
    </Fragment>
  );
};

export default SummaryGridRow;
import "../../sass/base/_typography.scss";
import "./summary-grid-row.scss";
import React, {Fragment} from "react";
import { SummaryGridData } from "./summary-grid";


export type SummaryGridRowData = {
  id: string;
  room:string;
  utilization:string;
  procedures:string;
  ptHours:string;
  nptHours:string;
}



interface SummaryGridRowProps {
  row:SummaryGridRowData;
  buttonText:string;
  onSelectItem: (data:SummaryGridRowData)=>void
}



const SummaryGridRow: React.FC<SummaryGridRowProps> = ({row, buttonText, onSelectItem }) => {

    
  const updateItemHandler = (event:React.MouseEvent<HTMLButtonElement>)=> {
   row.id = (event.target as HTMLButtonElement).id
    onSelectItem(row);
  }
  
  return (
    <Fragment>
    <div className="summary-grid-row">
      <p className="header-tertiary no-left-border">{row.room}</p>
      <div className="header-all-properties">
        <div className="header-properties">
          <p><span>Utilization: </span> {row.utilization}</p>
          <p><span>Procedures: </span>{row.procedures}</p>
        </div>
        <div className="header-properties">
          <p>{row.ptHours}</p>
          <p>{row.nptHours}</p>
        </div>
      </div>
      <button onClick={updateItemHandler} className="item-btn" id={row.id} name={row.room}>{buttonText}</button>
    </div>
    </Fragment>
  );
};

export default SummaryGridRow;
import "../../sass/base/_typography.scss";
import "./summary-grid-row.scss";
import React, {Fragment} from "react";
import { SummaryGridData } from "./summary-grid";
import classnames from 'classnames';


export type SummaryGridRowData = {
  id: string;
  room:string;
  utilization:string;
  procedureTitle:string;
  procedures:string;
  ptHours:string;
  nptHours:string;
  block_status:string;
}



interface SummaryGridRowProps {
  row:SummaryGridRowData;
  buttonText:string;
  onSelectItem: (data:SummaryGridRowData)=>void
}



const SummaryGridRow: React.FC<SummaryGridRowProps> = ({row, buttonText, onSelectItem }) => {

    
  const updateItemHandler = (event:React.MouseEvent<HTMLButtonElement>)=> {
   row.id = (event.target as HTMLButtonElement).id
    console.log('row',row)
    onSelectItem(row);
  }




  return (
    <Fragment>
    <div className="summary-grid-row">
      <p className={classnames("header-tertiary no-left-border",
      {highLightBlue:parseInt(row.block_status)})}>{row.room}</p>
      <div className="header-all-properties">
        <div className="header-properties">
          <p><span>Utilization: </span> {row.utilization}</p>
          <p><span>{row.procedureTitle}: </span>{row.procedures}</p>
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
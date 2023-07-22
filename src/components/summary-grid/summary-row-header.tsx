import React from "react";
import "./summary-grid-header.scss";



export interface SummaryRowHeaderProps {
    firstColumnName: string,
    secondColumnName: string,
    onSelectSurgeon: ()=>void

}





const SummaryRowHeader: React.FC<SummaryRowHeaderProps> = ({firstColumnName,secondColumnName,onSelectSurgeon}) => {


    

    return (
        <header className="head">
        <h2 className="header-secondary">{firstColumnName}</h2>
        <h2 className="header-secondary">{secondColumnName}</h2>
        <button className='header-show-surgeon' onClick={onSelectSurgeon}>Selected Surgeons</button>
      </header>
    );

};
export default SummaryRowHeader;
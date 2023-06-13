import React from "react";
import "./summary-grid-header.scss";



export interface SummaryRowHeaderProps {
    firstColumnName: string,
    secondColumnName: string

}





const SummaryRowHeader: React.FC<SummaryRowHeaderProps> = ({firstColumnName,secondColumnName}) => {
    return (
        <header className="head">
        <h2 className="header-secondary">{firstColumnName}</h2>
        <h2 className="header-secondary">{secondColumnName}</h2>
      </header>
    );

};
export default SummaryRowHeader;
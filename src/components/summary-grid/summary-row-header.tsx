import React from "react";


export interface SummaryRowHeaderCols {
    firstColumnName:string;
    secondColumnName:string
  }

interface SummaryRowHeaderProps {
    headers:SummaryRowHeaderCols
}





const SummaryRowHeader: React.FC<SummaryRowHeaderProps> = ({headers}) => {
    return (
        <header className="head">
        <h2 className="header-secondary">{headers.firstColumnName}</h2>
        <h2 className="header-secondary">{headers.secondColumnName}</h2>
      </header>
    );

};
export default SummaryRowHeader;
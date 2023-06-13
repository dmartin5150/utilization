import React from "react";


interface SummaryGridHeaderProps {
    title:string;
}

const SummaryGridHeader: React.FC<SummaryGridHeaderProps> = ({title,}) => {

    return (
        <header className="header">
        <h2 className="header--item">
          {title}
        </h2>
      </header>
    );

}; export default SummaryGridHeader;
import React from "react";
import "./details-card-grid.scss";
import DetailsCardGridRow from "./details-card-grid-row";
import { DetailsData } from "./details-card";



export interface GridNames {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
}

interface DetailsCardGridProps {
  headers: GridNames;
  data: DetailsData[];
  highLightItems: string[];
}


const DetailsCardGrid: React.FC<DetailsCardGridProps> = ({ headers,data,highLightItems }) => {
  return (
    <div className="team-card-grid">
      <header className="team-card-grid__header">
        <div className="team-card-grid__header--item">{headers.col1}</div>
        <div className="team-card-grid__header--item">{headers.col2}</div>
        <div className="team-card-grid__header--item">{headers.col3}</div>
        <div className="team-card-grid__header--item">{headers.col4}</div>
        <div className="team-card-grid__header--item">{headers.col5}</div>
        {/* <div className="team-card-grid__header--item">Next Appt.</div> */}
      </header>
      {data.map((item, idx) => {
        const highLight = highLightItems.includes(item.col1.toString())
        return (<DetailsCardGridRow key={idx} data={item} highLight={highLight} />)
      })}
      </div>
  );
};

export default DetailsCardGrid;

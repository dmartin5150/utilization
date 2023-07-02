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
  highLightItemsRed: string[];
  highLightItemsGreen: string[];
}


const DetailsCardGrid: React.FC<DetailsCardGridProps> = ({ headers,data,highLightItemsGreen, highLightItemsRed }) => {
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
        const highLightRed = highLightItemsRed.includes(item.col1.toString())
        const curID = item.id.toString();
        const highLightGreen = highLightItemsGreen.includes(curID)
        console.log('item id ', curID)
        console.log('npis ', highLightItemsGreen)
        console.log('result ', highLightItemsGreen.includes(item.id.toString()))
        return (<DetailsCardGridRow key={idx} data={item} highLightGreen={highLightGreen} highLightRed={highLightRed}  />)
      })}
      </div>
  );
};

export default DetailsCardGrid;

import React from "react";

import { DetailsData } from "./details-card";

interface DetailsDataProps {
  data: DetailsData
}

const DetailsCardGridRow: React.FC<DetailsDataProps> = ({data}) => {
 
  return (
    <div className="team-card-grid__row">
      <div className="team-card-grid__row--item">{data.col1}</div>
      <div className="team-card-grid__row--item">{data.col2}</div>
      <div className="team-card-grid__row--item">{data.col3}</div>
      <div className="team-card-grid__row--item">{data.col4}</div>
    </div>
  );
};

export default DetailsCardGridRow;

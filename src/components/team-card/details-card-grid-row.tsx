import React from "react";
import classnames from 'classnames';

import { DetailsData } from "./details-card";

interface DetailsDataProps {
  data: DetailsData;
  highLightRed: boolean;
  highLightGreen: boolean;
}

const DetailsCardGridRow: React.FC<DetailsDataProps> = ({data, highLightGreen, highLightRed}) => {
  return (
    <div className={classnames("team-card-grid__row", 
      {highLightRed:highLightRed }, {highLightGreen:highLightGreen})}>
      <div className="team-card-grid__row--item">{data.col1}</div>
      <div className="team-card-grid__row--item">{data.col2}</div>
      <div className="team-card-grid__row--item">{data.col3}</div>
      <div className="team-card-grid__row--item">{data.col4}</div>
      <div className="team-card-grid__row--item">{data.col5}</div>  
    </div>
  );
};

export default DetailsCardGridRow;

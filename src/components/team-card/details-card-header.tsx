import React from "react";
import "./details-card-head.scss";

export interface DetailsHeader {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
}

interface DetailsCardHeadProps {
  header: DetailsHeader;
}

const DetailsCardHead: React.FC<DetailsCardHeadProps> = ({header}) => {

    if(!header) {
      return null;
    }
    
    return (
        <div className="teamcardhead">
          <div className="teamcardhead__row">
            <h2 className="teamcardhead__item">
              <span className="teamcardhead__item--name">{header.col1}</span>
            </h2>
            <h2 className="teamcardhead__item">
              <span className="teamcardhead__item--name">{header.col2}</span>
            </h2>
          </div>
          <div className="teamcardhead__row">
            <h2 className="teamcardhead__item">
              <span className="teamcardhead__item--name"></span>
            </h2>
            <h2 className="teamcardhead__item">
              <span className="teamcardhead__item--name">
                {header.col4}
              </span>
            </h2>
          </div>
        </div>
    )




}
export default DetailsCardHead;
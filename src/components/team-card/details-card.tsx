import React, { useState, useEffect, Fragment } from "react";
import "./details-card.scss";
import DetailsCardHead from "./details-card-header";
import DetailsCardGrid from "./details-grid";
import Pagination from "../pagination/pagination";
import classnames from 'classnames';
import { DetailsHeader } from "./details-card-header";
import { GridNames } from "./details-grid";
import Popup from "../popup/popup-component";
import { DetailsSubHeaderData } from "./details-subheader";
import MessageCard from "../messageCard/messageCard";



export interface DetailsData {
  id: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
}

export interface SubHeaderData {
  col1:string,
  col2:string,
  col3:string,
  col4:string;
}




interface DetailsCardProps {
  title: string;
  header: DetailsHeader;
  columns: GridNames;
  subHeaderData:DetailsSubHeaderData[];
  data: DetailsData[];
  usePopUp: boolean;
  classIsOpen: string;
  highLightItemsRed: string[];
  highLightItemsGreen: string[];
  onClosePopup: ()=> void;
  pageSize: number;
}



const DetailsCard: React.FC<DetailsCardProps> = ({title, columns,highLightItemsGreen,subHeaderData,  data,usePopUp,  header, classIsOpen,highLightItemsRed, onClosePopup,pageSize = 4}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDetailData, setCurrentDetailData] = useState<DetailsData[]>([]);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    setCurrentDetailData(data.slice(firstPageIndex, lastPageIndex));
  }, [currentPage, data,pageSize]);


  const closePopupHandler = () => {
    setCurrentPage(1);
    onClosePopup();
  }

  if (subHeaderData.length === 0) {
    return (
      <MessageCard classIsOpen={classIsOpen} message={'Unable to get detail data'} onClosePopup={closePopupHandler}  />
    )
  }

  return (
    <Fragment>  
      {usePopUp ? <Popup className={classnames("popup",{open:classIsOpen=== 'open'})}>
      <div className={classnames("teamcard",{open:classIsOpen=== 'open'})}>
          <a href="#" className="teamcard__close" onClick={closePopupHandler}>
            &times;
          </a>
        <h2 className="teamcard__heading">
          <span className="teamcard__heading--main">{title}</span>
        </h2>
        <DetailsCardHead header={header} />
        <DetailsCardGrid 
          headers={columns} 
          data={currentDetailData} 
          highLightItemsGreen={highLightItemsGreen} 
          highLightItemsRed={highLightItemsRed}
          subHeaderData={subHeaderData}/>
        <Pagination
          currentPage={currentPage}
          totalCount={data.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Popup> : 
      <div className={classnames("teamcard-visible")}>
          <a href="#" className="teamcard__close" onClick={closePopupHandler}>
            &times;
          </a>
        <h2 className="teamcard__heading">
          <span className="teamcard__heading--main">{title}</span>
        </h2>
        <DetailsCardHead header={header} />
        <DetailsCardGrid 
          headers={columns} 
          data={currentDetailData} 
          highLightItemsGreen={highLightItemsGreen} 
          highLightItemsRed={highLightItemsRed}
          subHeaderData={subHeaderData}/>
        <Pagination
          currentPage={currentPage}
          totalCount={data.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    }
    </Fragment>

  );
};
export default DetailsCard;

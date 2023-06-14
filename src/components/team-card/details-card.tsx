import React, { useState, useEffect } from "react";
import "./details-card.scss";
import DetailsCardHead from "./details-card-header";
import DetailsCardGrid from "./details-grid";
import Pagination from "../pagination/pagination";
import classnames from 'classnames';
import { DetailsHeader } from "./details-card-header";
import { GridNames } from "./details-grid";


export interface DetailsData {
  id: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
}


interface DetailsCardProps {
  title: string;
  header: DetailsHeader;
  columns: GridNames; 
  data: DetailsData[];
  classIsOpen: string;
  onClosePopup: (popUpOpen:boolean)=> void;
  pageSize: number;
}



const DetailsCard: React.FC<DetailsCardProps> = ({title, columns, data, header, classIsOpen, onClosePopup,pageSize = 4}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDetailData, setCurrentDetailData] = useState<DetailsData[]>([]);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    setCurrentDetailData(data.slice(firstPageIndex, lastPageIndex));
  }, [currentPage, data,pageSize]);


  const closePopupHandler = () => {
    setCurrentPage(1);
    onClosePopup(false);
  }


  return (
    <div className={classnames("popup", "teamcard__popup",{open:classIsOpen=== 'open'})}>
      <div className={classnames("teamcard",{open:classIsOpen=== 'open'})}>
          <a href="#" className="teamcard__close" onClick={closePopupHandler}>
            &times;
          </a>
        <h2 className="teamcard__heading">
          <span className="teamcard__heading--main">{title}</span>
        </h2>
        <DetailsCardHead header={header} />
        <DetailsCardGrid headers={columns} data={currentDetailData} />
        <Pagination
          currentPage={currentPage}
          totalCount={data.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};
export default DetailsCard;

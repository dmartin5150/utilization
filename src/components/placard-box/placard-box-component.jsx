import {useState, useEffect} from 'react';

import Placard from "../placard/placard-component";
import Pagination from "../pagination/pagination-component";
import "./placard-box-component.scss";
import classnames from "classnames";

const PlacardBox = ({
  placardData,
  className,
  heading,
  placardClass,
  selectedPlacard,
  onPlacardChange,
  paginationClass = "pagination-bar",
  pageSize
}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPlacardData, setCurrentPlacardData] = useState([]);


  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    setCurrentPlacardData(placardData.slice(firstPageIndex, lastPageIndex));
  }, [currentPage, placardData]);


  return (
    <div className={classnames("placard-box", { [className]: className })}>
      <h2 className="heading">{heading}</h2>
      <div className="layout">
        {currentPlacardData.map((placard) => {
          return (
            <Placard
              key={placard.date}
              id={placard.date}
              className={placardClass}
              title={placard.date}
              focus={placard.discharges}
              subtitle={"discharges"}
              selectedPlacard={selectedPlacard}
              onPlacardChange={onPlacardChange}
            ></Placard>
          );
        })}
      </div>
      <Pagination
        className={paginationClass}
        currentPage={currentPage}
        totalCount={placardData.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default PlacardBox;

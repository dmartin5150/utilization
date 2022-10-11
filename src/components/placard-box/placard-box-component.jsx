import { useState, useEffect } from "react";

import Placard from "../placard/placard-component";
import PaginationContainer from "../pagination/pagination-container";
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
  pageSize,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPlacardData, setCurrentPlacardData] = useState([]);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    setCurrentPlacardData(placardData.slice(firstPageIndex, lastPageIndex));
  }, [currentPage, placardData]);

  return (
    <PaginationContainer
      className={paginationClass}
      recordCount={placardData.length}
      currentPage={currentPage}
      pageSize={pageSize}
      setCurrentPage={setCurrentPage}
    >
      <div className={classnames("placard-box", { [className]: className })}>
        <h2 className="heading">{heading}</h2>
        <ul className="layout">
          {currentPlacardData.map((placard) => {
            return (
              <li>
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
              </li>
            );
          })}
        </ul>
        {/* <Pagination
        className={paginationClass}
        currentPage={currentPage}
        totalCount={placardData.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      /> */}
      </div>
    </PaginationContainer>
  );
};

export default PlacardBox;

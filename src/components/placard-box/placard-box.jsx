import { useState, useEffect } from "react";

import Placard from "../placard/placard-component";
import Pagination from "../pagination/pagination";
import "./placard-box.scss";
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
    <div className={classnames("placard-box", { [className]: className })}>
      <h2 className="heading">{heading}</h2>
      <ul className="layout">
        {currentPlacardData.map((placard) => {
          return (
            <li  key={placard.key}>
              <Placard
                id={placard.id}
                className={placard.className}
                title={placard.title}
                focus={placard.focus}
                subtitle={placard.subtitle}
                selectedPlacard={selectedPlacard}
                onPlacardChange={onPlacardChange}
              ></Placard>
            </li>
          );
        })}
      </ul>
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

import React, { useState, useEffect } from "react";
import "./provider-card.scss";
import Popup from "../popup/popup-component";
import ProviderCardHead from "./provider-card-head";
import ProviderCardGrid from "./provider-card-grid";
import Pagination from "../pagination/pagination-component";
import classnames from "classnames";

const ProviderCard = ({
  patientData,
  className,
  onOpenPopup,
  pageSize = 4,
}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [patientList, setPatientList] = useState([]);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;

    setPatientList(patientData.slice(firstPageIndex, lastPageIndex));
  }, [currentPage, patientData, pageSize]);

  const closePopupHandler = () => {
    onOpenPopup(false);
  };

  return (
    <Popup
      className={classnames("providercard__popup", {open: className === "open"})}>
      <div
        className={classnames("providercard", { open: className === "open" })}
      >
        <a href="#" className="close" onClick={closePopupHandler}>
          &times;
        </a>
        <h2 className="heading">
          <span className="heading--main">Seamless Transitions</span> Provider
          Dashboard
        </h2>
        <ProviderCardHead providerData={patientData[0]} />
        <ProviderCardGrid providerData={patientList} />
        <Pagination
          className="pagination"
          currentPage={currentPage}
          totalCount={patientData.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Popup>
  );
};
export default ProviderCard;

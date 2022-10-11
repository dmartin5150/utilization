import React, { useState, useEffect } from "react";
import "./calendar-component.scss";
import Placard from "../placard/placard-component";
import PlacardBox from "../placard-box/placard-box-component";
import Pagination from "../pagination/pagination-component";
import "./calendar-day-component.scss";


const Calendar = ({ admissionData, selectedDate, onDateChange, heading,pageSize=12 }) => {
  console.log('admissiomData', admissionData);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [currentAdmissionData, setCurrentAdmissionData] = useState([]);
  // const [paginationData, setPaginationData] = useState([]);

  // useEffect(() => {
  //   const firstPageIndex = (currentPage - 1) * pageSize;
  //   const lastPageIndex = firstPageIndex + pageSize;
  //   setCurrentAdmissionData(admissionData.slice(firstPageIndex, lastPageIndex));
  // }, [currentPage, admissionData]);

  // useEffect(() => {
  //   const pagData = [];
  //   pagData["currentPage"] = currentPage;
  //   pagData["recordCount"] = admissionData.length;
  //   pagData["pageSize"] = pageSize;
  //   setPaginationData(pagData);
  // }, [currentPage, admissionData]);

  return (
    <PlacardBox
      placardData={admissionData}
      heading={heading}
      placardClass={"calendar-day"}
      selectedPlacard={selectedDate}
      onPlacardChange={onDateChange}
      pageSize={12}
    />
  );
};
export default Calendar;

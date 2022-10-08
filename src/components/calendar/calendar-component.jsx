import React, { Fragment,useState, useMemo } from "react";
import "./calendar-component.scss";
import CalendarDay from "./calendar-day-component";
import Pagination from "../pagination/pagination-component";


let pageSize = 12;

const Calendar = ({ admissionData }) => {
  console.log("ad data", admissionData);
  const [currentPage, setCurrentPage] = useState(1);

  const currentAdmissionData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return admissionData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, admissionData]);



  return (
    <div className="calendar">
      <h2 className="calendar__heading">St. Thomas Midtown Admissions</h2>
      <div className="calendar__layout">
        {currentAdmissionData.map((admission) => {
          return (
            <CalendarDay
              key={admission.date}
              date={admission.date}
              admissions={admission.admissions}
            />
          );
        })}
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={admissionData.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};
export default Calendar;

import React, { Fragment,useState, useMemo } from "react";
import "./calendar-component.scss";
import CalendarDay from "./calendar-day-component";
import Pagination from "../pagination/pagination-component";


let pageSize = 12;

const Calendar = ({ admissionData,selectedDate,onDateChange }) => {
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
          const dischargeDay = admission.date.split(' ')[0];
          return (
            <CalendarDay
              key={dischargeDay}
              date={dischargeDay}
              discharges={admission.discharges}
              data={dischargeDay}
              selectedDate={selectedDate}
              onDateChange={onDateChange}
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

import React, { useState, useEffect } from "react";
import "./calendar.scss";
import CalendarDay from "./calendarDay";
import Pagination from "../pagination/pagination";


export interface CalendarData {
  date: string;
  display: string;
}

interface CalendarProps {
  title: string,
  selectedDate: string;
  calendarData: CalendarData[];
  onDateChange: (date: string)=>void;
  pageSize: number
}

const Calendar: React.FC<CalendarProps> = ({
  title,
  selectedDate,
  onDateChange,
  calendarData,
  pageSize,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentCalendarData, setCurrentCalendarData] = useState<CalendarData[]>([]);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    setCurrentCalendarData(calendarData.slice(firstPageIndex, lastPageIndex));
  }, [currentPage, calendarData]);

  return (
    <div className={"calendar"}>
      <h2 className="heading">{title}</h2>
      <ul className="layout">
        {currentCalendarData.map((calendarDay) => {
          return (
            <li key={calendarDay.date}>
              <CalendarDay
                id={calendarDay.date}
                calendarDay={calendarDay}
                selectedDay={selectedDate}
                onDateChange={onDateChange}
              ></CalendarDay>
            </li>
          );
        })}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalCount={calendarData.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
export default Calendar;

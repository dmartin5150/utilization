import React, { useState, useEffect } from "react";
import "./calendar.scss";
import CalendarDay from "./calendarDay";
import Pagination from "../pagination/pagination";
import Dropdown from "../dropdown/DropDown";


export interface CalendarData {
  date: string;
  display: string;
}

interface CalendarProps {
  title: string,
  selectedDate: string;
  calendarData: CalendarData[];
  hiddenID: string[];
  menuItemsLeft: string[];
  menuItemsRight: string[];
  selectedItemLeft: string;
  selectedItemRight: string;
  dropDownLeftTitle: string;
  dropDownRightTitle:string;
  onDateChange: (date: string)=>void;
  onSelectItemLeft: (item:string)=>void;
  onSelectItemRight: (item:string)=>void;
  pageSize: number
}

const Calendar: React.FC<CalendarProps> = ({
  title,
  selectedDate,
  onDateChange,
  calendarData,
  hiddenID,
  menuItemsLeft,
  selectedItemLeft,
  selectedItemRight,
  dropDownLeftTitle,
  dropDownRightTitle,
  menuItemsRight,
  onSelectItemLeft,
  onSelectItemRight,
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
      <div className='header-title'>
        <div className='header-text'>
          <h2 className="heading">TNNAS UTILIZATION DATA</h2>
          <h2 className="heading">{title}</h2>
        </div>
        <div className="calendar-dropdown">
          <Dropdown 
            title={dropDownLeftTitle} 
            selected={selectedItemLeft} 
            menuItems = {menuItemsLeft}
            onSelectItem={onSelectItemLeft}
            />

        </div>
        <div className="calendar-dropdown">
          <Dropdown 
            title={dropDownRightTitle} 
            selected={selectedItemRight} 
            menuItems = {menuItemsRight}
            onSelectItem={onSelectItemRight}
            />
        </div>
      </div>
      <ul className="layout">
        {currentCalendarData.map((calendarDay) => {
          const hideElement:boolean = hiddenID.includes(calendarDay.date.toString());
          console.log(calendarDay.date, hideElement)
          return (
            <li key={calendarDay.date}>
              <CalendarDay
                id={calendarDay.date}
                calendarDay={calendarDay}
                selectedDay={selectedDate}
                hideElement={hideElement}
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

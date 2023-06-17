import React, { useState, useEffect } from "react";
import "./calendar.scss";
import CalendarDay from "./calendarDay";
import Pagination from "../pagination/pagination";
import Dropdown from "../dropdown/DropDown";
import DaysOfWeek from "./daysOfWeek";
import { DropDownBox } from "../dropdown/DropDown";

export interface CalendarData {
  date: string;
  display: string;
}



interface CalendarProps {
  title: string,
  selectedDate: string;
  calendarData: CalendarData[];
  hiddenID: string[];
  dropDownLeft:DropDownBox;
  dropDownRight: DropDownBox;
  onDateChange: (date: string)=>void;
  pageSize: number
}


const Calendar: React.FC<CalendarProps> = ({
  title,
  selectedDate,
  onDateChange,
  calendarData,
  hiddenID,
  dropDownLeft,
  dropDownRight,
  pageSize,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentCalendarData, setCurrentCalendarData] = useState<CalendarData[]>([]);


  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

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
            title={dropDownLeft.title} 
            selected={dropDownLeft.selected} 
            menuItems = {dropDownLeft.menuItems}
            disabled={dropDownLeft.disabled}
            onSelectItem={dropDownLeft.onSelectItem}
            />

        </div>
        <div className="calendar-dropdown">
          <Dropdown 
            title={dropDownRight.title} 
            selected={dropDownRight.selected} 
            menuItems = {dropDownRight.menuItems}
            disabled={dropDownRight.disabled}
            onSelectItem={dropDownRight.onSelectItem}
            />
        </div>
      </div>
      <ul className='daysofweek'>
        {daysOfWeek.map((day, index)=> {
          return <DaysOfWeek key={index} day={day} />
        })}
      </ul>
      <ul className="layout">
        {currentCalendarData.map((calendarDay) => {
          const hideElement:boolean = hiddenID.includes(calendarDay.date.toString());
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

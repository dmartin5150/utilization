import { useState, useEffect } from "react";
import React from 'react';
import "./calendarDay.scss";
import classnames from 'classnames';
import { CalendarData} from "./calendar";

interface CalendarDayProps {
  id: string;
  calendarDay: CalendarData
  selectedDay:string,
  onDateChange: (date: string)=>void;
}


const CalendarDay: React.FC<CalendarDayProps> = ({id, calendarDay, selectedDay,onDateChange}) => {

  const onDateChangeHandler = (event: React.MouseEvent<HTMLDivElement> ) => {
    onDateChange((event.target as HTMLDivElement).id);
  };

  return (
    <div
      className={classnames("calendar-day",
       {selected: id === selectedDay})}
      id={id}
      onClick={onDateChangeHandler}
    >
      <h3 className="title">{calendarDay.date}</h3>
      <h1 className="display">{calendarDay.display}</h1>
    </div>
  );
};

export default CalendarDay;

import React from "react";
import "./calendar-day-component.scss";
import classnames from "classnames";

const cn = 'calendar-day';
const CalendarDay = ({ date, discharges, selectedDate,onDateChange }) => {
  const dateChangeHandler = (event) => {
    onDateChange(event.target.id);
  };
  
  return (
    <div
      className={classnames("calendar-day", {
        selected: date === selectedDate
      })}
      id={date}
      onClick={dateChangeHandler}
    >
      <h3 className={`${cn}__date`}>{date}</h3>
      <span className="calendar-day__admissions">{discharges}</span>
      <p className="calendar-day__subtitle">discharges</p>
    </div>
  );
};

export default CalendarDay;

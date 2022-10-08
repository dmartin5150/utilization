import React, { Fragment } from "react";
import './calendar-component.scss';
import CalendarDay from "./calendar-day-component";

const Calendar = () => {
  return (
    <div className='calendar' >
      <CalendarDay date={"8/1/2022"} admissions={"10"} />
      <CalendarDay date={"8/2/2022"} admissions={"23"} />
      <CalendarDay date={"8/3/2022"} admissions={"74"} />
      <CalendarDay date={"8/4/2022"} admissions={"32"} />
      <CalendarDay date={"8/1/2022"} admissions={"10"} />
      <CalendarDay date={"8/2/2022"} admissions={"23"} />
      <CalendarDay date={"8/3/2022"} admissions={"74"} />
      <CalendarDay date={"8/4/2022"} admissions={"32"} />
      <CalendarDay date={"8/1/2022"} admissions={"10"} />
      <CalendarDay date={"8/2/2022"} admissions={"23"} />
      <CalendarDay date={"8/3/2022"} admissions={"74"} />
      <CalendarDay date={"8/4/2022"} admissions={"32"} />
    </div>
  );
};
export default Calendar;

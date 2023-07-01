import React from 'react';
import "./calendarDay.scss";
import classnames from 'classnames';


export type  CalendarDayData = {
  date: string;
  display:string;
  subHeading1?:string;
  subHeading2?:string;
}

interface CalendarDayProps {
  id: string;
  hideElement: boolean;
  calendarDay: CalendarDayData;
  selectedDay:string;
  onDateChange:(id:string)=>void;
}


const CalendarDay: React.FC<CalendarDayProps> = ({id, calendarDay, onDateChange, selectedDay, hideElement}) => {

  const onDateChangeHandler = (event: React.MouseEvent<HTMLDivElement> ) => {
    onDateChange((event.target as HTMLDivElement).id);

  };


  return (
    <div
      className={classnames("calendar-day",
       {selected: id === selectedDay},
       {hidden: hideElement}
      )}
      id={id}
      onClick={onDateChangeHandler}
    >
      <h3 className="title">{calendarDay.date}</h3>
      <h1 className="display">{calendarDay.display}</h1>
      {calendarDay.subHeading1 ? <h2 className='sub-heading'>{calendarDay.subHeading1}</h2>: null}
      {calendarDay.subHeading2 ?<h2 className='sub-heading'>{calendarDay.subHeading2}</h2>: null}
    </div>

  );
};

export default CalendarDay;

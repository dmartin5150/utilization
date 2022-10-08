import React from 'react';
import './calendar-day-component.scss';


const CalendarDay = ({date, admissions}) => {
    console.log('date', date);
    return (
        <div className='calendar-day'>
            <h3 className='calendar-day__date'>{date}</h3>
            <span className = 'calendar-day__admissions'>{admissions}</span>
            <p className='calendar-day__subtitle'>admissions</p>
        </div>
    )

}

export default CalendarDay;
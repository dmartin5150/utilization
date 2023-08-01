import React from 'react';
import './calendarSummary.scss'
import { CalendarDayData } from '../calendar/calendarDay';
import CalendarDay from '../calendar/calendarDay';
import SelectorList from '../SelectorList/SelectorList';
import { Option, SingleSelector } from "../SelectorList/SelectorList";
import DateTimeSetting from '../dateTimeSettings/dateTimeSetting';


interface CalendarSummaryProps <T extends Option> {
    calendarTotals: CalendarDayData[]
}



function CalendarSummary<T extends Option>({calendarTotals}: React.PropsWithChildren<CalendarSummaryProps<T>>) {
    console.log('calendar summary',calendarTotals )
    return (
        <div className = 'calendar-summary'>
            <h2 className='calendar-summary--title'>Dates: 3/1/2023 - 5/31/2023</h2>
            <ul className="layout-list totals">
                {calendarTotals.map((calendarDay, idx) => {
                return (
                    <li key={idx} className='calendar-summary--day'>
                    <CalendarDay
                        id={idx.toString()}
                        calendarDay={calendarDay}
                        selectedDay={idx.toString()}
                        highLightSelected={false}
                        hideElement={false}
                        onDateChange={()=>{}}
                    ></CalendarDay>
                    </li>
                );
                })}
            </ul>
        </div>
    )
}
export default CalendarSummary
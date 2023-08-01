import React from 'react';
import './calendarSummary.scss'
import { CalendarDayData } from '../calendar/calendarDay';
import CalendarDay from '../calendar/calendarDay';
import SelectorList from '../SelectorList/SelectorList';
import { Option, SingleSelector } from "../SelectorList/SelectorList";
import DateTimeSetting from '../dateTimeSettings/dateTimeSetting';
import { DateRange } from '../../store/ORData/ordata.types';


interface CalendarSummaryProps <T extends Option> {
    calendarTotals: CalendarDayData[]
    dateRange:DateRange
}



function CalendarSummary<T extends Option>({calendarTotals,dateRange}: React.PropsWithChildren<CalendarSummaryProps<T>>) {
    console.log('calendar summary',calendarTotals )
    const start = `${dateRange.startDate.getMonth() + 1}-${dateRange.startDate.getDate()}-${dateRange.startDate.getFullYear()}`
    const end = `${dateRange.endDate.getMonth() + 1}-${dateRange.endDate.getDate()}-${dateRange.endDate.getFullYear()}`
    return (
        <div className = 'calendar-summary'>
            <h2 className='calendar-summary--title'>Dates: {start} - {end}</h2>
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
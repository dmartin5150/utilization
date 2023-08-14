import React, { useState, useEffect } from "react";
import "./calendar.scss";
import CalendarDay from "./calendarDay";
import Pagination from "../pagination/pagination";
import Dropdown from "../dropdown/DropDown";
import DaysOfWeek from "./daysOfWeek";
import { DropDownBox } from "../dropdown/DropDown";
import { useAppDispatch } from "../../hooks/hooks";
import { useSelector } from "react-redux";
import { selectCalendarData } from "../../store/ORData/selectors/ordata.selector";
import { selectUnit } from "../../store/Facility/facility.selector";
import SelectorList from "../SelectorList/SelectorList";
import { Option, SingleSelector } from "../SelectorList/SelectorList";
import MonthControl from "./monthControl";
import CalendarSummary from "../calendarsummary/calendarSummary";
import { DateRange } from "../../store/ORData/ordata.types";

import { CalendarDayData } from "./calendarDay";

export enum MonthChangeDirection {
   FORWARD,
   BACKWARD
}

export type DataDateRange = {
  startDate: Date,
  endDate: Date, 
  currentDate: Date
}



interface CalendarProps<T extends Option> {
  title: string,
  subTitle: string,
  selectedDate: string;
  dataDateRange:DataDateRange
  calendarData:CalendarDayData[];
  calendarSummary?:CalendarDayData[];
  summaryDateRange?:DateRange;
  calendarTotals?:CalendarDayData[];
  useDropDown: boolean;
  list1: SingleSelector<T>;
  list2: SingleSelector<T>
  list3?: SingleSelector<T>
  onMonthChange: (direction:MonthChangeDirection)=>void;
  onDateChange:(id:string)=>void;
  onTextChanged?: (searchText:string)=>void;
  pageSize: number
}


function Calendar<T extends Option>({
  title,subTitle, selectedDate,calendarData, dataDateRange,calendarSummary, summaryDateRange,calendarTotals,useDropDown,list1,list2,list3, onMonthChange,  onDateChange,onTextChanged, pageSize
}: React.PropsWithChildren<CalendarProps<T>>)  {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentCalendarData, setCurrentCalendarData] = useState<CalendarDayData[]>([]);
  const [month, setMonth] = useState<string>('July')
  const [searchText, setSearchText] = useState('');

  const calendar = useSelector(selectCalendarData);
  const unit = useSelector(selectUnit);
  const dispatch = useAppDispatch();
  const hiddenID = ["-1","-2","-3","-4","-5"]
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  useEffect(()=> {
    if (calendarData.length > 0) {
      // const date = new Date(calendarData[0].date);
      const date = new Date(calendarData[0].date + 'T00:00:00');
      console.log('initial date', calendarData[0].date)
      const padding = date.getDay()-1;
      setMonth(month);
      // console.log('offset', padding, calendarData[0], date)
      let index = -1;
      for (let step = 0; step < padding; step++) {
        const blankDay:CalendarDayData= {date:index.toString(), display:'Blank',dayOfWeek:-1, ptMinutes:0, nonptMinutes:0, totalptMinutes:0}
        calendarData.unshift(blankDay)
        index -= 1;
      }
  }
  },[calendarData])

  useEffect(() => {
    if (onTextChanged)  {
      onTextChanged(searchText)
    }
  },[searchText])

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    setCurrentCalendarData(calendarData.slice(firstPageIndex, lastPageIndex));
  }, [currentPage, calendarData]);


const handleSearchTextChanged = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
}

  return (
    <div className={"calendar"}>
      <div className='header-title'>
        <div className='header-text'>
          <h2 className="heading">{title}</h2>
          <h2 className="heading">{subTitle}</h2>
        </div>
        {!useDropDown ? <div className='searchBox'>
            <h2>{title}</h2>
            <input value={searchText} type="number"
            onChange={handleSearchTextChanged}
            />
          </div> :
        <div className="calendar-dropdown">
          <SelectorList 
          title={list1.title}
          showBorder={list1.showBorder}
          selectedOption={list1.selectedOption} 
          optionList = {list1.optionList}
          onChange = {list1.onChange}
          />
        </div>}
        <div className="calendar-dropdown">
          <SelectorList 
          title={list2.title}
          showBorder={list2.showBorder}
          selectedOption={list2.selectedOption} 
          optionList = {list2.optionList}
          onChange = {list2.onChange}
          />
        </div>
        {list3 && <div className="calendar-dropdown">
          <SelectorList 
          title={list3.title}
          showBorder={list3.showBorder}
          selectedOption={list3.selectedOption} 
          optionList = {list3.optionList}
          onChange = {list3.onChange}
          />
        </div>}
      </div>
      {list3 && calendarSummary && summaryDateRange && <CalendarSummary calendarTotals={calendarSummary} dateRange={summaryDateRange} />}
      <div>
        <MonthControl dateRange={dataDateRange} onMonthChange={onMonthChange} />
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
                highLightSelected={true}
                onDateChange={onDateChange}
              ></CalendarDay>
            </li>
          );
        })}
      </ul>
      <ul className="layout totals">
        {calendarTotals && (calendarTotals.length !== 0) && calendarTotals.map((calendarDay, idx) => {
          const hideElement:boolean = hiddenID.includes(calendarDay.date.toString());
          return (
            <li key={idx}>
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

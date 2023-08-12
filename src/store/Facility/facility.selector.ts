import { RootState } from "../store"
import { createSelector } from "reselect";
import { FacilityDataState } from "./facitlity.reducer";
import { selectDataCurrentDate } from "../ORData/selectors/ordata.selector";
import { OpenTimes, OpenTimeTypes } from "./facility.types";
import {getNextMonth, getNextYear} from "../../utilities/dates/dates"
import { CalendarDayData } from "../../components/calendar/calendarDay";
import { selectUnitRoomLists } from "../../store/ORData/selectors/ordata.selector";
import { item } from "../../store/ORData/ordata.types";




const selectFacilityReducer = (state:RootState):FacilityDataState => state.Facility;

export const selectUnit = createSelector(
    [selectFacilityReducer],
    (facilitySlice) => facilitySlice.unit
)

export const selectOpenTimeDuration = createSelector(
    [selectFacilityReducer],
    (facilitySlice) => facilitySlice.openTimeDuration
)

export const selectOpenTimeRoom = createSelector(
    [selectFacilityReducer],
    (facilitySlice) => facilitySlice.selectedRoom
)


export const selectOpenTimesLoading = createSelector(
    [selectFacilityReducer],
    (facilitySlice) => facilitySlice.isLoading
)

export const selectOpenTimeError = createSelector(
    [selectFacilityReducer],
    (facilitySlice) => facilitySlice.error
)

export const selectOpenTimeType = createSelector(
    [selectFacilityReducer],
    (facilitySlice) => facilitySlice.openTimeType
)


export const selectOpenTimes = createSelector(
    [selectFacilityReducer],
    (facilitySlice) => facilitySlice.openTimes
)


export const selectUnusedTimeCalendar = createSelector(
    [selectFacilityReducer],
    (facilitySlice) => facilitySlice.openTimeCalendar
)


const getEndDateRange = (curDate:Date) => {
    const startDate = new Date(`${curDate.getFullYear()}-${curDate.getMonth()+1}-1`)
    const nextMonth = getNextMonth(curDate.getMonth() + 1)
    const nextYear = getNextYear(curDate.getMonth() + 1,curDate.getFullYear())
    return new Date(`${nextYear}-${nextMonth}-1`)
}


const getFilteredOpenTimes = (unit:string, curDate:Date,openType:OpenTimeTypes,room:string, duration: number, data: OpenTimes[]) => {
    let filteredData:OpenTimes[]
    if (openType === OpenTimeTypes.all) {
        filteredData = data.filter((openTime) => (openTime.unit ===unit))
    } else {
        filteredData = data.filter((openTime) => ((openTime.unit === unit) && (openTime.open_type === openType) 
                                                && (openTime.room === room) && (openTime.unused_block_minutes >= duration)))
    }
    const startDate = new Date(`${curDate.getFullYear()}-${curDate.getMonth()+1}-1`)
    const endDate = getEndDateRange(curDate)
    return filteredData.filter((openTime) => ((openTime.proc_date >= startDate) && (openTime.proc_date < endDate)))

}



export const selectFilteredOpenTimes = createSelector(
    [selectUnit,selectDataCurrentDate,selectOpenTimeType,selectOpenTimeRoom, selectOpenTimeDuration, selectOpenTimes],
    (unit, curDate,openType,room,duration, data) => getFilteredOpenTimes(unit, curDate,openType,room,duration, data)
)



const calculateUnusedMinutes = (curData:OpenTimes[]) => {
    let totalUnusedMinutes
    if (curData.length !== 0) {
        console.log('curData', curData)
        const unusedMinutes = curData.map((data) => data.unused_block_minutes)
        totalUnusedMinutes = (unusedMinutes.reduce((ac,total)=> ac + total, 0))/60;
    } else {
        totalUnusedMinutes = 0;
    }
    return totalUnusedMinutes
}


const getCalendarData = (curDate:Date, data:OpenTimes[]):CalendarDayData[] => {
    const calendarDays:CalendarDayData[] = []
    const dates = data.map((openTime) => openTime.proc_date)
    const endDate = getEndDateRange(curDate)
    let loopDate = new Date(`${curDate.getFullYear()}-${curDate.getMonth()+1}-1`)
    while (loopDate < endDate) {
        if ((loopDate.getDay() === 0) || (loopDate.getDay() === 6)) {
            const newDate = loopDate.setDate(loopDate.getDate() + 1);
            loopDate = new Date(newDate);
            continue;
        }
        const curData = data.filter((data) => data.proc_date.getTime() === loopDate.getTime())
        let totalUnusedMinutes = calculateUnusedMinutes(curData)
        const display = Math.round(totalUnusedMinutes).toString()
        const calDay:CalendarDayData = {date:loopDate.toString(),display,subHeading1:'Hours',ptMinutes:0, nonptMinutes:0, totalptMinutes:0,dayOfWeek:curDate.getDay()}
        calendarDays.push(calDay)
        const newDate = loopDate.setDate(loopDate.getDate() + 1);
        loopDate = new Date(newDate);
    }
    return calendarDays
}


export const selectOpenTimeCalendar = createSelector(
   [selectDataCurrentDate, selectFilteredOpenTimes],
   (curDate, data) => getCalendarData(curDate, data)
)


export const selectOpenTimeRoomHours = createSelector(
    [selectUnitRoomLists,selectUnit,selectDataCurrentDate,selectFilteredOpenTimes],
    (roomList, unit, curDate, data) => {
        const roomListItems:item[] = []
        const selectedRooms = roomList[unit]
        if (!selectedRooms || selectedRooms.length === 0) {
            return roomListItems
        }
        selectedRooms.forEach((room,index) => {
            let curData = data.filter((openTime)=> openTime.room === room.name);
            curData = curData.filter((data) => data.proc_date.getTime() === curDate.getTime())
            let totalUnusedMinutes = calculateUnusedMinutes(curData)
            let curItem:item = {'id': index, 'name':`${room.name}: ${totalUnusedMinutes.toFixed(2)} hours`, 'selected':room.selected}
            roomListItems.push(curItem)
        })
        return roomListItems
    }
)






export const selectDate = createSelector(
    [selectFacilityReducer],
    (facilitySlice) => facilitySlice.date
)

export const selectRoom = createSelector(
    [selectFacilityReducer],
    (facilitySlice) => facilitySlice.room
)

export const selectPrimeTime = createSelector(
    [selectFacilityReducer],
    (facilitySlice) => facilitySlice.primeTime
)


const calculatePTMinutes = (ptStart:string, ptEnd:string):number => 
{
    const time_start = new Date();
    const time_end = new Date();
    const value_start = ptStart.split(':');
    const value_end = ptEnd.split(':');

    time_start.setHours(parseInt(value_start[0]), parseInt(value_start[1]));
    time_end.setHours(parseInt(value_end[0]), parseInt(value_end[1]));

    return (time_end.valueOf() - time_start.valueOf())/(1000*60)
}

export const selectPTminutesperroom = createSelector(
    [selectPrimeTime],
    (PrimeTime) => calculatePTMinutes(PrimeTime.start, PrimeTime.end)
)


export const selectCustomDateRange = createSelector(
    [selectFacilityReducer],
    (facilitySlice) => facilitySlice.dateRange
)
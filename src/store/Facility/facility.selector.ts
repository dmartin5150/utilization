import { RootState } from "../store"
import { createSelector } from "reselect";
import { FacilityDataState } from "./facitlity.reducer";
import { selectDataCurrentDate } from "../ORData/selectors/ordata.selector";
import { OpenTimes, OpenTimeTypes } from "./facility.types";
import {getNextMonth, getNextYear} from "../../utilities/dates/dates"





const selectFacilityReducer = (state:RootState):FacilityDataState => state.Facility;

export const selectUnit = createSelector(
    [selectFacilityReducer],
    (facilitySlice) => facilitySlice.unit
)

export const selectOpenTimeDuration = createSelector(
    [selectFacilityReducer],
    (facilitySlice) => facilitySlice.openTimeDuration
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

const getFilteredOpenTimes = (unit:string, curDate:Date,openType:OpenTimeTypes, data: OpenTimes[]) => {
    let filteredData = data.filter((openTime) => ((openTime.unit == unit) && (openTime.open_type == openType)))
    const startDate = new Date(`${curDate.getFullYear()}-${curDate.getMonth()}-${curDate.getDate()}T00:00:00`)
    const nextMonth = getNextMonth(curDate.getMonth())
    const nextYear = getNextYear(curDate.getMonth(),curDate.getFullYear())
    const endDate = new Date(`${nextYear}-${nextMonth}-1T00:00:00`)
    return filteredData.filter((openTime) => ((openTime.proc_date <= startDate) && (openTime.proc_date < endDate)))
}



export const selectFilteredOpenTimes = createSelector(
    [selectUnit,selectDataCurrentDate,selectOpenTimeType,selectOpenTimes],
    (unit, curDate,openType, data) => getFilteredOpenTimes(unit, curDate,openType, data)
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
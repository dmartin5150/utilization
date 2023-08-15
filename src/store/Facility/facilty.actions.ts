import { FACILITY_TYPES } from "./facility.types";
import { createAction, Action, ActionWithPayload, withMatcher } from "../../utilities/reducer/reducerutils";
import { FACILITY_UNITS } from "./facitlityUnits";
import { PrimeTime } from "./facility.types";
import { DateRange } from "../ORData/ordata.types";
import { item } from "../ORData/ordata.types";
import { FacilityRoom } from "./facitlity.reducer";
import { TNNASUNIT,OpenTimes,OpenTimeTypes } from "./facility.types";
import { AppDispatch } from "../store";
import getOpenTimes from "../../utilities/fetchData/getOpenTimes"
import { CalendarDayData } from "../../components/calendar/calendarDay";
import { UnitRoomListItem } from "../../pages/settings/settings.constants";
import { CalendarMenuItem } from "../../pages/utilization/utilization.constants";



export type SetDisplayedRoomList = ActionWithPayload<FACILITY_TYPES.SET_DISPLAYED_ROOM_LIST, UnitRoomListItem[]>
export type SetOpenTimeRoomList = ActionWithPayload<FACILITY_TYPES.SET_OPEN_TIME_ROOM_LIST,UnitRoomListItem[]>
export type SetOpenTimeDuration = ActionWithPayload<FACILITY_TYPES.SET_OPEN_TIME_DURATION, number>
export type SetSelectedTimeType = ActionWithPayload<FACILITY_TYPES.SET_SELECTED_TIME_TYPE,OpenTimeTypes>
export type SetUnit = ActionWithPayload<FACILITY_TYPES.SELECT_UNIT, string>
export type SetDate = ActionWithPayload<FACILITY_TYPES.SELECT_DATE, string>
export type SetRoom = ActionWithPayload<FACILITY_TYPES.SELECT_ROOM, FacilityRoom>
export type SetPrimeTime= ActionWithPayload<FACILITY_TYPES.SET_PRIME_TIME,PrimeTime>
export type SetCustomDateRange = ActionWithPayload<FACILITY_TYPES.SET_DATE_RANGE, DateRange>
export type FetchOpenTimeStart = Action<FACILITY_TYPES.FETCH_OPEN_TIME_START>
export type FetchOpenTimeSuccess = ActionWithPayload<FACILITY_TYPES.FETCH_OPEN_TIME_SUCCESS, OpenTimes[]>
export type FetchOpenTimeFailed = ActionWithPayload<FACILITY_TYPES.FETCH_OPEN_TIME_FAILED, Error>
export type SetOpenTimeCalendar = ActionWithPayload<FACILITY_TYPES.SET_OPEN_TIME_CALENDAR, CalendarDayData[]>
export type SetSelectedOpenTimeRoom = ActionWithPayload<FACILITY_TYPES.SET_SELECTED_OPEN_TIME_ROOM, CalendarMenuItem>
export type SetSelectedOpenTimeDate = ActionWithPayload<FACILITY_TYPES.SET_SELECTED_OPEN_TIME_DATE, string>



export const setDisplayedRoomList = withMatcher((roomList:UnitRoomListItem[]):SetDisplayedRoomList => {
    return createAction(FACILITY_TYPES.SET_DISPLAYED_ROOM_LIST, roomList)
})

export const setOpenTimeDuration = withMatcher((duration:number):SetOpenTimeDuration => {
    return createAction(FACILITY_TYPES.SET_OPEN_TIME_DURATION, duration)
})

export const setSelectedTimeType = withMatcher((timeType:OpenTimeTypes):SetSelectedTimeType => {
    return createAction(FACILITY_TYPES.SET_SELECTED_TIME_TYPE, timeType)
})

export const setSelectedOpenTimeRoom = withMatcher((room:CalendarMenuItem):SetSelectedOpenTimeRoom => {
    return createAction(FACILITY_TYPES.SET_SELECTED_OPEN_TIME_ROOM, room)
})

export const setSelectedOpenTimeDate = withMatcher((curDate:string):SetSelectedOpenTimeDate => {
    return createAction(FACILITY_TYPES.SET_SELECTED_OPEN_TIME_DATE, curDate)
})

export const setOpenTimeRoomList = withMatcher((roomList:UnitRoomListItem[]):SetOpenTimeRoomList =>{
    return createAction(FACILITY_TYPES.SET_OPEN_TIME_ROOM_LIST, roomList)
})

export const fetchOpenTimeStart = withMatcher(():FetchOpenTimeStart => {
    return createAction(FACILITY_TYPES.FETCH_OPEN_TIME_START)
})

export const fetchOpenTimeSuccess = withMatcher((openTimes:OpenTimes[]):FetchOpenTimeSuccess => {
    return createAction(FACILITY_TYPES.FETCH_OPEN_TIME_SUCCESS, openTimes)
})

export const fetchOpenTimeFailed = withMatcher((error:Error):FetchOpenTimeFailed => {
    return createAction(FACILITY_TYPES.FETCH_OPEN_TIME_FAILED,error)
}) 
 

export const setUnit = withMatcher((unit: string):SetUnit => {
    return createAction(FACILITY_TYPES.SELECT_UNIT, unit);
});

export const setDate = withMatcher((date:string):SetDate => {
    return createAction(FACILITY_TYPES.SELECT_DATE, date);
});

export const setRoom = withMatcher((room:FacilityRoom):SetRoom => {
    return createAction(FACILITY_TYPES.SELECT_ROOM, room)
});

export const setPrimeTime = withMatcher((primeTime:PrimeTime):SetPrimeTime => {
    return createAction(FACILITY_TYPES.SET_PRIME_TIME, primeTime)
});

export const setCustomDateRange = withMatcher((dateRange:DateRange):SetCustomDateRange => {
    return createAction(FACILITY_TYPES.SET_DATE_RANGE, dateRange)
})

export const setOpenTimeCalendar = withMatcher((calendar:CalendarDayData[]):SetOpenTimeCalendar => {
    return createAction(FACILITY_TYPES.SET_OPEN_TIME_CALENDAR, calendar)
})


export const fetchOpenTimesAsync = (unit:string, startDate:string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(fetchOpenTimeStart());
        try {
            let openTimes = await getOpenTimes(unit, startDate);
            openTimes = openTimes.map((openTime:OpenTimes) => {
               return  {...openTime, proc_date: new Date(openTime.proc_date + 'T00:00:00')}})
            dispatch(fetchOpenTimeSuccess(openTimes))
        } catch (error) {
        dispatch(fetchOpenTimeFailed(error as Error))
        }
    }
}
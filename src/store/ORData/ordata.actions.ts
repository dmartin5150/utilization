import { CalendarData } from "../../components/calendar/calendar"
import { ORDATA_TYPES } from "./ordata.types"
import { createAction, ActionWithPayload, Action, withMatcher } from "../../utilities/reducer/reducerutils"




export type FetchCalendarStart = Action<ORDATA_TYPES.FETCH_CALENDAR_DATA_START>

export type FetchCalendarSuccess = ActionWithPayload<ORDATA_TYPES.FETCH_CALENDAR_DATA_SUCCESS, CalendarData[]>

export type FetchCalendarFailed = ActionWithPayload<ORDATA_TYPES.FETCH_CALENDAR_DATA_FAILED, Error>



export const fetchCalenderStart = withMatcher(():FetchCalendarStart => {
    return createAction(ORDATA_TYPES.FETCH_CALENDAR_DATA_START)
});


export const setCalendarData = withMatcher((calendarArray:CalendarData[]): FetchCalendarSuccess => {
    return createAction(ORDATA_TYPES.FETCH_CALENDAR_DATA_SUCCESS, calendarArray)
})
export const fetchCalendarFailed = withMatcher((error:Error): FetchCalendarFailed => {
    return createAction(ORDATA_TYPES.FETCH_CALENDAR_DATA_FAILED, error)
})
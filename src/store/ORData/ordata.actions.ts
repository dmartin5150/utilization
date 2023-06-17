import { CalendarData } from "../../components/calendar/calendar"
import { ORDATA_TYPES } from "./ordata.types"
import { createAction, ActionWithPayload, Action, withMatcher } from "../../utilities/reducer/reducerutils"
import getCalendarData from "../../utilities/getCalendarData"
import { AppDispatch } from "../store"


export type FetchCalendarStart = Action<ORDATA_TYPES.FETCH_CALENDAR_DATA_START>

export type FetchCalendarSuccess = ActionWithPayload<ORDATA_TYPES.FETCH_CALENDAR_DATA_SUCCESS, CalendarData[]>

export type FetchCalendarFailed = ActionWithPayload<ORDATA_TYPES.FETCH_CALENDAR_DATA_FAILED, Error>



export const fetchCalendarStart = withMatcher(():FetchCalendarStart => {
    return createAction(ORDATA_TYPES.FETCH_CALENDAR_DATA_START)
});

export const fetchCalendarSuccess= withMatcher((calendarArray:CalendarData[]): FetchCalendarSuccess => {
    return createAction(ORDATA_TYPES.FETCH_CALENDAR_DATA_SUCCESS, calendarArray)
});
export const fetchCalendarFailed = withMatcher((error:Error): FetchCalendarFailed => {
    return createAction(ORDATA_TYPES.FETCH_CALENDAR_DATA_FAILED, error)
});

export const fetchCalendarDataAsync = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(fetchCalendarStart);
        try {
            const calendarData = await getCalendarData('BH JRI', '2023-06-01');
            dispatch(fetchCalendarSuccess(calendarData))
        } catch (error) {
        dispatch(fetchCalendarFailed(error as Error))
        }
    }
}
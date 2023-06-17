import { CalendarData } from "../../../components/calendar/calendar"
import { ORDATA_TYPES } from "../ordata.types"
import { createAction, ActionWithPayload, withMatcher } from "../../../utilities/reducer/reducerutils"
import getCalendarData from "../../../utilities/fetchData/getCalendarData"
import { AppDispatch } from "../../store"
import { fetchDataStart , fetchDataFailed } from "./ordata.actions"




export type FetchCalendarSuccess = ActionWithPayload<ORDATA_TYPES.FETCH_CALENDAR_DATA_SUCCESS, CalendarData[]>

export const fetchCalendarSuccess= withMatcher((calendarArray:CalendarData[]): FetchCalendarSuccess => {
    return createAction(ORDATA_TYPES.FETCH_CALENDAR_DATA_SUCCESS, calendarArray)
});

export const fetchCalendarDataAsync = (unit:string, date:string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(fetchDataStart);
        try {
            const calendarData = await getCalendarData(unit, date);
            dispatch(fetchCalendarSuccess(calendarData))
        } catch (error) {
        dispatch(fetchDataFailed(error as Error))
        }
    }
}
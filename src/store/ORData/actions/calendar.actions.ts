import { CalendarDayData } from "../../../components/calendar/calendarDay"
import { ORDATA_TYPES } from "../ordata.types"
import { createAction, ActionWithPayload, withMatcher } from "../../../utilities/reducer/reducerutils"
import getCalendarData from "../../../utilities/fetchData/getCalendarData"
import { AppDispatch } from "../../store"
import { fetchDataStart , fetchDataFailed } from "./ordata.actions"
import { CalendarMenuOptions } from "../../../pages/utilization/utilization.constants"





export type FetchCalendarSuccess = ActionWithPayload<ORDATA_TYPES.FETCH_CALENDAR_DATA_SUCCESS, CalendarDayData[]>
export type SetCalendarSurgeonOption = ActionWithPayload<ORDATA_TYPES.SET_CALENDAR_SURGEON_OPTION, CalendarMenuOptions>
export type SetCalendarRoomOption = ActionWithPayload<ORDATA_TYPES.SET_CALENDAR_ROOM_OPTION, CalendarMenuOptions>
export type SetCalendarData = ActionWithPayload<ORDATA_TYPES.SET_CALENDAR_DATA,CalendarDayData[]>
export type SetCalendarTotals = ActionWithPayload<ORDATA_TYPES.SET_CALENDAR_TOTALS, CalendarDayData[]>




export const fetchCalendarSuccess= withMatcher((calendarArray:CalendarDayData[]): FetchCalendarSuccess => {
    return createAction(ORDATA_TYPES.FETCH_CALENDAR_DATA_SUCCESS, calendarArray)
});

export const setCalendarData = withMatcher((calendarData:CalendarDayData[]):SetCalendarData => {
    return createAction(ORDATA_TYPES.SET_CALENDAR_DATA, calendarData)
} ) 

export const setCalendarSurgeonOption = withMatcher((selection:CalendarMenuOptions):SetCalendarSurgeonOption => {
    return createAction(ORDATA_TYPES.SET_CALENDAR_SURGEON_OPTION,selection)
});

export const setCalendarRoomOption = withMatcher((selection:CalendarMenuOptions):SetCalendarRoomOption => {
    return createAction(ORDATA_TYPES.SET_CALENDAR_ROOM_OPTION,selection)
});

export const setCalendarTotals = withMatcher((totals:CalendarDayData[]):SetCalendarTotals => {
    return createAction(ORDATA_TYPES.SET_CALENDAR_TOTALS, totals)
})


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
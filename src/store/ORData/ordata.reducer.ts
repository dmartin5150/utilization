import { CalendarData } from "../../components/calendar/calendar";
import { SummaryGridData } from "../../components/summary-grid/summary-grid";
import { DetailsData } from "../../components/team-card/details-card";
import { AnyAction } from "redux";
import { fetchCalendarSuccess, fetchCalendarStart, fetchCalendarFailed } from "./ordata.actions";

export type ORDataState = {
    calendarData: CalendarData[];
    gridData: SummaryGridData[];
    detailsData: DetailsData[];
    isLoading:boolean;
    error: null | Error
}


const OR_DATA_INITIAL_STATE: ORDataState = {
    calendarData: [],
    gridData: [],
    detailsData: [],
    isLoading:false,
    error: null
}

export const ORDataReducer = (state=OR_DATA_INITIAL_STATE, action: AnyAction):ORDataState =>  {
    if (fetchCalendarStart.match(action)) {
        return {...state, isLoading: true}
    }
    if (fetchCalendarSuccess.match(action)) {
        return { ...state, calendarData: action.payload, isLoading:false}
    }
    if (fetchCalendarFailed.match(action)) {
        return {...state, error: action.payload, isLoading: false}
    }
    return state;
}
import { CalendarData } from "../../components/calendar/calendar";
import { SummaryGridData } from "../../components/summary-grid/summary-grid";
import { DetailsData } from "../../components/team-card/details-card";
import { AnyAction } from "redux";
import { fetchCalendarSuccess} from "./actions/calendar.actions";
import { fetchGridSuccess} from "./actions/grid.actions";
import { fetchSurgeonListsSuccess} from "./actions/surgeonLists.actions";
import { fetchDetailsSuccess, closePopUp } from "./actions/details.actions";
import { fetchDataStart, fetchDataFailed} from "./actions/ordata.actions";
import { item } from "./ordata.types";
import { UnitRoomLists } from "../../pages/settings/settings.constants";

export type ORDataState = {
    calendarData: CalendarData[];
    gridData: SummaryGridData[];
    detailsData: DetailsData[];
    surgeonLists: UnitRoomLists;
    isLoading:boolean;
    popOpen: boolean;
    error: null | Error
}


const OR_DATA_INITIAL_STATE: ORDataState = {
    calendarData: [],
    gridData: [],
    detailsData: [],
    surgeonLists:{},
    isLoading:false,
    popOpen: false,
    error: null
}

export const ORDataReducer = (state=OR_DATA_INITIAL_STATE, action: AnyAction):ORDataState =>  {
    // console.log(action.type)
    if (fetchDataStart.match(action)) {
        return {...state, isLoading: true}
    }
    if (fetchDataFailed.match(action)) {
        return {...state, error: action.payload, isLoading: false, popOpen:false}
    }
    if (fetchCalendarSuccess.match(action)) {
        return { ...state, calendarData: action.payload, isLoading:false}
    }
    if (fetchGridSuccess.match(action)) {
        return {...state, gridData:action.payload, isLoading:false}
    }
    if (fetchDetailsSuccess.match(action)) {
        return {...state, detailsData: action.payload, isLoading:false, popOpen:true}
    }
    if (fetchSurgeonListsSuccess.match(action)) {
        return {...state, surgeonLists:action.payload, isLoading:false}
    }
    if (closePopUp.match(action)) {
        return {...state, popOpen: false}
    }
    return state;
}
import { CalendarData } from "../../components/calendar/calendar";
import { SummaryGridData } from "../../components/summary-grid/summary-grid";
import { DetailsData } from "../../components/team-card/details-card";
import { AnyAction } from "redux";
import { fetchCalendarSuccess, setCalendarSurgeonOption, setCalendarRoomOption} from "./actions/calendar.actions";
import { fetchGridSuccess} from "./actions/grid.actions";
import { fetchSurgeonListsSuccess} from "./actions/surgeonLists.actions";
import { fetchDetailsSuccess, closePopUp } from "./actions/details.actions";
import { fetchDataStart, fetchDataFailed} from "./actions/ordata.actions";
import { item } from "./ordata.types";
import { UnitRoomLists,UnitRoomListItem } from "../../pages/settings/settings.constants";
import { fetchRoomListsSuccess,setRoomListsSuccess, setActiverRoomListSuccess, 
    setAllRoomsSelected } from "./actions/roomsListActions";
import { setSurgeonLists, setActiveSurgeonList,setAllSurgeonsSelected } from "./actions/surgeonLists.actions";
import {  PT_Hours, SurgeryInfo } from "./ordata.types";
import { fetchPTHoursSuccess } from "./actions/pthours.action";
import { JRIroomList } from "../Facility/facility.types";
import { CalendarMenuOptions } from "../../pages/utilization/utilization.constants";


export type ORDataState = {
    calendarData: CalendarData[];
    gridData: SummaryGridData[];
    detailsData: DetailsData[];
    unitRoomLists: UnitRoomLists;
    activeRoomList: UnitRoomListItem[];
    allRoomsSelected: boolean;
    surgeonLists: UnitRoomLists;
    activeSurgeonList: UnitRoomListItem[], 
    allSurgeonsSelected: boolean;
    calendarSurgeonOption: CalendarMenuOptions, 
    calendarRoomOption: CalendarMenuOptions, 
    isLoading:boolean;
    popOpen: boolean;
    ptHours: PT_Hours;

    error: null | Error
}


const PTHOURS_INITIAL_STATE: PT_Hours = {
    surgeryInfo: []
}

const OR_DATA_INITIAL_STATE: ORDataState = {
    calendarData: [],
    gridData: [],
    detailsData: [],
    unitRoomLists: {}, 
    activeRoomList: JRIroomList,
    allRoomsSelected:true,
    surgeonLists:{},
    activeSurgeonList:[],
    allSurgeonsSelected:true,
    calendarSurgeonOption: CalendarMenuOptions.All, 
    calendarRoomOption: CalendarMenuOptions.All,
    isLoading:false,
    popOpen: false,
    ptHours:PTHOURS_INITIAL_STATE,
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
    if (fetchRoomListsSuccess.match(action)) {
        return {...state, unitRoomLists:action.payload}
    }
    if (setRoomListsSuccess.match(action)){
        return {...state, unitRoomLists:action.payload}
    }       
    if (setActiverRoomListSuccess.match(action)) {
        return {...state, activeRoomList: action.payload}
    }     
    if (setSurgeonLists.match(action)) {
        return {...state, surgeonLists: action.payload}
    }     
    if (setActiveSurgeonList.match(action)) {
        return {...state, activeSurgeonList: action.payload}
    }             
    if (closePopUp.match(action)) {
        return {...state, popOpen: false}
    }

    if (setAllRoomsSelected.match(action)){
        return {...state, allRoomsSelected: action.payload}
    }
    if (setAllSurgeonsSelected.match(action)){
        return {...state, allSurgeonsSelected: action.payload}
    }
    if (fetchPTHoursSuccess.match(action)) {
        return {...state, ptHours: action.payload}
    }
    if (setCalendarSurgeonOption.match(action)) {
        return {...state, calendarSurgeonOption: action.payload}
    }
    if (setCalendarRoomOption.match(action)) {
        return {...state, calendarRoomOption: action.payload}
    }
    return state;
}
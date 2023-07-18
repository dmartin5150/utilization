import { CalendarDayData } from "../../components/calendar/calendarDay";
import { setCalendarData } from "./actions/calendar.actions";
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
import { fetchRoomLists,setRoomLists, setActiveRoomList, 
    setAllRoomsSelected } from "./actions/roomsListActions";
import { setSurgeonLists, setActiveSurgeonList,setAllSurgeonsSelected,  } from "./actions/surgeonLists.actions";
import {  PT_Hours, SurgeryInfo } from "./ordata.types";
import { fetchPTHoursSuccess } from "./actions/pthours.action";
import { JRIroomList } from "../Facility/facility.types";
import { CalendarMenuOptions } from "../../pages/utilization/utilization.constants";
import { SurgeonList,SurgeonLists } from "./ordata.types";
import { SummaryGridRowData } from "../../components/summary-grid/summary-grid-row";
import { setGridData } from "./actions/grid.actions";
import { DetailsWithBlock } from "./ordata.types";
import { setCalendarTotals } from "./actions/calendar.actions";
import { setUpdateWithGroup, setGroupId } from "./actions/ordata.actions";
import { setUnitRoomList } from "./actions/roomsListActions";
import { setSurgeonUnitList } from "./actions/surgeonLists.actions";



export type ORDataState = {
    calendarData: CalendarDayData[];
    calendarTotals: CalendarDayData[];
    gridData: SummaryGridRowData[];
    detailsData: DetailsWithBlock;
    unitRoomLists: UnitRoomLists;
    activeRoomList: UnitRoomListItem[];
    allRoomsSelected: boolean;
    surgeonLists: SurgeonLists;
    activeSurgeonList: SurgeonList[], 
    allSurgeonsSelected: boolean;
    calendarSurgeonOption: CalendarMenuOptions, 
    calendarRoomOption: CalendarMenuOptions, 
    updateWithGroup: boolean;
    groupId: string;
    isLoading:boolean;
    popOpen: boolean;
    ptHours: PT_Hours;

    error: null | Error
}


const PTHOURS_INITIAL_STATE: PT_Hours = {
    surgeryInfo: []
}

const DETAILS_INITIAL_STATE:DetailsWithBlock = {
    room:[],
    block:[]
}

const OR_DATA_INITIAL_STATE: ORDataState = {
    calendarData: [],
    calendarTotals: [],
    gridData: [],
    detailsData: DETAILS_INITIAL_STATE,
    unitRoomLists: {}, 
    activeRoomList: JRIroomList,
    allRoomsSelected:true,
    surgeonLists:{},
    activeSurgeonList:[],
    allSurgeonsSelected:true,
    calendarSurgeonOption: CalendarMenuOptions.All, 
    calendarRoomOption: CalendarMenuOptions.All,
    updateWithGroup: false,
    groupId: '0',
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
    if (setSurgeonUnitList.match(action)) {
        return {...state, surgeonLists:{...state.surgeonLists, [action.payload.key]: action.payload.list}}
    }
    if (fetchRoomLists.match(action)) {
        return {...state, unitRoomLists:action.payload}
    }
    if (setRoomLists.match(action)){
        return {...state, unitRoomLists:action.payload}
    }       
    if (setActiveRoomList.match(action)) {
        return {...state, activeRoomList: action.payload}
    }     

    if (setUnitRoomList.match(action)) {
        return {...state, unitRoomLists:{...state.unitRoomLists, [action.payload.key]:action.payload.list}}
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
    if (setCalendarData.match(action)) {
        return {...state, calendarData: action.payload}
    }
    if (setGridData.match(action)) {
        return {...state, gridData:action.payload}
    }
    if (setCalendarTotals.match(action)) {
        return {...state, calendarTotals: action.payload}
    }
    if (setUpdateWithGroup.match(action)) {
        return {...state, updateWithGroup:action.payload}
    }
    if (setGroupId.match(action)) {
        return {...state, groupId:action.payload}
    }
    return state;
}
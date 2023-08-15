import { CalendarDayData } from "../../components/calendar/calendarDay";
import { setCalendarData } from "./actions/calendar.actions";
import { SummaryGridData } from "../../components/summary-grid/summary-grid";
import { DetailsData } from "../../components/team-card/details-card";
import { AnyAction } from "redux";
import { getCalendarData, setCalendarSurgeonOption, setCalendarRoomOption} from "./actions/calendar.actions";
import { fetchGridSuccess} from "./actions/grid.actions";
import { fetchSurgeonListsSuccess} from "./actions/surgeonLists.actions";
import { fetchDetailsSuccess, closePopUp } from "./actions/details.actions";
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
import { fetchDetailsStart, fetchDetailsFailed } from "./actions/details.actions";
import { fetchGridStart,fetchGridFailed } from "./actions/grid.actions";
import { fetchPTHoursStart, fetchPTHoursFailed } from "./actions/pthours.action";
import { fetchSurgeonListsStart,fetchSurgeonListsFailed } from "./actions/surgeonLists.actions";
import { setDataStartDate,setDataEndDate, setDataCurrentDate  } from "./actions/calendar.actions";
import { setUtilSummaryOption } from "./actions/ordata.actions";
import { CalendarSummaryOptions } from "../../pages/utilization/utilization.constants";
import { DateRange } from "./ordata.types";
import { setSummaryDateRange } from "./actions/ordata.actions";
import { fetchSummaryTotalsStart,fetchSummaryTotalsSuccess,fetchSummaryTotalsFailed } from "./actions/pthours.action";








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
    utilSummaryOption:CalendarSummaryOptions,
    updateWithGroup: boolean;
    groupId: string;
    orDetailsLoading:boolean;
    orGridLoading:boolean;
    ptHoursLoading:boolean;
    surgeonListsLoading:boolean;
    dataStartDate:Date,
    dataEndDate:Date,
    dataCurentDate:Date,
    summaryDateRange:DateRange,
    summaryTotals:CalendarDayData[],
    summaryTotalsLoading:boolean,
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
    utilSummaryOption: CalendarSummaryOptions.Q4, 
    updateWithGroup: false,
    groupId: '0',
    orDetailsLoading:false,
    orGridLoading:false,
    ptHoursLoading:false,
    surgeonListsLoading:false,
    dataStartDate:new Date('2023-4-1'),
    dataEndDate:new Date('2023-9-1'),
    // dataCurentDate: new Date('2023-7-1'),
    dataCurentDate: new Date('2023-8-1'),
    summaryTotals: [],
    summaryTotalsLoading:false,
    summaryDateRange: {
        startDate: new Date('2023-4-1'),
        endDate: new Date('2023-6-30')
    },
    popOpen: false,
    ptHours:PTHOURS_INITIAL_STATE,
    error: null
}

export const ORDataReducer = (state=OR_DATA_INITIAL_STATE, action: AnyAction):ORDataState =>  {
    // console.log(action.type)
    if (getCalendarData.match(action)) {
        return { ...state, calendarData: action.payload}
    }
    if (fetchGridStart.match(action)){
        return {...state, orGridLoading:true, error:null}
    }
    if (fetchGridSuccess.match(action)) {
        return {...state, gridData:action.payload, orGridLoading:false, error:null}
    }
    if (fetchGridFailed.match(action)) {
        return {...state, error:action.payload, orGridLoading:false}
    }
    if (fetchDetailsStart.match(action)) {
        return {...state, orDetailsLoading:true, error:null}
    }
    if (fetchDetailsSuccess.match(action)) {
        return {...state, detailsData: action.payload, orDetailsLoading:false, popOpen:true, error:null}
    }
    if (fetchDetailsFailed.match(action)) {
        return {...state, error:action.payload, orDetailsLoading:false}
    }
    if (fetchSurgeonListsStart.match(action)) {
        return {...state, surgeonListsLoading:true, error:null}
    }
    if (fetchSurgeonListsSuccess.match(action)) {
        return {...state, surgeonLists:action.payload, surgeonListsLoading:false, error:null}
    }
    if (fetchSurgeonListsFailed.match(action)) {
        return {...state, error:action.payload, surgeonListsLoading:false}
    }
    if (setSurgeonUnitList.match(action)) {
        return {...state, surgeonLists:{...state.surgeonLists, [action.payload.key]: action.payload.list}}
    }
    if (fetchRoomLists.match(action)) {
        return {...state, unitRoomLists:action.payload}
    }

    if (fetchSummaryTotalsStart.match(action)) {
        return {...state, summaryTotalsLoading: true, error:null}
    }
    if (fetchSummaryTotalsSuccess.match(action)) {
        return {...state, summaryTotals: action.payload, summaryTotalsLoading: false, error:null }
    }
    if (fetchSummaryTotalsFailed.match(action)){
        return {...state, error: action.payload, summaryTotalsLoading:false}
    }
    if (setRoomLists.match(action)){
        return {...state, unitRoomLists:action.payload}
    }       
    if (setActiveRoomList.match(action)) {
        console.log('updating active room list')
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
    if (fetchPTHoursStart.match(action)) {
        return {...state, ptHoursLoading:true, error:null}
    }
    if (fetchPTHoursSuccess.match(action)) {
        return {...state, ptHours: action.payload, ptHoursLoading:false, error:null}
    }
    if (fetchPTHoursFailed.match(action)) {
        return {...state, error: action.payload, ptHoursLoading:false}
    }
    if (setCalendarSurgeonOption.match(action)) {
        return {...state, calendarSurgeonOption: action.payload}
    }
    if (setCalendarRoomOption.match(action)) {
        return {...state, calendarRoomOption: action.payload}
    }
    if (setUtilSummaryOption.match(action)) {
        return {...state, utilSummaryOption: action.payload}
    }
    if (setSummaryDateRange.match(action)) {
        return {...state, summaryDateRange: action.payload}
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
    if (setDataStartDate.match(action)){
        return {...state, dataStartDate: action.payload}
    }

    if (setDataEndDate.match(action)) {
        return {...state, dataEndDate: action.payload}
    }

    if (setDataCurrentDate.match(action)){
        return {...state, dataCurentDate: action.payload}
    }

    if (setGroupId.match(action)) {
        return {...state, groupId:action.payload}
    }
    return state;
}
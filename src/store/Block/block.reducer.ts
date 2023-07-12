import { AnyAction } from "redux";
import { BlockLists } from "./block.types";
import { fetchBlockStart,fetchBlockFailed,fetchBlockSuccess, setSelectedBlockDate,
        setSelectedBlockRoom, setBlockPopUpOpen, setBlockCalendarData, setBlockCalendarTotals } from "./block.actions";
import { CalendarDayData } from "../../components/calendar/calendarDay";

export type BlockState = {
    lists:BlockLists,
    calendarData: CalendarDayData[],
    calendarTotals: CalendarDayData[],
    isLoading:boolean,
    selectedBlockDate: string, 
    selectedBlockRoom: string,
    popUpOpen: boolean; 
    error: null | Error;
}





const BLOCK_INITIAL_STATE: BlockState = {
    lists:{
        grid: [],
        details: []
    },
    calendarData: [],
    calendarTotals: [],
    selectedBlockDate: '2023-07-12',
    selectedBlockRoom: 'BH JRI 08',
    popUpOpen:false, 
    isLoading:false,
    error:null
}


export const BlockReducer = (state=BLOCK_INITIAL_STATE, action: AnyAction):BlockState =>  {

    if (fetchBlockStart.match(action)) {
        return {...state, isLoading:true}
    }
    if (fetchBlockSuccess.match(action)) {
        return {...state, lists: {...state.lists,['grid']: action.payload.grid,['details']:action.payload.details },  isLoading:false}
    }
    if (fetchBlockFailed.match(action)) {
        return {...state, error: action.payload, isLoading:false}
    }
    if (setSelectedBlockDate.match(action)) {
        return {...state, selectedBlockDate:action.payload}
    }
    if (setSelectedBlockRoom.match(action)) {
        return {...state, selectedBlockRoom: action.payload}
    }
    if (setBlockPopUpOpen.match(action)) {
        return {...state, popUpOpen:action.payload}
    }
    if (setBlockCalendarData.match(action)) {
        return {...state, calendarData: action.payload}
    }
    if (setBlockCalendarTotals.match(action)) {
        return {...state, calendarTotals: action.payload}
    }

    return state;
}



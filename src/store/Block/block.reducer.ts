import { AnyAction } from "redux";
import { BlockLists } from "./block.types";
import { fetchBlockStart,fetchBlockFailed,fetchBlockSuccess, setSelectedBlockDate,
        setSelectedBlockRoom, setBlockPopUpOpen, setBlockCalendarData, setBlockCalendarTotals,
        setBlockCards, setBlockRoomOption, setBlockTypeOption } from "./block.actions";
import { CalendarDayData } from "../../components/calendar/calendarDay";
import { BlockDetailCard } from "../../components/blockdetails/blockDetailCards";

export type BlockState = {
    lists:BlockLists;
    calendarData: CalendarDayData[];
    calendarTotals: CalendarDayData[];
    blockCards: BlockDetailCard[];
    isLoading:boolean;
    selectedBlockDate: string; 
    selectedBlockRoom: string;
    blockRoomOption: string
    blockTypeOption:string;
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
    blockCards: [],
    selectedBlockDate: '2023-07-12',
    selectedBlockRoom: 'BH JRI 08',
    blockRoomOption: '1',
    blockTypeOption: '1',
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
    if(setBlockCards.match(action)) {
        return {...state, blockCards:action.payload}
    }
    if (setBlockRoomOption.match(action)) {
        return {...state, blockRoomOption:action.payload}
    }
    if (setBlockTypeOption.match(action)) {
        return {...state, blockTypeOption: action.payload}
    }

    return state;
}



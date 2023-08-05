import { AnyAction } from "redux";
import { BlockLists } from "./block.types";
import { fetchBlockStart,fetchBlockFailed,fetchBlockSuccess, setSelectedBlockDate,
        setSelectedBlockRoom, setBlockPopUpOpen, setBlockCalendarData, setBlockCalendarTotals,
        setBlockCards, setBlockRoomOption, setBlockTypeOption } from "./block.actions";
import { fetchBlockTotalsStart,fetchBlockTotalsFailed,fetchBlockTotalsSuccess } from "./block.actions";
import { CalendarDayData } from "../../components/calendar/calendarDay";
import { BlockDetailCard } from "../../components/blockdetails/blockDetailCards";

export type BlockState = {
    lists:BlockLists;
    calendarData: CalendarDayData[];
    calendarTotals: CalendarDayData[];
    blockTotals: CalendarDayData[];
    blockCards: BlockDetailCard[];
    blockIsLoading:boolean;
    selectedBlockDate: string; 
    selectedBlockRoom: string;
    blockRoomOption: string
    blockTypeOption:string;
    blockTotalsLoading:boolean;
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
    blockTotals: [],
    blockCards: [],
    selectedBlockDate: '2023-08-1',
    selectedBlockRoom: 'BH JRI 08',
    blockRoomOption: 'ALL',
    blockTypeOption: 'Surgeon',
    popUpOpen:false, 
    blockIsLoading:false,
    blockTotalsLoading:false,
    error:null
}


export const BlockReducer = (state=BLOCK_INITIAL_STATE, action: AnyAction):BlockState =>  {
    console.log('action type',action.type)
    if (fetchBlockStart.match(action)) {
        console.log('in start')
        return {...state, blockIsLoading:true}
    }

    if (fetchBlockTotalsStart.match(action)) {
        return {...state, blockTotalsLoading:true,error:null}
    }
    if (fetchBlockTotalsSuccess.match(action)) {
        return {...state, blockTotals: action.payload, blockTotalsLoading:false,error:null}
    }
    if (fetchBlockTotalsFailed.match(action)) {
        return {...state, error: action.payload, blockTotalsLoading:false}
    }


    if (fetchBlockSuccess.match(action)) {
  
        return {...state, lists: {...state.lists,['grid']: action.payload.grid,['details']:action.payload.details },  blockIsLoading:false,error:null}
    }
    if (fetchBlockFailed.match(action)) {
        return {...state, error: action.payload, blockIsLoading:false}
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



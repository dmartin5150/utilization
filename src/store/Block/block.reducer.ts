import { AnyAction } from "redux";
import { BlockLists } from "./block.types";
import { fetchBlockStart,fetchBlockFailed,fetchBlockSuccess, setSelectedBlockDate,
        setSelectedBlockRoom, setBlockPopUpOpen } from "./block.actions";

export type BlockState = {
    lists:BlockLists
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
    return state;
}



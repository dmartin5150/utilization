import { AnyAction } from "redux";
import { BlockLists } from "./block.types";
import { fetchBlockStart,fetchBlockFailed,fetchBlockSuccess } from "./block.actions";

export type BlockState = {
    lists:BlockLists
    isLoading:boolean,
    error: null | Error;
}





const BLOCK_INITIAL_STATE: BlockState = {
    lists:{
        grid: [],
        details: []
    },
    isLoading:false,
    error:null
}


export const BlockReducer = (state=BLOCK_INITIAL_STATE, action: AnyAction):BlockState =>  {

    if (fetchBlockStart.match(action)) {
        return {...state, isLoading:true}
    }
    if (fetchBlockSuccess.match(action)) {
        return {...state, ...state.lists, lists : action.payload,  isLoading:false}
    }
    if (fetchBlockFailed.match(action)) {
        return {...state, error: action.payload, isLoading:false}
    }
    return state;
}



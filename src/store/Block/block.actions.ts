import { createAction,ActionWithPayload,Action,  withMatcher } from "../../utilities/reducer/reducerutils";
import { AppDispatch } from "../store";
import { BLOCK_TYPES } from "./block.types";
import { BlockLists } from "./block.types";
import getBlockData from "../../utilities/fetchData/getBlockData";


export type FetchBlockStart =  Action<BLOCK_TYPES.FETCH_BLOCK_START>
export type FetchBlockSuccess = ActionWithPayload<BLOCK_TYPES.FETCH_BLOCK_SUCCESS,BlockLists>
export type FetchBlockFailed = ActionWithPayload<BLOCK_TYPES.FETCH_BLOCK_FAILED, Error>
export type SetSelectedBlockDate = ActionWithPayload<BLOCK_TYPES.SET_SELECTED_BLOCK_DATE,string>
export type SetSelectedBlockRoom = ActionWithPayload<BLOCK_TYPES.SET_SELECTED_BLOCK_ROOM,string>
export type SetBlockPopUpOpen = ActionWithPayload<BLOCK_TYPES.SET_BLOCK_POPUP_OPEN, boolean>



export const fetchBlockStart = withMatcher(():FetchBlockStart=> {
    return createAction(BLOCK_TYPES.FETCH_BLOCK_START)
})

export const fetchBlockSuccess = withMatcher((data:BlockLists):FetchBlockSuccess => {
    return createAction(BLOCK_TYPES.FETCH_BLOCK_SUCCESS, data)
})

export const fetchBlockFailed = withMatcher((error:Error):FetchBlockFailed => {
    return createAction(BLOCK_TYPES.FETCH_BLOCK_FAILED, error)
})

export const setSelectedBlockDate = withMatcher((date:string):SetSelectedBlockDate => {
    return createAction(BLOCK_TYPES.SET_SELECTED_BLOCK_DATE, date);
})

export const setSelectedBlockRoom = withMatcher((room:string):SetSelectedBlockRoom => {
    return createAction(BLOCK_TYPES.SET_SELECTED_BLOCK_ROOM, room)
})

export const setBlockPopUpOpen = withMatcher((popUpOpen:boolean):SetBlockPopUpOpen => {
    return createAction(BLOCK_TYPES.SET_BLOCK_POPUP_OPEN, popUpOpen)
})

// export const setSelectedRoomStatus = withMatcher((status:string):SetSelectedRoomStatus => {
//     return createAction(BLOCK_TYPES. )
// })


export const fetchBlockDataAsync = (unit:string, selectAll:boolean, startDate:string,selectedProviders:string[]) => {
    return async (dispatch: AppDispatch) => {
        dispatch(fetchBlockStart);
        try {
            const blockData = await getBlockData(unit,selectAll, startDate, selectedProviders);
            dispatch(fetchBlockSuccess(blockData))
        } catch (error) {
        dispatch(fetchBlockFailed(error as Error))
        }
    }
}
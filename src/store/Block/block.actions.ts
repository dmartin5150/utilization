import { createAction,ActionWithPayload,Action,  withMatcher } from "../../utilities/reducer/reducerutils";
import { AppDispatch } from "../store";
import { BLOCK_TYPES } from "./block.types";
import { BlockLists } from "./block.types";
import getBlockData from "../../utilities/fetchData/getBlockData";


export type FetchBlockStart =  Action<BLOCK_TYPES.FETCH_BLOCK_START>
export type FetchBlockSuccess = ActionWithPayload<BLOCK_TYPES.FETCH_BLOCK_SUCCESS,BlockLists>
export type FetchBlockFailed = ActionWithPayload<BLOCK_TYPES.FETCH_BLOCK_FAILED, Error>


export const fetchBlockStart = withMatcher(():FetchBlockStart=> {
    return createAction(BLOCK_TYPES.FETCH_BLOCK_START)
})

export const fetchBlockSuccess = withMatcher((data:BlockLists):FetchBlockSuccess => {
    return createAction(BLOCK_TYPES.FETCH_BLOCK_SUCCESS, data)
})

export const fetchBlockFailed = withMatcher((error:Error):FetchBlockFailed => {
    return createAction(BLOCK_TYPES.FETCH_BLOCK_FAILED, error)
})


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
import { createAction,ActionWithPayload,Action,  withMatcher } from "../../utilities/reducer/reducerutils";
import { AppDispatch } from "../store";
import { BLOCK_TYPES } from "./block.types";
import { BlockLists } from "./block.types";
import getBlockData from "../../utilities/fetchData/getBlockData";
import { CalendarDayData } from "../../components/calendar/calendarDay";
import { BlockDetailCard } from "../../components/blockdetails/blockDetailCards";
import { BlockTotalRequest } from "../ORData/ordata.types";
import getBlockTotals from "../../utilities/fetchData/getBlockTotals"


export type FetchBlockStart =  Action<BLOCK_TYPES.FETCH_BLOCK_START>
export type FetchBlockSuccess = ActionWithPayload<BLOCK_TYPES.FETCH_BLOCK_SUCCESS,BlockLists>
export type FetchBlockFailed = ActionWithPayload<BLOCK_TYPES.FETCH_BLOCK_FAILED, Error>
export type SetSelectedBlockDate = ActionWithPayload<BLOCK_TYPES.SET_SELECTED_BLOCK_DATE,string>
export type SetSelectedBlockRoom = ActionWithPayload<BLOCK_TYPES.SET_SELECTED_BLOCK_ROOM,string>
export type SetBlockPopUpOpen = ActionWithPayload<BLOCK_TYPES.SET_BLOCK_POPUP_OPEN, boolean>
export type SetBlockCalendarData = ActionWithPayload<BLOCK_TYPES.SET_CALENDAR_DATA, CalendarDayData[]>
export type SetBlockCalendarTotals = ActionWithPayload<BLOCK_TYPES.SET_CALENDAR_TOTALS, CalendarDayData[]>
export type SetBlockCards = ActionWithPayload<BLOCK_TYPES.SET_BLOCK_CARDS, BlockDetailCard[]>
export type SetBlockRoomOption = ActionWithPayload<BLOCK_TYPES.SET_BLOCK_ROOM_OPTION ,string>
export type SetBlockTypeOption = ActionWithPayload<BLOCK_TYPES.SET_BLOCK_TYPE_OPTION,string>
export type FetchBlockTotalsStart = Action<BLOCK_TYPES.FETCH_BLOCK_TOTALS_START>
export type FetchBlockTotalsSuccess = ActionWithPayload<BLOCK_TYPES.FETCH_BLOCK_TOTALS_SUCCESS,CalendarDayData[]>
export type FetchBlockTotalsFailed = ActionWithPayload<BLOCK_TYPES.FETCH_BLOCK_TOTALS_FAILED, Error>


export const fetchBlockStart = withMatcher(():FetchBlockStart=> {
    return createAction(BLOCK_TYPES.FETCH_BLOCK_START)
})

export const fetchBlockSuccess = withMatcher((data:BlockLists):FetchBlockSuccess => {
    return createAction(BLOCK_TYPES.FETCH_BLOCK_SUCCESS, data)
})

export const fetchBlockFailed = withMatcher((error:Error):FetchBlockFailed => {
    return createAction(BLOCK_TYPES.FETCH_BLOCK_FAILED, error)
})

export const fetchBlockTotalsStart = withMatcher(():FetchBlockTotalsStart => {
    return createAction(BLOCK_TYPES.FETCH_BLOCK_TOTALS_START)
})

export const fetchBlockTotalsSuccess = withMatcher((blockTotals:CalendarDayData[]):FetchBlockTotalsSuccess => {
    return createAction(BLOCK_TYPES.FETCH_BLOCK_TOTALS_SUCCESS, blockTotals)
})

export const fetchBlockTotalsFailed = withMatcher((error:Error):FetchBlockTotalsFailed => {
    return createAction(BLOCK_TYPES.FETCH_BLOCK_TOTALS_FAILED, error)
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

export const setBlockCalendarData = withMatcher((calendar:CalendarDayData[]):SetBlockCalendarData => {
    return createAction(BLOCK_TYPES.SET_CALENDAR_DATA, calendar)
})

export const setBlockCalendarTotals = withMatcher((calendar:CalendarDayData[]):SetBlockCalendarTotals => {
    return createAction(BLOCK_TYPES.SET_CALENDAR_TOTALS, calendar)
})
 
export const setBlockCards = withMatcher((blockCards:BlockDetailCard[]):SetBlockCards => {
    return createAction(BLOCK_TYPES.SET_BLOCK_CARDS, blockCards)
})

export const setBlockRoomOption = withMatcher((roomOption:string):SetBlockRoomOption => {
    return createAction(BLOCK_TYPES.SET_BLOCK_ROOM_OPTION, roomOption)
})

export const setBlockTypeOption = withMatcher((blockTypeOption:string):SetBlockTypeOption => {
    return createAction(BLOCK_TYPES.SET_BLOCK_TYPE_OPTION, blockTypeOption)
})


// export const setSelectedRoomStatus = withMatcher((status:string):SetSelectedRoomStatus => {
//     return createAction(BLOCK_TYPES. )
// })


export const fetchBlockDataAsync = (unit:string, selectAll:boolean, startDate:string,selectedProviders:string[]) => {
    return async (dispatch: AppDispatch) => {
        dispatch(fetchBlockStart());
        try {
            const blockData = await getBlockData(unit,selectAll, startDate, selectedProviders);
            dispatch(fetchBlockSuccess(blockData))
        } catch (error) {
        dispatch(fetchBlockFailed(error as Error))
        }
    }
}

export const fetchBlockTotalsAsync = (request:BlockTotalRequest) => {
    return async (dispatch: AppDispatch) => {
        dispatch(fetchBlockTotalsStart());
        try {
            const blockTotals = await getBlockTotals(request);
            dispatch(fetchBlockTotalsSuccess(blockTotals))
        } catch (error) {
        dispatch(fetchBlockTotalsFailed(error as Error))
        }
    }
}



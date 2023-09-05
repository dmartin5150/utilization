import { STATS_TYPES } from "./stats.types";
import { createAction,ActionWithPayload,Action,  withMatcher } from "../../utilities/reducer/reducerutils";
import { AppDispatch } from "../store";
import { StatSummaryResults } from "./stats.types";
import getStatSummary from "../../utilities/fetchData/getStatSummary";
import getRoomStats from "../../utilities/fetchData/getRoomStats";
import { RoomStats } from "./stats.types";



export type FetchStatsStart =  Action<STATS_TYPES.FETCH_STATS_START>
export type FetchStatsSuccess = ActionWithPayload<STATS_TYPES.FETCH_STATS_DATA_SUCCESS,StatSummaryResults >
export type FetchStatsFailed = ActionWithPayload<STATS_TYPES.FETCH_STATS_FAILED, Error>
export type SetStatSummary = ActionWithPayload<STATS_TYPES.SET_SUMMARY_RESULTS, StatSummaryResults>
export type FetchRoomStatsStart = Action<STATS_TYPES.FETCH_ROOM_START>
export type FetchRoomStatsSuccess = ActionWithPayload<STATS_TYPES.FETCH_ROOM_STATS_SUCCESS, RoomStats[]>
export type FecthcRoomStatsFailed = ActionWithPayload<STATS_TYPES.FETCH_ROOM_FAILED, Error>
export type SetRoomProcedures = ActionWithPayload<STATS_TYPES.SET_ROOM_PROCEDURES, string[]>




export const setRoomProcedures = withMatcher((procedures:string[]):SetRoomProcedures => {
    return createAction(STATS_TYPES.SET_ROOM_PROCEDURES, procedures)
})


export const fetchRoomStatsStart = withMatcher(():FetchRoomStatsStart => {
    return createAction(STATS_TYPES.FETCH_ROOM_START)
})

export const fetchRoomStatsSuccess = withMatcher((roomStats: RoomStats[]):FetchRoomStatsSuccess => {
    return createAction(STATS_TYPES.FETCH_ROOM_STATS_SUCCESS, roomStats)
})

export const fetchRoomStatsFailed = withMatcher((error:Error) => {
    return createAction(STATS_TYPES.FETCH_ROOM_FAILED, error)
})

export const fetchStatsStart = withMatcher((): FetchStatsStart=> {
    return createAction(STATS_TYPES.FETCH_STATS_START)
})

export const fetchStatsSuccess = withMatcher((summary:StatSummaryResults):FetchStatsSuccess => {
    return createAction(STATS_TYPES.FETCH_STATS_DATA_SUCCESS,summary)
})

export const fetchStatsFailed = withMatcher((error:Error): FetchStatsFailed => {
    return createAction(STATS_TYPES.FETCH_STATS_FAILED, error)
} )

export const setStatSummary = withMatcher((summary:StatSummaryResults):SetStatSummary => {
    return createAction(STATS_TYPES.SET_SUMMARY_RESULTS, summary)
})




export const fetchStatSummarySuccessAsync = (npi:string, unit:string, name:string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(fetchStatsStart);
        try {
            const stats = await getStatSummary(npi,unit, name);
            dispatch(fetchStatsSuccess(stats))
        }catch (error) {
            dispatch(fetchStatsFailed(error as Error))
        }
    }
}

export const fetchRoomStatsAsync = (unit:string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(fetchRoomStatsStart);
        try {
            const roomStats = await getRoomStats(unit);
            const procedures = roomStats.map((procedure) => procedure.procedureName)
            dispatch(fetchRoomStatsSuccess(roomStats))
            dispatch(setRoomProcedures(procedures))
        }catch (error) {
            dispatch(fetchRoomStatsFailed(error as Error))
        }
    }
}



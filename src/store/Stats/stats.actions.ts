import { STATS_TYPES } from "./stats.types";
import { createAction,ActionWithPayload,Action,  withMatcher } from "../../utilities/reducer/reducerutils";
import { AppDispatch } from "../store";
import { StatSummaryResults } from "./stats.types";
import getStatSummary from "../../utilities/fetchData/getStatSummary";



export type FetchStatsStart =  Action<STATS_TYPES.FETCH_STATS_START>
export type FetchStatsSuccess = ActionWithPayload<STATS_TYPES.FETCH_STATS_DATA_SUCCESS,StatSummaryResults >
export type FetchStatsFailed = ActionWithPayload<STATS_TYPES.FETCH_STATA_FAILED, Error>
export type SetStatSummary = ActionWithPayload<STATS_TYPES.SET_SUMMARY_RESULTS, StatSummaryResults>


export const fetchStatsStart = withMatcher((): FetchStatsStart=> {
    return createAction(STATS_TYPES.FETCH_STATS_START)
})

export const fetchStatsSuccess = withMatcher((summary:StatSummaryResults):FetchStatsSuccess => {
    return createAction(STATS_TYPES.FETCH_STATS_DATA_SUCCESS,summary)
})

export const fetchStatsFailed = withMatcher((error:Error): FetchStatsFailed => {
    return createAction(STATS_TYPES.FETCH_STATA_FAILED, error)
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



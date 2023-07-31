import { createAction,Action, ActionWithPayload, withMatcher } from "../../../utilities/reducer/reducerutils"
import { ORDATA_TYPES, PT_Hours } from "../ordata.types"
import { PrimeTime } from "../../Facility/facility.types"
import { AppDispatch } from "../../store"

import getPTHours from "../../../utilities/fetchData/getPTHours"
import { SummaryTotals } from "../ordata.types"


export type FetchPTHoursStart = Action<ORDATA_TYPES.FETCH_PT_HOURS_START>
export type FetchPTHoursSuccess = ActionWithPayload<ORDATA_TYPES.FETCH_PT_HOURS_SUCCESS, PT_Hours>
export type FetchPTHoursFailed = ActionWithPayload<ORDATA_TYPES.FETCH_PT_HOURS_FAILED,Error>
export type FetchSummaryTotalsStart = Action<ORDATA_TYPES.FETCH_SUMMARY_TOTALS_START>
export type FetchSummaryTotalsSuccess = ActionWithPayload<ORDATA_TYPES.FETCH_SUMMARY_TOTALS_SUCCESS,SummaryTotals>
export type FetchSummaryTotalsFailed = ActionWithPayload<ORDATA_TYPES.FETCH_SUMMAR_TOTALS_FAILED, Error>


export const fetchPTHoursStart = withMatcher(():FetchPTHoursStart => {
    return createAction(ORDATA_TYPES.FETCH_PT_HOURS_START)
})

export const fetchSummaryTotalsStart = withMatcher(():FetchSummaryTotalsStart => {
    return createAction(ORDATA_TYPES.FETCH_SUMMARY_TOTALS_START)
})

export const fetchPTHoursSuccess = withMatcher((ptHours:PT_Hours):FetchPTHoursSuccess => {
    return createAction(ORDATA_TYPES.FETCH_PT_HOURS_SUCCESS,ptHours)
})

export const fetchSummaryTotalsSuccess = withMatcher((totals:SummaryTotals):FetchSummaryTotalsSuccess => {
    return createAction(ORDATA_TYPES.FETCH_SUMMARY_TOTALS_SUCCESS, totals)
})

export const fetchPTHoursFailed = withMatcher((error:Error):FetchPTHoursFailed => {
    return createAction(ORDATA_TYPES.FETCH_PT_HOURS_FAILED,error)
})

export const fetchSummaryTotalsFailed = withMatcher((error:Error):FetchSummaryTotalsFailed => {
    return createAction(ORDATA_TYPES.FETCH_SUMMAR_TOTALS_FAILED, error)
})


export const fetchPTHourSuccessAsync = (primeTime:PrimeTime, unit:string, startDate: string) => {
    return async (dispatch: AppDispatch) => {
        console.log('calling pt hours', startDate)
        dispatch(fetchPTHoursStart());
        try {
            const ptHours = await getPTHours(primeTime, unit,startDate);
            dispatch(fetchPTHoursSuccess(ptHours))
        }catch (error) {
            dispatch(fetchPTHoursFailed(error as Error))
        }
    }
}


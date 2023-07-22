import { createAction,Action, ActionWithPayload, withMatcher } from "../../../utilities/reducer/reducerutils"
import { ORDATA_TYPES, PT_Hours } from "../ordata.types"
import { PrimeTime } from "../../Facility/facility.types"
import { AppDispatch } from "../../store"

import getPTHours from "../../../utilities/fetchData/getPTHours"


export type FetchPTHoursStart = Action<ORDATA_TYPES.FETCH_PT_HOURS_START>
export type FetchPTHoursSuccess = ActionWithPayload<ORDATA_TYPES.FETCH_PT_HOURS_SUCCESS, PT_Hours>
export type FetchPTHoursFailed = ActionWithPayload<ORDATA_TYPES.FETCH_PT_HOURS_FAILED,Error>


export const fetchPTHoursStart = withMatcher(():FetchPTHoursStart => {
    return createAction(ORDATA_TYPES.FETCH_PT_HOURS_START)
})
export const fetchPTHoursSuccess = withMatcher((ptHours:PT_Hours):FetchPTHoursSuccess => {
    return createAction(ORDATA_TYPES.FETCH_PT_HOURS_SUCCESS,ptHours)
})

export const fetchPTHoursFailed = withMatcher((error:Error):FetchPTHoursFailed => {
    return createAction(ORDATA_TYPES.FETCH_PT_HOURS_FAILED,error)
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


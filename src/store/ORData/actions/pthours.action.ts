import { createAction, ActionWithPayload, withMatcher } from "../../../utilities/reducer/reducerutils"
import { ORDATA_TYPES, PT_Hours } from "../ordata.types"
import { PrimeTime } from "../../Facility/facility.types"
import { AppDispatch } from "../../store"
import { fetchDataStart,fetchDataFailed } from "./ordata.actions"
import getPTHours from "../../../utilities/fetchData/getPTHours"

export type FetchPTHoursSuccess = ActionWithPayload<ORDATA_TYPES.FETCH_PT_HOURS_SUCCESS, PT_Hours>


export const fetchPTHoursSuccess = withMatcher((ptHours:PT_Hours):FetchPTHoursSuccess => {
    return createAction(ORDATA_TYPES.FETCH_PT_HOURS_SUCCESS,ptHours)
})


export const fetchPTHourSuccessAsync = (primeTime:PrimeTime, unit:string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(fetchDataStart);
        try {
            const ptHours = await getPTHours(primeTime, unit);
            dispatch(fetchPTHoursSuccess(ptHours))
        }catch (error) {
            dispatch(fetchDataFailed(error as Error))
        }
    }
}


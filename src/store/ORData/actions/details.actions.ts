import { createAction,Action,  ActionWithPayload, withMatcher } from "../../../utilities/reducer/reducerutils"
import getDetails from "../../../utilities/fetchData/getDetails"
import { AppDispatch } from "../../store"
import { ORDATA_TYPES } from "../ordata.types"
import { FacilityRoom } from "../../Facility/facitlity.reducer"
import { PrimeTime } from "../../Facility/facility.types"
import { DetailsWithBlock } from "../ordata.types"



export type FecthDetailsStart = Action<ORDATA_TYPES.FETCH_DETAILS_START>
export type FetchDetailsSuccess = ActionWithPayload<ORDATA_TYPES.FETCH_DETAILS_SUCCESS, DetailsWithBlock>
export type FetchDetailsFailed = ActionWithPayload<ORDATA_TYPES.FETCH_DETAILS_FAILED, Error>

export type ClosePopUp = Action<ORDATA_TYPES.CLOSE_POPUP>


export const fetchDetailsStart = withMatcher(():FecthDetailsStart => {
    return createAction(ORDATA_TYPES.FETCH_DETAILS_START);
})
export const fetchDetailsSuccess = withMatcher((data:DetailsWithBlock):FetchDetailsSuccess =>{
    return createAction(ORDATA_TYPES.FETCH_DETAILS_SUCCESS, data)
});

export const fetchDetailsFailed = withMatcher((error:Error):FetchDetailsFailed => {
    return createAction(ORDATA_TYPES.FETCH_DETAILS_FAILED, error)
})



export const closePopUp = withMatcher(():ClosePopUp => {
    return createAction(ORDATA_TYPES.CLOSE_POPUP);
})



export const fetchDetailDataAsync = (unit:string, date:string, room:FacilityRoom,primeTime:PrimeTime) => {
    return async (dispatch:AppDispatch) => {
        dispatch(fetchDetailsStart)
        try {
            const detailData = await getDetails(unit, date, room.name,primeTime );
            dispatch(fetchDetailsSuccess(detailData))
        } catch (error) {
            dispatch(fetchDetailsFailed(error as Error))
        }
    }
}
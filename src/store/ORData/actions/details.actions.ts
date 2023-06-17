import { createAction, ActionWithPayload, withMatcher } from "../../../utilities/reducer/reducerutils"
import getDetails from "../../../utilities/fetchData/getDetails"
import { AppDispatch } from "../../store"
import { fetchDataStart , fetchDataFailed } from "./ordata.actions"
import { ORDATA_TYPES } from "../ordata.types"
import { DetailsData } from "../../../components/team-card/details-card"


export type FetchDetailsSuccess = ActionWithPayload<ORDATA_TYPES.FETCH_DETAILS_SUCCESS, DetailsData[]>

export const fetchDetailsSuccess = withMatcher((data:DetailsData[]):FetchDetailsSuccess =>{
    return createAction(ORDATA_TYPES.FETCH_DETAILS_SUCCESS, data)
});


export const fetchDetailDataAsync = () => {
    return async (dispatch:AppDispatch) => {
        dispatch(fetchDataStart)
        try {
            const detailData = getDetails('BH JRI', '2023-06-01', 'BH JRI 02');
            dispatch(fetchDetailsSuccess)
        } catch (error) {
            dispatch(fetchDataFailed(error as Error))
        }
    }
}
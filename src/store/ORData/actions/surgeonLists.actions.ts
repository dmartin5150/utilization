import { ORDATA_TYPES } from "../ordata.types"
import { createAction, ActionWithPayload, Action, withMatcher } from "../../../utilities/reducer/reducerutils"
import { item } from "../ordata.types";
import { AppDispatch } from "../../store";
import { fetchDataStart, fetchDataFailed } from "./ordata.actions";
import { UnitRoomLists } from "../../../pages/settings/settings.constants";
import getSurgeonLists from "../../../utilities/fetchData/getSurgeonLists";

export type FetchSurgeonListsSuccess = ActionWithPayload<ORDATA_TYPES.FETCH_SURGEON_LISTS_SUCCESS, UnitRoomLists>


export const fetchSurgeonListsSuccess = withMatcher((data:UnitRoomLists):FetchSurgeonListsSuccess => {
    return createAction(ORDATA_TYPES.FETCH_SURGEON_LISTS_SUCCESS, data)
});


export const fetchSurgeonListsAsync = () => {
    return async(dispatch:AppDispatch) => {
        dispatch(fetchDataStart);
        try {
            const surgeonLists  = await getSurgeonLists();
            dispatch(fetchSurgeonListsSuccess(surgeonLists))
        } catch (error) {
            dispatch(fetchDataFailed(error as Error))
        }
    }
}
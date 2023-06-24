import { ORDATA_TYPES } from "../ordata.types"
import { createAction, ActionWithPayload, Action, withMatcher } from "../../../utilities/reducer/reducerutils"
import { item } from "../ordata.types";
import { AppDispatch } from "../../store";
import { fetchDataStart, fetchDataFailed } from "./ordata.actions";
import { UnitRoomLists, UnitRoomList } from "../../../pages/settings/settings.constants";
import getSurgeonLists from "../../../utilities/fetchData/getSurgeonLists";

export type FetchSurgeonListsSuccess = ActionWithPayload<ORDATA_TYPES.FETCH_SURGEON_LISTS_SUCCESS, UnitRoomLists>
export type SetSurgeonLists = ActionWithPayload<ORDATA_TYPES.SET_SURGEON_LISTS, UnitRoomLists>
export type SetActiveSurgeonList = ActionWithPayload<ORDATA_TYPES.SET_ACTIVE_SURGEON_LIST, UnitRoomList[]>



export const setSurgeonLists = withMatcher((roomLists:UnitRoomLists):SetSurgeonLists => {
    return createAction(ORDATA_TYPES.SET_SURGEON_LISTS, roomLists)
});


export const setActiveSurgeonList = withMatcher((roomList:UnitRoomList[]):SetActiveSurgeonList => {
    return createAction(ORDATA_TYPES.SET_ACTIVE_SURGEON_LIST, roomList)
});


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
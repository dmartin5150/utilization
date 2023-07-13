import { ORDATA_TYPES } from "../ordata.types"
import { createAction, ActionWithPayload, Action, withMatcher } from "../../../utilities/reducer/reducerutils"
import { item } from "../ordata.types";
import { AppDispatch } from "../../store";
import { fetchDataStart, fetchDataFailed } from "./ordata.actions";
import { UnitRoomLists, UnitRoomListItem } from "../../../pages/settings/settings.constants";
import getSurgeonLists from "../../../utilities/fetchData/getSurgeonLists";
import { selectAllRoomsSelected, selectAllSurgeonsSelected } from "../selectors/ordata.selector";
import { SurgeonList, SurgeonLists } from "../ordata.types";
export type FetchSurgeonListsSuccess = ActionWithPayload<ORDATA_TYPES.FETCH_SURGEON_LISTS_SUCCESS, SurgeonLists>
export type SetSurgeonLists = ActionWithPayload<ORDATA_TYPES.SET_SURGEON_LISTS, SurgeonLists>
export type SetActiveSurgeonList = ActionWithPayload<ORDATA_TYPES.SET_ACTIVE_SURGEON_LIST, SurgeonList[]>
export type SetAllSurgeonsSelected = ActionWithPayload<ORDATA_TYPES.SET_ALL_SURGEONS_SELECTED, boolean>;



export const setAllSurgeonsSelected = withMatcher((selected:boolean):SetAllSurgeonsSelected => {
    return createAction(ORDATA_TYPES.SET_ALL_SURGEONS_SELECTED, selected)
})


export const setSurgeonLists = withMatcher((roomLists:SurgeonLists):SetSurgeonLists => {
    return createAction(ORDATA_TYPES.SET_SURGEON_LISTS, roomLists)
});




export const setActiveSurgeonList = withMatcher((surgeonList:SurgeonList[]):SetActiveSurgeonList => {
    return createAction(ORDATA_TYPES.SET_ACTIVE_SURGEON_LIST, surgeonList)
});


export const fetchSurgeonListsSuccess = withMatcher((data:SurgeonLists):FetchSurgeonListsSuccess => {
    return createAction(ORDATA_TYPES.FETCH_SURGEON_LISTS_SUCCESS, data)
});

export const fetchSurgeonListsAsync = () => {
    return async(dispatch:AppDispatch) => {
        dispatch(fetchDataStart);
        try {
            const surgeonLists  = await getSurgeonLists();
            // console.log('surgeon Lists', surgeonLists)
            dispatch(fetchSurgeonListsSuccess(surgeonLists))
        } catch (error) {
            dispatch(fetchDataFailed(error as Error))
        }
    }
}
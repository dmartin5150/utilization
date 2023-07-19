import { ORDATA_TYPES } from "../ordata.types"
import { createAction, Action, ActionWithPayload, withMatcher } from "../../../utilities/reducer/reducerutils"
import { AppDispatch } from "../../store";
import getSurgeonLists from "../../../utilities/fetchData/getSurgeonLists";
import { SurgeonList, SurgeonLists } from "../ordata.types";
import { UpdatableSurgeonList } from "../ordata.types";

export type FetchSurgeonListsSuccess = ActionWithPayload<ORDATA_TYPES.FETCH_SURGEON_LISTS_SUCCESS, SurgeonLists>
export type SetSurgeonLists = ActionWithPayload<ORDATA_TYPES.SET_SURGEON_LISTS, SurgeonLists>
export type SetActiveSurgeonList = ActionWithPayload<ORDATA_TYPES.SET_ACTIVE_SURGEON_LIST, SurgeonList[]>
export type SetAllSurgeonsSelected = ActionWithPayload<ORDATA_TYPES.SET_ALL_SURGEONS_SELECTED, boolean>;
export type SetSurgeonUnitList = ActionWithPayload<ORDATA_TYPES.SET_SURGEON_UNIT_LIST, UpdatableSurgeonList>
export type FetchSurgeonListsStart = Action<ORDATA_TYPES.FETCH_SURGEON_LISTS_START>
export type FetchSurgeonListsFailed = ActionWithPayload<ORDATA_TYPES.FETCH_SURGEON_LISTS_FAILED,Error>




export const setSurgeonUnitList = withMatcher((surgeonList:UpdatableSurgeonList):SetSurgeonUnitList => {
    return createAction(ORDATA_TYPES.SET_SURGEON_UNIT_LIST, surgeonList)
})

export const setAllSurgeonsSelected = withMatcher((selected:boolean):SetAllSurgeonsSelected => {
    return createAction(ORDATA_TYPES.SET_ALL_SURGEONS_SELECTED, selected)
})


export const setSurgeonLists = withMatcher((roomLists:SurgeonLists):SetSurgeonLists => {
    return createAction(ORDATA_TYPES.SET_SURGEON_LISTS, roomLists)
});






export const setActiveSurgeonList = withMatcher((surgeonList:SurgeonList[]):SetActiveSurgeonList => {
    return createAction(ORDATA_TYPES.SET_ACTIVE_SURGEON_LIST, surgeonList)
});



export const fetchSurgeonListsStart = withMatcher(():FetchSurgeonListsStart => {
    return createAction(ORDATA_TYPES.FETCH_SURGEON_LISTS_START)
})

export const fetchSurgeonListsSuccess = withMatcher((data:SurgeonLists):FetchSurgeonListsSuccess => {
    return createAction(ORDATA_TYPES.FETCH_SURGEON_LISTS_SUCCESS, data)
})

export const fetchSurgeonListsFailed = withMatcher((error:Error): FetchSurgeonListsFailed=> {
    return createAction(ORDATA_TYPES.FETCH_SURGEON_LISTS_FAILED,error)
} )



export const fetchSurgeonListsAsync = () => {
    return async(dispatch:AppDispatch) => {
        dispatch(fetchSurgeonListsStart);
        try {
            const surgeonLists  = await getSurgeonLists();
            console.log('surgeon Lists', surgeonLists)
            dispatch(fetchSurgeonListsSuccess(surgeonLists))
        } catch (error) {
            dispatch(fetchSurgeonListsFailed(error as Error))
        }
    }
}
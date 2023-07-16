import { ORDATA_TYPES } from "../ordata.types"
import { createAction, ActionWithPayload, Action, withMatcher } from "../../../utilities/reducer/reducerutils"

export type FetchDataStart = Action<ORDATA_TYPES.FETCH_DATA_START>
export type FetchDataFailed = ActionWithPayload<ORDATA_TYPES.FETCH_DATA_FAILED, Error>
export type SetUpdateWithGroup = ActionWithPayload<ORDATA_TYPES.UPDATE_WITH_GROUP,boolean>
export type SetGroupID = ActionWithPayload<ORDATA_TYPES.SET_GROUP_ID, string>


export const fetchDataStart = withMatcher(():FetchDataStart => {
    return createAction(ORDATA_TYPES.FETCH_DATA_START)
});

export const fetchDataFailed = withMatcher((error:Error): FetchDataFailed => {
    return createAction(ORDATA_TYPES.FETCH_DATA_FAILED, error)
});

export const setUpdateWithGroup = withMatcher((update:boolean):SetUpdateWithGroup => {
    return createAction(ORDATA_TYPES.UPDATE_WITH_GROUP, update)
})

export const setGroupId = withMatcher((groupId:string):SetGroupID => {
    return createAction(ORDATA_TYPES.SET_GROUP_ID, groupId)
})
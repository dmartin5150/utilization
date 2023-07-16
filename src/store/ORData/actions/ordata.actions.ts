import { ORDATA_TYPES } from "../ordata.types"
import { createAction, ActionWithPayload, Action, withMatcher } from "../../../utilities/reducer/reducerutils"

export type FetchDataStart = Action<ORDATA_TYPES.FETCH_DATA_START>
export type FetchDataFailed = ActionWithPayload<ORDATA_TYPES.FETCH_DATA_FAILED, Error>
export type SetGroupUnit = ActionWithPayload<ORDATA_TYPES.SET_GROUP_UNIT,string>
export type SetGroupID = ActionWithPayload<ORDATA_TYPES.SET_GROUP_ID, string>


export const fetchDataStart = withMatcher(():FetchDataStart => {
    return createAction(ORDATA_TYPES.FETCH_DATA_START)
});

export const fetchDataFailed = withMatcher((error:Error): FetchDataFailed => {
    return createAction(ORDATA_TYPES.FETCH_DATA_FAILED, error)
});

export const setGroupUnit = withMatcher((unit:string):SetGroupUnit => {
    return createAction(ORDATA_TYPES.SET_GROUP_UNIT, unit)
})

export const setGroupId = withMatcher((groupId:string):SetGroupID => {
    return createAction(ORDATA_TYPES.SET_GROUP_ID, groupId)
})
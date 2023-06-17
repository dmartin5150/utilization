import { ORDATA_TYPES } from "../ordata.types"
import { createAction, ActionWithPayload, Action, withMatcher } from "../../../utilities/reducer/reducerutils"

export type FetchDataStart = Action<ORDATA_TYPES.FETCH_DATA_START>
export type FetchDataFailed = ActionWithPayload<ORDATA_TYPES.FETCH_DATA_FAILED, Error>

export const fetchDataStart = withMatcher(():FetchDataStart => {
    return createAction(ORDATA_TYPES.FETCH_DATA_START)
});

export const fetchDataFailed = withMatcher((error:Error): FetchDataFailed => {
    return createAction(ORDATA_TYPES.FETCH_DATA_FAILED, error)
});
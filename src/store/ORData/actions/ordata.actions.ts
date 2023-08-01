import { ORDATA_TYPES } from "../ordata.types"
import { createAction, ActionWithPayload, Action, withMatcher } from "../../../utilities/reducer/reducerutils"
import { CalendarSummaryOptions } from "../../../pages/utilization/utilization.constants"
import { DateRange } from "../ordata.types"


// export type FetchDataStart = Action<ORDATA_TYPES.FETCH_DATA_START>
// export type FetchDataFailed = ActionWithPayload<ORDATA_TYPES.FETCH_DATA_FAILED, Error>
export type SetUpdateWithGroup = ActionWithPayload<ORDATA_TYPES.UPDATE_WITH_GROUP,boolean>
export type SetGroupID = ActionWithPayload<ORDATA_TYPES.SET_GROUP_ID, string>
export type SetUtilSummaryOption = ActionWithPayload<ORDATA_TYPES.SET_UTIL_SUMMARY_OPTION, CalendarSummaryOptions>
export type SetSummaryDateRange = ActionWithPayload<ORDATA_TYPES.SET_SUMMARY_DATE_RANGE, DateRange>




// export const fetchDataStart = withMatcher(():FetchDataStart => {
//     return createAction(ORDATA_TYPES.FETCH_DATA_START)
// });

// export const fetchDataFailed = withMatcher((error:Error): FetchDataFailed => {
//     return createAction(ORDATA_TYPES.FETCH_DATA_FAILED, error)
// });

export const setUpdateWithGroup = withMatcher((update:boolean):SetUpdateWithGroup => {
    return createAction(ORDATA_TYPES.UPDATE_WITH_GROUP, update)
})

export const setGroupId = withMatcher((groupId:string):SetGroupID => {
    return createAction(ORDATA_TYPES.SET_GROUP_ID, groupId)
})

export const setUtilSummaryOption = withMatcher((option:CalendarSummaryOptions):SetUtilSummaryOption => {
    return createAction(ORDATA_TYPES.SET_UTIL_SUMMARY_OPTION, option)
})

export const setSummaryDateRange = withMatcher((dateRange:DateRange):SetSummaryDateRange => {
    return createAction(ORDATA_TYPES.SET_SUMMARY_DATE_RANGE, dateRange)
})


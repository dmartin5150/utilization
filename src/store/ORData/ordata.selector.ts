import { RootState } from "../store"
import { createSelector } from "reselect";

const selectORDataReducer = (state:RootState) => state.ORData;

export const selectCalendarData = createSelector(
    [selectORDataReducer],
    (ORDataSlice) => ORDataSlice.calendarData
)

export const selectCalendarData1 = (state:RootState) => state.ORData.calendarData; 
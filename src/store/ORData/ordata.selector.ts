import { RootState } from "../store"
import { createSelector } from "reselect";

const selectORDataReducer = (state:RootState) => state.ORData;

export const selectCalendarData = createSelector(
    [selectORDataReducer],
    (ORDataSlice) => ORDataSlice.calendarData
)

export const selectGridData = createSelector(
    [selectORDataReducer],
    (ORDataSlice) => ORDataSlice.gridData
)

export const selectDetailData = createSelector(
    [selectORDataReducer],
    (ORDataSlice) => ORDataSlice.detailsData
);

export const selectPopUpIsOpen = createSelector(
    [selectORDataReducer],
    (ORDataSlice) => ORDataSlice.popOpen
)
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


export const selectSurgeonLists = createSelector(
    [selectORDataReducer],
    (ORDataSlice) => ORDataSlice.surgeonLists
)


export const selectPopUpIsOpen = createSelector(
    [selectORDataReducer],
    (ORDataSlice) => ORDataSlice.popOpen
)

export const selectUnitRoomLists = createSelector(
    [selectORDataReducer],
    (ORDataSlice) => ORDataSlice.unitRoomLists
)

export const selectActiveRoomLists = createSelector(
    [selectORDataReducer],
    (ORDataSlice)=> ORDataSlice.activeRoomList
)


export const selectActiveSurgeons = createSelector(
    [selectORDataReducer],
    (ORDataSlice) => ORDataSlice.activeSurgeonList
)
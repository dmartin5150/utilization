import { RootState } from "../store"
import { createSelector } from "reselect";
import { Calendar, Grid, Details} from "./ordata.types";

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

export const selectAllRoomsSelected = createSelector(
    [selectORDataReducer],
    (ORDataSlice) => ORDataSlice.allRoomsSelected
)

export const selectAllSurgeonsSelected = createSelector(
    [selectORDataReducer],
    (ORDataSlice) => ORDataSlice.allSurgeonsSelected
)

export const selectPTHours = createSelector(
    [selectORDataReducer],
    (ORDataSlice) => ORDataSlice.ptHours
)


export const selectSurgeryInfo = createSelector(
    [selectPTHours], 
    (PTHours) =>  {
        return PTHours.surgeryInfo
    }
)

export const selectCalendar = createSelector(
    [selectSurgeryInfo],
    (SurgeryInfo):Calendar[] => SurgeryInfo.map((info) => {
                return info.calendar
            })
)

export const selectGrid = createSelector(
    [selectSurgeryInfo],
    (SurgeryInfo):Grid[] => SurgeryInfo.map((info) => {
                return info.grid
            })
)


export const selectDetails = createSelector(
    [selectSurgeryInfo],
    (SurgeryInfo):Details[] => SurgeryInfo.map((info) => {
                return info.details
            })
)
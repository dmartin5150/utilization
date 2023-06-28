import { RootState } from "../store"
import { createSelector } from "reselect";
import { Calendar, Grid, Details} from "./ordata.types";
import { scryRenderedDOMComponentsWithClass } from "react-dom/test-utils";


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


export type PTHours = {
    date: string;
    ptHours: string[];
}


export const selectCalendarPTHoursAll = createSelector(
    [selectCalendar],
    (CalendarInfo):PTHours[] => {
        const uniqueDates = [...new Set(CalendarInfo.map(item => item.procedureDate))];
        const ptHoursTotal: any = []
        uniqueDates.forEach((curDate) => {
            const curData = CalendarInfo.filter(((item) => item.procedureDate === curDate))
            const ptHoursDay = curData.map((info) => info.prime_time_minutes)
            const curObj = {date: curDate, ptHours:ptHoursDay}
            ptHoursTotal.push(curObj)
        })
        return ptHoursTotal;
    })

    export const selectCalendarPTHoursTotals = createSelector(
        [selectCalendarPTHoursAll],
        (ptHours) => {
            const uniqueDates = [...new Set(ptHours.map(item => item.date))];
            const ptHoursTotal: any = []
            uniqueDates.forEach((curDate) => {
                const curData = ptHours.filter(((item) => item.date === curDate))
                const ptHoursDay = curData[0].ptHours.map((ptHour)=> parseInt(ptHour));
                const totalHours = ptHoursDay.reduce((acc, totalHours) => 
                    acc + totalHours
                ,0)
                const curObj = {date: curDate, ptHours:totalHours}
                ptHoursTotal.push(curObj)
            })
            return ptHoursTotal;
        })




        
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
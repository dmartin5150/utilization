import { RootState } from "../store"
import { createSelector } from "reselect";
import { Calendar, Grid, Details} from "./ordata.types";
import { selectPTminutesperroom } from "../Facility/facility.selector";
import { UnitRoomListItem } from "../../pages/settings/settings.constants";

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
    curDate: string;
    ptHours: string[];
    nonptHours: string[];
}

export type PTTotalHours = {
    curDate: string;
    totalptHours:string;
    totalnonptHours:string;
    utilization: string;
}

const calculatePTHours = (calendarData:Calendar[]):PTHours[] => {
    const uniqueDates = [...new Set(calendarData.map(item => item.procedureDate))];
    const ptHoursTotal: any = []
    uniqueDates.forEach((curDate) => {
        const curData = calendarData.filter(((item) => item.procedureDate === curDate))
        const ptHours = curData.map((info) => info.prime_time_minutes)
        const nonptHours = curData.map((info)=> info.non_prime_time_minutes)
        const curObj = {curDate, ptHours, nonptHours}
        ptHoursTotal.push(curObj)
    })
    return ptHoursTotal;
}


const minutestohours = (time:number):string  => {
var num = time;
var hours = (time / 60);
var rhours = Math.floor(hours);
var minutes = (hours - rhours) * 60;
var rminutes = Math.round(minutes);
return rhours + " H: " + rminutes + " M";
}



function compare( a:PTTotalHours, b:PTTotalHours ):number {
    if ( a.curDate < b.curDate ){
      return -1;
    }
    if ( a.curDate > b.curDate ){
      return 1;
    }
    return 0;
  }


const calculatPTTotalHours = (ptHours:PTHours[], ptMinutesPerRoom:number,rooms:UnitRoomListItem[]):PTTotalHours[] => {
    const uniqueDates = [...new Set(ptHours.map(item => item.curDate))];
    const ptHoursTotal: any = []
    const num_rooms = rooms.length;
    const totalPrimeTimeMinutes = num_rooms*ptMinutesPerRoom;
    uniqueDates.forEach((curDate) => {
        const curData = ptHours.filter(((item) => item.curDate === curDate))
        const ptHoursDay = curData[0].ptHours.map((ptHour)=> parseInt(ptHour));
        const nonptHoursDay = curData[0].nonptHours.map((nonptHour) => parseInt(nonptHour))
        const totalptMinutesUsed = ptHoursDay.reduce((acc, totalHours) => 
            acc + totalHours
        ,0)
        const totalptHours = minutestohours(totalptMinutesUsed )
        const utilization = Math.round(totalptMinutesUsed/totalPrimeTimeMinutes*100).toString() + '%'
        const totalnonptHours = minutestohours(nonptHoursDay.reduce((acc, totalHours) => 
            acc + totalHours
        ,0))
        const curObj:PTTotalHours = {curDate, totalptHours,totalnonptHours, utilization}

        ptHoursTotal.push(curObj)
    })
    ptHoursTotal.sort(compare)
    return ptHoursTotal;
}



export const selectCalendarPTHoursAll = createSelector(
    [selectCalendar],
    (calendarData):PTHours[] => calculatePTHours(calendarData))

export const selectCalendarPTHoursTotals = createSelector(
    [selectCalendarPTHoursAll, selectPTminutesperroom,selectActiveRoomLists],
    (ptHours,minutes,rooms):PTTotalHours[] => calculatPTTotalHours(ptHours, minutes,rooms) )



    
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
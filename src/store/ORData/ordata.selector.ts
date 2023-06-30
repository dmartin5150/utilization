import { RootState } from "../store"
import { createSelector } from "reselect";
import { Calendar, Grid, Details} from "./ordata.types";
import { selectPTminutesperroom } from "../Facility/facility.selector";



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

export const selectCalendarSurgeonOption = createSelector(
    [selectORDataReducer],
    (ORDataSlice)=> ORDataSlice.calendarSurgeonOption
)

export const selectCalendarRoomOption = createSelector(
    [selectORDataReducer],
    (ORDataSlice)=> ORDataSlice.calendarRoomOption
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

export const selectActiveRoomNames = createSelector(
    [selectActiveRoomLists],
    (ORRoomList):string[] => { 
        const selectedList = ORRoomList.filter((room) => room.selected);
        return selectedList.map((room)=> room.name)
        }
)




export const selectActiveSurgeons = createSelector(
    [selectORDataReducer],
    (ORDataSlice) => ORDataSlice.activeSurgeonList
)

export const selectActiveSurgeonNPIs = createSelector(
    [selectActiveSurgeons],
    (ActiveSurgeonList):string[] => {
        const selectedList = ActiveSurgeonList.filter((surgeon)=> surgeon.selected);
        return selectedList.map((surgeon) => surgeon.npi)
    }
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
    npis: string[];
    rooms: string[];
    ptHours: string[];
    nonptHours: string[];
}

export type PTTotalHours = {
    curDate: string;
    totalptHours:string;
    totalnonptHours:string;
    utilization: string;
}


const getPTHoursFilteredbyRoom = (rooms:string[], calendarData:Calendar[]) => {

    const filteredCalendar:Calendar[] = []
    for (const room of rooms) {
        for (const calendar of calendarData) {
            if (calendar.room === room) {
                // console.log('pushing data')
                filteredCalendar.push(calendar)
                continue
            }
        }
    }
    // console.log('filtered data', filteredCalendar)
    return filteredCalendar;

}

const getPTHoursFilterdbyNPI = (npis:string[], calendarData:Calendar[])  =>{
    const filteredCalendar:Calendar[] = []
    for (const npi of npis) {
        for (const calendar of calendarData) {
            if (calendar.NPI === npi) {
                // console.log('pushing data')
                filteredCalendar.push(calendar)
                continue
            }
        }
    }
    // console.log('filtered data', filteredCalendar)
    return filteredCalendar;
}



const calculatePTHours = (
    calendarData:Calendar[], 
    roomList:string[],
    npiList:string[],
    filterRooms: boolean,
    filterNPI: boolean
    ):PTHours[] => {
    const uniqueDates = [...new Set(calendarData.map(item => item.procedureDate))];
    const ptHoursTotal: any = []
    uniqueDates.forEach((curDate) => {
        let curData = calendarData.filter(((item) => item.procedureDate === curDate))
        if (filterRooms) {
            curData = getPTHoursFilteredbyRoom(roomList, curData)
        }
        if (filterNPI) {
            curData = getPTHoursFilterdbyNPI(npiList, curData)
        }
        const ptHours = curData.map((info) => info.prime_time_minutes)
        const nonptHours = curData.map((info)=> info.non_prime_time_minutes)
        const npis = [...new Set(curData.map((info) => info.NPI))]
        const rooms = [...new Set(curData.map((info) => info.room))]
        const curObj = {curDate,npis,rooms, ptHours, nonptHours}
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






const calculatPTTotalHours = (
    ptHours:PTHours[], 
    ptMinutesPerRoom:number,
    rooms:string[],
    mixed:boolean):PTTotalHours[] => {
    const uniqueDates = [...new Set(ptHours.map(item => item.curDate))];
    const ptHoursTotal: any = []
    let num_rooms;

    uniqueDates.forEach((curDate) => {
        let curData = ptHours.filter(((item) => item.curDate === curDate))
        if (mixed) {
            num_rooms = curData[0].rooms.length
        } else {
            num_rooms = rooms.length;
        }
        const totalPrimeTimeMinutes = num_rooms*ptMinutesPerRoom;
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
    [selectCalendar,selectActiveRoomNames,selectActiveSurgeonNPIs],
    (calendarData,rooms,npis):PTHours[] => calculatePTHours(calendarData,rooms,npis,false,false))

export const selectCalendarPTHoursFilterRooms = createSelector(
    [selectCalendar,selectActiveRoomNames,selectActiveSurgeonNPIs],
    (calendarData,rooms,npis):PTHours[] => calculatePTHours(calendarData,rooms,npis,true,false))

export const selectCalendarPTHourFilterSurgeons = createSelector(
    [selectCalendar,selectActiveRoomNames,selectActiveSurgeonNPIs],
    (calendarData,rooms,npis):PTHours[] => calculatePTHours(calendarData,rooms,npis,false, true))

export const selectCalendarPTHourFilterBoth = createSelector(
    [selectCalendar,selectActiveRoomNames,selectActiveSurgeonNPIs],
    (calendarData,rooms,npis):PTHours[] => calculatePTHours(calendarData,rooms,npis,true, true))


export const selectPTHoursTotalsAll = createSelector(
    [selectCalendarPTHoursAll, selectPTminutesperroom,selectActiveRoomNames],
    (ptHours,minutes,rooms):PTTotalHours[] => calculatPTTotalHours(ptHours, minutes,rooms,false))

 
export const selectPTHoursTotalsAllSurgeonsSelected = createSelector(
    [selectCalendarPTHoursFilterRooms, selectPTminutesperroom,selectActiveRoomNames],
    (ptHours,minutes,rooms):PTTotalHours[] => calculatPTTotalHours(ptHours, minutes,rooms,false))

export const selectPTHoursTotalsAllRoomssSelected = createSelector(
    [selectCalendarPTHourFilterSurgeons, selectPTminutesperroom,selectActiveRoomNames],
    (ptHours,minutes,rooms):PTTotalHours[] => calculatPTTotalHours(ptHours, minutes,rooms,false))

export const selectPTHoursTotalsMixed = createSelector(
    [selectCalendarPTHourFilterSurgeons, selectPTminutesperroom,selectActiveRoomNames],
    (ptHours,minutes,rooms):PTTotalHours[] => calculatPTTotalHours(ptHours, minutes,rooms,true))




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
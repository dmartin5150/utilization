import { createSelector } from "reselect";
import { Calendar} from "../ordata.types";
import { selectPTminutesperroom } from "../../Facility/facility.selector";
import { selectCalendar,selectAllRoomNames, selectAllSurgeonNPIs, selectActiveRoomNames,
selectActiveSurgeonNPIs } from "./ordata.selector";
import { minutestohours } from "../ordata.utilities";

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
    // console.log('npis',npiList)
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
        let utilization = '0%';
        if (totalPrimeTimeMinutes > 0) {
            utilization = Math.round(totalptMinutesUsed/totalPrimeTimeMinutes*100).toString() + '%'
        } 
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
    [selectCalendar,selectAllRoomNames,selectAllSurgeonNPIs],
    (calendarData,rooms,npis):PTHours[] => calculatePTHours(calendarData,rooms,npis,false,false))

export const selectCalendarPTHoursFilterRooms = createSelector(
    [selectCalendar,selectActiveRoomNames,selectAllSurgeonNPIs],
    (calendarData,rooms,npis):PTHours[] => calculatePTHours(calendarData,rooms,npis,true,false))

export const selectCalendarPTHourFilterSurgeons = createSelector(
    [selectCalendar,selectAllRoomNames,selectActiveSurgeonNPIs],
    (calendarData,rooms,npis):PTHours[] => calculatePTHours(calendarData,rooms,npis,false, true))

export const selectCalendarPTHourFilterBoth = createSelector(
    [selectCalendar,selectActiveRoomNames,selectActiveSurgeonNPIs],
    (calendarData,rooms,npis):PTHours[] => calculatePTHours(calendarData,rooms,npis,true, true))


export const selectPTHoursTotalsAll = createSelector(
    [selectCalendarPTHoursAll, selectPTminutesperroom,selectAllRoomNames],
    (ptHours,minutes,rooms):PTTotalHours[] => calculatPTTotalHours(ptHours, minutes,rooms,false))

 
export const selectPTHoursTotalsAllSurgeonsSelected = createSelector(
    [selectCalendarPTHoursFilterRooms, selectPTminutesperroom,selectActiveRoomNames],
    (ptHours,minutes,rooms):PTTotalHours[] => calculatPTTotalHours(ptHours, minutes,rooms,false))

export const selectPTHoursTotalsAllRoomssSelected = createSelector(
    [selectCalendarPTHourFilterSurgeons, selectPTminutesperroom,selectAllRoomNames],
    (ptHours,minutes,rooms):PTTotalHours[] => calculatPTTotalHours(ptHours, minutes,rooms,false))

export const selectPTHoursTotalsBoth = createSelector(
    [selectCalendarPTHourFilterBoth , selectPTminutesperroom,selectActiveRoomNames],
    (ptHours,minutes,rooms):PTTotalHours[] => calculatPTTotalHours(ptHours, minutes,rooms,false))


export const selectPTHoursTotalsAllMixed = createSelector(
    [ selectCalendarPTHoursAll , selectPTminutesperroom,selectActiveRoomNames],
    (ptHours,minutes,rooms):PTTotalHours[] => calculatPTTotalHours(ptHours, minutes,rooms,true))

export const selectPTHoursTotalsMixed = createSelector(
    [ selectCalendarPTHourFilterSurgeons , selectPTminutesperroom,selectActiveRoomNames],
    (ptHours,minutes,rooms):PTTotalHours[] => calculatPTTotalHours(ptHours, minutes,rooms,true))
import { createSelector } from "reselect";
import { Calendar} from "../ordata.types";
import { selectPTminutesperroom } from "../../Facility/facility.selector";
import { selectCalendar,selectAllRoomNames, selectAllSurgeonNPIs, selectActiveRoomNames,
selectActiveSurgeonNPIs, selectCalendarData } from "./ordata.selector";
import { minutestohours } from "../ordata.utilities";
import { CalendarDayData } from "../../../components/calendar/calendarDay";
import { weekDays } from "../ordata.types";
import { compare } from "../ordata.utilities";

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
    dayOfWeek: number;
    ptMinutes:number;
    nonptMinutes:number;
    totalptMinutes:number;
}

export type hasRoom = {
    room: string;
} 


function getPTHoursFilteredbyRoom<T extends hasRoom> (rooms:string[], dataList:T[]) {

    const filteredData:T[] = []
    for (const room of rooms) {
        for (const data of dataList) {
            if (data.room === room) {
                // console.log('pushing data')
                filteredData.push(data)
                continue
            }
        }
    }
    // console.log('filtered data', filteredCalendar)
    return filteredData;
}

type hasNPI = {
    NPI: string;
}



export function getPTHoursFilterdbyNPI<T extends hasNPI> (npis:string[], calendarData:T[]) {
    const filteredData:T[] = []
    for (const npi of npis) {
        for (const calendar of calendarData) {
            if (calendar.NPI === npi) {
                // console.log('pushing data')
                filteredData.push(calendar)
                continue
            }
        }
    }
    // console.log('filtered data', filteredCalendar)
    return filteredData;
}




// const getPTHoursFilterdbyNPI = (npis:string[], calendarData:Calendar[])  =>{
//     const filteredCalendar:Calendar[] = []
//     for (const npi of npis) {
//         for (const calendar of calendarData) {
//             if (calendar.NPI === npi) {
//                 // console.log('pushing data')
//                 filteredCalendar.push(calendar)
//                 continue
//             }
//         }
//     }
//     // console.log('filtered data', filteredCalendar)
//     return filteredCalendar;
// }



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
            curData = getPTHoursFilterdbyNPI<Calendar>(npiList, curData)
        }
        const ptHours = curData.map((info) => info.prime_time_minutes)
        const nonptHours = curData.map((info)=> info.non_prime_time_minutes)
        // const ptMinutes = curData.map((info)=> parseInt(info.prime_time_minutes))
        // const nonptMinutes = curData.map((info) => parseInt(info.non_prime_time_minutes))
        // const dayOfWeek = curData.map((info) =>  new Date(curDate).getDay())
        const npis = [...new Set(curData.map((info) => info.NPI))]
        const rooms = [...new Set(curData.map((info) => info.room))]
        const curObj = {curDate,npis,rooms, ptHours, nonptHours}
        ptHoursTotal.push(curObj)
    })
    return ptHoursTotal;
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
        const totalptMinutes = num_rooms*ptMinutesPerRoom;
        const ptHoursDay = curData[0].ptHours.map((ptHour)=> parseInt(ptHour));
        const nonptHoursDay = curData[0].nonptHours.map((nonptHour) => parseInt(nonptHour))
        const ptMinutes = ptHoursDay.reduce((acc, totalHours) => 
            acc + totalHours
        ,0)
        const totalptHours = 'PT: ' + minutestohours(ptMinutes )
        let utilization = '0%';
        if (totalptMinutes > 0) {
            utilization = Math.round(ptMinutes/totalptMinutes*100).toString() + '%'
        } 
        const nonptMinutes = nonptHoursDay.reduce((acc, totalHours) => 
                            acc + totalHours,0);
        const totalnonptHours = 'nPT: '  +  minutestohours(nonptMinutes);  
        console.log('curDate', curDate,'converted', new Date(curDate + 'T00:00:00')) 
        const dayOfWeek = new Date(curDate + 'T00:00:00').getDay();      

        const curObj:PTTotalHours = {
            curDate, 
            totalptHours,
            totalnonptHours, 
            utilization,
            ptMinutes, 
            nonptMinutes,
            totalptMinutes,
            dayOfWeek}

        ptHoursTotal.push(curObj)
    })
    ptHoursTotal.sort(compare)
    return ptHoursTotal;
}
export const getArrayTotals = (numbers:number[]) =>{
    return numbers.reduce((acc, total) => total + acc, 0)
}


const calculateCalendarTotals = (calendarData:CalendarDayData[]) => {
    const calendarTotals:CalendarDayData[] = []
    weekDays.forEach((day) => {
        const currentData = calendarData.filter((date)=> date.dayOfWeek === day)
        const dailyptMinutes = currentData.map((date) => date.ptMinutes)
        const dailynonptMinutes = currentData.map((date) => date.nonptMinutes)
        const dailytotalptMinutes = currentData.map((date) => date.totalptMinutes)
        const ptMinutes = getArrayTotals(dailyptMinutes)
        const nonptMinutes = getArrayTotals(dailynonptMinutes)
        const totalptMinutes = getArrayTotals(dailytotalptMinutes)
        let utilization = '0%'
        if (totalptMinutes > 0) {
            utilization = Math.round(ptMinutes/totalptMinutes*100).toString() + '%'
        } 
        const dailyTotal:CalendarDayData = {
            date: 'Total', 
            display: utilization, 
            subHeading1:'PT: ' +  minutestohours(ptMinutes),
            subHeading2: 'nPT: ' + minutestohours(nonptMinutes),
            ptMinutes, 
            nonptMinutes,
            totalptMinutes,
            dayOfWeek:day,
        } 
        calendarTotals.push(dailyTotal)
    })
    return calendarTotals;
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


export const selectCalendarTotals = createSelector(
    [selectCalendarData],
    (calendarData):CalendarDayData[] =>  calculateCalendarTotals(calendarData)
)
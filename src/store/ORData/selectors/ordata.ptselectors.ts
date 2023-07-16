import { createSelector } from "reselect";
import { Calendar} from "../ordata.types";
import { selectPTminutesperroom } from "../../Facility/facility.selector";
import { selectCalendar,selectAllRoomNames, selectAllSurgeonNPIs, selectActiveRoomNames,
selectActiveSurgeonNPIs, selectCalendarData } from "./ordata.selector";
import { minutestohours } from "../ordata.utilities";
import { CalendarDayData } from "../../../components/calendar/calendarDay";
import { weekDays } from "../ordata.types";
import { compare } from "../ordata.utilities";
import { getRoomNames,getNPIs } from "./ordata.gridselectors";
import { selectActiveSurgeons, selectActiveRoomLists} from "./ordata.selector";
import { UnitRoomListItem } from "../../../pages/settings/settings.constants";
import { SurgeonList } from "../ordata.types";
import { selectCalendarSurgeonOption,selectCalendarRoomOption } from "./ordata.selector";
import { CalendarMenuItem, CalendarMenuOptions } from "../../../pages/utilization/utilization.constants";

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


















export const getArrayTotals = (numbers:number[]) =>{
    return numbers.reduce((acc, total) => total + acc, 0)
}


export const calculateCalendarTotals = (calendarData:CalendarDayData[]) => {
    const calendarTotals:CalendarDayData[] = []
    weekDays.forEach((day) => {
        const currentData = calendarData.filter((date)=> date.dayOfWeek === day)
        const dailyptMinutes = currentData.map((date) => date.ptMinutes)
        const dailynonptMinutes = currentData.map((date) => date.nonptMinutes)
        const dailytotalptMinutes = currentData.map((date) => date.totalptMinutes)
        const ptMinutes = getArrayTotals(dailyptMinutes)
        const nonptMinutes = getArrayTotals(dailynonptMinutes)
        const totalptMinutes = getArrayTotals(dailytotalptMinutes)
        let utilization:string;
        if (totalptMinutes === 0) {
            utilization = "None"
        } else {
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





const calculatePTHours = (
    calendarData:Calendar[],
    surgeons:SurgeonList[], 
    rooms: UnitRoomListItem[],
    surgeonOption:CalendarMenuOptions,
    roomOption:CalendarMenuOptions
    ):PTHours[] => {

    const uniqueDates = [...new Set(calendarData.map(item => item.procedureDate))];
    const ptHoursTotal: any = []
    const npiList = getNPIs(surgeons,surgeonOption)
    const roomList = getRoomNames(rooms, roomOption)
    uniqueDates.forEach((curDate) => {
        let curData = calendarData.filter(((item) => item.procedureDate === curDate))
        if (roomOption !== CalendarMenuOptions.All) {
            curData = getPTHoursFilteredbyRoom(roomList, curData)
        }
        if (surgeonOption !== CalendarMenuOptions.All) {
            curData = getPTHoursFilterdbyNPI<Calendar>(npiList, curData)
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



export const selectCalendarPTHoursAll = createSelector(
    [selectCalendar,selectActiveSurgeons,selectActiveRoomLists,selectCalendarSurgeonOption,selectCalendarRoomOption ],
    (calendarData,surgeons,rooms,surgeonOption,roomOption):PTHours[] => calculatePTHours(calendarData,surgeons,rooms,surgeonOption,roomOption))




const calculatePTTotalHours = (
    ptHours:PTHours[], 
    ptMinutesPerRoom:number,
    rooms:UnitRoomListItem[],
    roomOption:CalendarMenuOptions):PTTotalHours[] => {
    const uniqueDates = [...new Set(ptHours.map(item => item.curDate))];
    const ptHoursTotal: any = []
    let num_rooms;
    const roomNames = getRoomNames(rooms,roomOption)
    uniqueDates.forEach((curDate) => {
        let curData = ptHours.filter(((item) => item.curDate === curDate))
        if (roomOption === CalendarMenuOptions.Mixed) {
            num_rooms = curData[0].rooms.length
        } else {
            num_rooms = roomNames.length;
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
        // console.log('curDate', curDate,'converted', new Date(curDate + 'T00:00:00')) 
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



export const selectPTHoursTotalsAll = createSelector(
    [selectCalendarPTHoursAll, selectPTminutesperroom,selectActiveRoomLists,selectCalendarRoomOption],
    (ptHours,minutes,rooms,roomOption):PTTotalHours[] => calculatePTTotalHours(ptHours, minutes,rooms,roomOption))

 


export const selectCalendarTotals = createSelector(
    [selectCalendarData],
    (calendarData):CalendarDayData[] =>  calculateCalendarTotals(calendarData)
)
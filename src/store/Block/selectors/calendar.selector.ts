import { createSelector } from "reselect";
import { RootState } from "../../store";
import { BlockData } from "../block.types";
import { CalendarDayData } from "../../../components/calendar/calendarDay";
import { timeConvert } from "../utilities";
import { getBlockStats } from "../utilities";
import { DayUtilization } from "../block.types";
import { getArrayTotals } from "../../ORData/selectors/ordata.ptselectors";
import { minutestohours } from "../../ORData/ordata.utilities";
import { weekDays } from "../../ORData/ordata.types";
import { calculateCalendarTotals } from "../../ORData/selectors/ordata.ptselectors";


export const selectBlockReducer = (state:RootState) => state.Block;

export const selectBlockLists = createSelector(
    [selectBlockReducer],
    (ORBlockSlice) => ORBlockSlice.lists
)

export const selectBlockGrid = createSelector(
    [selectBlockLists],
    (ORBlockSlice) => ORBlockSlice.grid
)

export const selectBlockCalendarData = createSelector(
    [selectBlockReducer],
    (ORBlockSlice) => ORBlockSlice.calendarData
)

export const selectBlockCalendarTotals = createSelector(
    [selectBlockReducer],
    (ORBlockSlice) => ORBlockSlice.calendarTotals
)


export type hasDate = {
    date:string;
}

export function compare<T extends hasDate>( a:T, b:T ):number {
    if ( a.date < b.date ){
      return -1;
    }
    if ( a.date > b.date ){
      return 1;
    }
    return 0;
  }



const getBlockCalendarData = (blockData:BlockData[],type:string) => {
    const blockCalendar:CalendarDayData[] =[];
    let blockDates = blockData.map((item)=>item.blockDate);
    blockDates = [...new Set(blockDates)]
    blockDates.forEach((date) => {
        const weekday = new Date(date + 'T00:00:00').getDay()
        const blockDay = blockData.filter((day) => (day.blockDate === date) && (day.type === type));
        const blockStats = getBlockStats(blockDay);
        const newBlockDay:CalendarDayData = {
            date,
            display: blockStats.utilization,
            subHeading1: 'bt: ' + timeConvert(blockStats.btMinutes),
            subHeading2: 'nbt:' + timeConvert(blockStats.nbtMinutes),
            ptMinutes: blockStats.btMinutes,
            nonptMinutes: blockStats.nbtMinutes,
            totalptMinutes: blockStats.totalMinutes,
            dayOfWeek: weekday
        }
        blockCalendar.push(newBlockDay)
    })
    return blockCalendar.sort(compare)

} 



// const calculateCalendarTotals = (calendarData:CalendarDayData[]) => {
//     const calendarTotals:CalendarDayData[] = []
//     weekDays.forEach((day) => {
//         const currentData = calendarData.filter((date)=> date.dayOfWeek === day)
//         const dailyptMinutes = currentData.map((date) => date.ptMinutes)
//         const dailynonptMinutes = currentData.map((date) => date.nonptMinutes)
//         const dailytotalptMinutes = currentData.map((date) => date.totalptMinutes)
//         const ptMinutes = getArrayTotals(dailyptMinutes)
//         const nonptMinutes = getArrayTotals(dailynonptMinutes)
//         const totalptMinutes = getArrayTotals(dailytotalptMinutes)
//         let utilization = '0%'
//         if (totalptMinutes > 0) {
//             utilization = Math.round(ptMinutes/totalptMinutes*100).toString() + '%'
//         } 
//         const dailyTotal:CalendarDayData = {
//             date: 'Total', 
//             display: utilization, 
//             subHeading1:'PT: ' +  minutestohours(ptMinutes),
//             subHeading2: 'nPT: ' + minutestohours(nonptMinutes),
//             ptMinutes, 
//             nonptMinutes,
//             totalptMinutes,
//             dayOfWeek:day,
//         } 
//         calendarTotals.push(dailyTotal)
//     })
//     return calendarTotals;
// }



export const selectCalculatedTotals = createSelector(
    [selectBlockCalendarData],
    (calendarData):CalendarDayData[] =>  calculateCalendarTotals(calendarData)
)

export const selectAllBlockforCalendar = createSelector(
    [selectBlockGrid],
    (ORBlockSlice):CalendarDayData[] =>  getBlockCalendarData(ORBlockSlice,'ALL')
)

export const selectInBlockforCalendar = createSelector(
    [selectBlockGrid],
    (ORBlockSlice):CalendarDayData[] =>  getBlockCalendarData(ORBlockSlice,'IN')
)
export const selectOutBlockforCalendar = createSelector(
    [selectBlockGrid],
    (ORBlockSlice):CalendarDayData[] =>  getBlockCalendarData(ORBlockSlice,'OUT')
)


const getBlockDayUtilization = (blockData:BlockData[]):DayUtilization[] => {
    return blockData.map((data) => {
        return {'id':data.id,'date':data.blockDate, 'type':data.type, 'room':data.room, 'utilization':data.utilization}
    })
}



export const selectBlockDayUtilizations = createSelector(
    [selectBlockGrid],
    (ORBlockSlice):DayUtilization[] => getBlockDayUtilization(ORBlockSlice)
)








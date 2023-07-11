import { createSelector } from "reselect";
import { RootState } from "../../store";
import { BlockData } from "../block.types";
import { CalendarDayData } from "../../../components/calendar/calendarDay";
import { timeConvert } from "../utilities";
import { getBlockStats } from "../utilities";
import { selectBlockGrid } from "./grid.selector";


export const selectBlockReducer = (state:RootState) => state.Block;

export const selectBlockLists = createSelector(
    [selectBlockReducer],
    (ORBlockSlice) => ORBlockSlice.lists
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



const getBlockCalendarData = (blockData:BlockData[]) => {
    const blockCalendar:CalendarDayData[] =[];
    let blockDates = blockData.map((block)=> block.blockDate);
    blockDates = [...new Set(blockDates)]
    blockDates.forEach((date) => {
        const weekday = new Date(date + 'T00:00:00').getDay()
        const blockDay = blockData.filter((day) => day.blockDate == date);
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


export const selectBlockforCalendar = createSelector(
    [selectBlockGrid],
    (ORBlockSlice):CalendarDayData[] =>  getBlockCalendarData(ORBlockSlice)
)








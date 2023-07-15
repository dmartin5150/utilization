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

// export const selectSurgeonBlockCalendarData = createSelector(
//     [selectAllBlockCalendarData],
//     // (ORBlockSlice) => ORBlockSlice.calendarData.filter((data) => data.type)
// )

export const selectRoomOption = createSelector(
    [selectBlockReducer],
    (ORBlockSlice) => ORBlockSlice.blockRoomOption
)

export const selectBlockTypeOption = createSelector(
    [selectBlockReducer],
    (ORBlockSlice) => ORBlockSlice.blockTypeOption
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





const getBlockCalendarData = (blockData:BlockData[],roomOption:string,blockOption:string) => {
    const blockCalendar:CalendarDayData[] =[];
    let blockDates = blockData.map((item)=>item.blockDate);
    blockDates = [...new Set(blockDates)]
    blockDates.forEach((date) => {
        const weekday = new Date(date + 'T00:00:00').getDay()
        const blockDay = blockData.filter((day) => {
            // console.log('day',day)
            // console.log(roomOption)
            return (day.blockDate === date) && (day.type === roomOption) 
                                        && (day.blockType == blockOption)});
        const blockStats = getBlockStats(blockDay);
        let display:string;
        if (blockStats.totalMinutes === 0) {
            display ='None';
        } else {
            display = blockStats.utilization;
        }
        const newBlockDay:CalendarDayData = {
            date,
            display,
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



export const selectBlockCalendar = createSelector(
    [selectBlockGrid,selectRoomOption,selectBlockTypeOption],
    (ORBlockSlice,roomOption,blockOption):CalendarDayData[] =>  getBlockCalendarData(ORBlockSlice,roomOption,blockOption)
)

export const selectCalculatedTotals = createSelector(
    [selectBlockCalendar],
    (calendarData):CalendarDayData[] =>  calculateCalendarTotals(calendarData)
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








import { createSelector } from "reselect";
import { RootState } from "../store";
import { BlockData } from "./block.types";
import { CalendarDayData } from "../../components/calendar/calendarDay";
import { SummaryGridRowData } from "../../components/summary-grid/summary-grid-row";



const selectBlockReducer = (state:RootState) => state.Block;

export const selectBlockLists = createSelector(
    [selectBlockReducer],
    (ORBlockSlice) => ORBlockSlice.lists
)

export const selectBlockGrid = createSelector(
    [selectBlockLists],
    (ORBlockSlice) => ORBlockSlice.grid
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



 type BlockStats = {
    btMinutes: number,
    nbtMinutes: number,
    totalMinutes: number,
    utilization: string, 
 } 



 function timeConvert(n:number):string {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + "H: " + rminutes + "M";
    }
 

 const getBlockStats = (blockDay:BlockData[]):BlockStats => {
    const btMinutes = blockDay.map((day)=> parseInt(day.bt_minutes));
    const nbtMinutes = blockDay.map((day)=> parseInt(day.nbt_minutes));
    const allMinutes = blockDay.map((day)=> parseInt(day.total_minutes));
    const totalbtminutes = btMinutes.reduce((ac, total)=> ac + total, 0);
    const totalnbtminutes = nbtMinutes.reduce((ac,total)=> ac + total, 0);
    const totalMinutes = allMinutes.reduce((ac, total) => ac + total, 0);
    let utilization = '0%';
    if (totalMinutes > 0) {
        utilization = Math.round(totalbtminutes/totalMinutes*100).toString() + '%' 
    }
    const stats: BlockStats = {btMinutes:totalbtminutes, nbtMinutes:totalnbtminutes,totalMinutes, utilization}
    return stats
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


const getGridData = (blockroom: string, data:BlockData[]):SummaryGridRowData => {
    const blockStats = getBlockStats(data)
    const dailyGridRow:SummaryGridRowData = {
        id: blockroom,
        room: blockroom,
        utilization: blockStats.utilization,
        procedures: data.length.toString(),
        ptHours: 'bt: ' + timeConvert(blockStats.btMinutes),
        nptHours: 'nbt: ' + timeConvert(blockStats.nbtMinutes),
        block_status: '0'
    }
    return dailyGridRow
}


const getAllBlockforGrid = (blockData:BlockData[], selectAll: boolean, blockType:string):SummaryGridRowData[] => {
    const newGridDay:SummaryGridRowData[] = [];
    let blockDates = blockData.map((block)=> block.blockDate);
    let blockRooms = blockData.map((block) => block.room)

    blockDates = [...new Set(blockDates)]
    blockRooms = [...new Set(blockRooms)]
    blockDates.forEach((blockDay) => {
        blockRooms.forEach((blockroom) => {
            if (selectAll) {
                const dailyGrid = blockData.filter((block) => (block.blockDate == blockDay) && (block.room == blockroom))
                newGridDay.push(getGridData(blockroom, dailyGrid)) 
            }else {
                const dailyGrid = blockData.filter((block) => (block.blockDate == blockDay) && (block.room == blockroom)
                                            && (block.type == blockType))
                newGridDay.push(getGridData(blockroom, dailyGrid))           
            }
        })
    })
    return newGridDay
}


export const selectAllBlockforGrid = createSelector(
    [selectBlockGrid],
    (ORBlockSlice) =>  getAllBlockforGrid(ORBlockSlice, true, 'ALL')
)


export const selectInBlockforGrid = createSelector(
    [selectBlockGrid],
    (ORBlockSlice) =>  getAllBlockforGrid(ORBlockSlice, false, 'IN')
)

export const selectOutBlockforGrid = createSelector(
    [selectBlockGrid],
    (ORBlockSlice) =>  getAllBlockforGrid(ORBlockSlice, false, 'OUT')
)




















export const selectBlockDetails = createSelector(
    [selectBlockLists],
    (ORBlockSlice) => ORBlockSlice.details
)


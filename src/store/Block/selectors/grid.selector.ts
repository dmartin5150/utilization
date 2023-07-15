import { createSelector } from "reselect";
import { BlockData } from "../block.types";
import { SummaryGridRowData } from "../../../components/summary-grid/summary-grid-row";
import { getBlockStats} from "../utilities";
import { timeConvert } from "../utilities";
import { selectBlockLists } from "./calendar.selector";
import { selectBlockGrid } from "./calendar.selector";
import { selectBlockDate } from "./details.selector";
import { selectRoomOption,selectBlockTypeOption } from "./calendar.selector";



const getGridData = (blockroom: string, data:BlockData[]):SummaryGridRowData => {
    const gridData = data.filter((grid)=> grid.id != 'none')
    const blockStats = getBlockStats(gridData)
    const dailyGridRow:SummaryGridRowData = {
        id: blockroom,
        room: blockroom,
        utilization: blockStats.utilization,
        procedureTitle:'Total',
        procedures: timeConvert(blockStats.totalMinutes),
        ptHours: 'bt: ' + timeConvert(blockStats.btMinutes),
        nptHours: 'nbt: ' + timeConvert(blockStats.nbtMinutes),
        block_status: '0'
    }
    return dailyGridRow
}



export type hasId = {
    id:string;
}

export function compare<T extends hasId>( a:T, b:T ):number {
    if ( a.id < b.id ){
      return -1;
    }
    if ( a.id > b.id ){
      return 1;
    }
    return 0;
  }

const getAllBlockforGrid = (blockData:BlockData[],blockDate:string, roomOption:string,blockOption:string):SummaryGridRowData[] => {
    let newGridDay:SummaryGridRowData[] = [];
    let blockRooms = blockData.map((block) => block.room)
    blockRooms = [...new Set(blockRooms)]
        blockRooms.forEach((blockroom) => {
            let dailyGrid = blockData.filter((block) => (block.blockDate === blockDate) && 
                        (block.room === blockroom) && (block.type === roomOption) &&
                        (block.blockType == blockOption))
            newGridDay.push(getGridData(blockroom, dailyGrid))
        })
    newGridDay = newGridDay.filter((grid) => grid.procedures !== '0H: 0M')
    newGridDay = newGridDay.filter((grid) => grid.id !== 'none').sort(compare)
    return newGridDay
}





export const selectAllBlockforGrid = createSelector(
    [selectBlockGrid, selectBlockDate,selectRoomOption,selectBlockTypeOption],
    (ORBlockSlice,blockDate,roomOption,blockOption) =>  getAllBlockforGrid(ORBlockSlice, blockDate, roomOption,blockOption)
)



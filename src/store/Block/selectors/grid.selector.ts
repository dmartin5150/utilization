import { createSelector } from "reselect";
import { BlockData } from "../block.types";
import { SummaryGridRowData } from "../../../components/summary-grid/summary-grid-row";
import { getBlockStats} from "../utilities";
import { timeConvert } from "../utilities";
import { selectBlockLists } from "./calendar.selector";
import { selectBlockGrid } from "./calendar.selector";
import { selectBlockDate } from "./details.selector";




const getGridData = (blockroom: string, data:BlockData[]):SummaryGridRowData => {
    const gridData = data.filter((grid)=> grid.id != 'none')
    // console.log('filterd grid', gridData)
    const blockStats = getBlockStats(gridData)
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

const getAllBlockforGrid = (blockData:BlockData[],blockDate:string, selectAll: boolean, blockType:string):SummaryGridRowData[] => {
    let newGridDay:SummaryGridRowData[] = [];
    let blockRooms = blockData.map((block) => block.room)
    blockRooms = [...new Set(blockRooms)]
        blockRooms.forEach((blockroom) => {
            if (selectAll) {
                let dailyGrid = blockData.filter((block) => (block.blockDate === blockDate) && 
                        (block.room === blockroom) && (block.type === blockType))
                dailyGrid = dailyGrid.filter((grid)=> grid.id != 'none')
                console.log('daily grid', dailyGrid)
                newGridDay.push(getGridData(blockroom, dailyGrid))
            }else {
                let dailyGrid = blockData.filter((block) => (block.blockDate === blockDate) && (block.room === blockroom)
                                            && (block.type === blockType))
                dailyGrid = dailyGrid.filter((grid)=> grid.id != 'none')
                newGridDay.push(getGridData(blockroom, dailyGrid))           
            }
        })
    newGridDay = newGridDay.filter((grid) => ((grid.ptHours != 'bt: 0H: 0M') && (grid.nptHours != 'nbt: 0H: 0M')))
    newGridDay = newGridDay.filter((grid) => grid.id != 'none').sort(compare)
    console.log('new grid',newGridDay)
    return newGridDay
}





export const selectAllBlockforGrid = createSelector(
    [selectBlockGrid, selectBlockDate],
    (ORBlockSlice,blockDate) =>  getAllBlockforGrid(ORBlockSlice, blockDate, true, 'ALL')
)


export const selectInBlockforGrid = createSelector(
    [selectBlockGrid,selectBlockDate],
    (ORBlockSlice, blockDate) =>  getAllBlockforGrid(ORBlockSlice, blockDate,false, 'IN')
)

export const selectOutBlockforGrid = createSelector(
    [selectBlockGrid,selectBlockDate],
    (ORBlockSlice, blockDate) =>  getAllBlockforGrid(ORBlockSlice,blockDate, false, 'OUT')
)
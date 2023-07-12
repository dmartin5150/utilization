import { createSelector } from "reselect";
import { BlockData } from "../block.types";
import { SummaryGridRowData } from "../../../components/summary-grid/summary-grid-row";
import { getBlockStats} from "../utilities";
import { timeConvert } from "../utilities";
import { selectBlockLists } from "./calendar.selector";
import { selectBlockGrid } from "./calendar.selector";
import { selectBlockDate } from "./details.selector";




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


const getAllBlockforGrid = (blockData:BlockData[],blockDate:string, selectAll: boolean, blockType:string):SummaryGridRowData[] => {
    const newGridDay:SummaryGridRowData[] = [];
    let blockRooms = blockData.map((block) => block.room)
    blockRooms = [...new Set(blockRooms)]
        blockRooms.forEach((blockroom) => {
            if (selectAll) {
                let dailyGrid = blockData.filter((block) => (block.blockDate === blockDate) && 
                        (block.room === blockroom) && (block.id !== 'none') && (block.type === blockType))
                console.log('daily grid', dailyGrid)
                newGridDay.push(getGridData(blockroom, dailyGrid))
            }else {
                let dailyGrid = blockData.filter((block) => (block.blockDate === blockDate) && (block.room === blockroom)
                                            && (block.type === blockType) && (block.id !== 'none'))
                newGridDay.push(getGridData(blockroom, dailyGrid))           
            }
        })
    
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
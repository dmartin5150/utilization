import { createSelector } from "reselect";
import { BlockData } from "../block.types";
import { SummaryGridRowData } from "../../../components/summary-grid/summary-grid-row";
import { getBlockStats} from "../utilities";
import { timeConvert } from "../utilities";
import { selectBlockLists } from "./calendar.selector";
import { selectBlockGrid } from "./calendar.selector";






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
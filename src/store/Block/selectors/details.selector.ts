import { createSelector } from "reselect";

import { selectBlockLists } from "./calendar.selector";
import { BlockDetails, DetailsSubHeader } from "../block.types";
import { selectBlockReducer } from "./calendar.selector";
import { DetailsSummary,BlockProcedure } from "../block.types";





export const selectBlockDetails = createSelector(
    [selectBlockLists],
    (ORBlockSlice) => ORBlockSlice.details
)

export const selectBlockDate = createSelector(
    [selectBlockReducer],
    (ORBlockSlice) => ORBlockSlice.selectedBlockDate
)

export const selectBlockRoom = createSelector(
    [selectBlockReducer],
    (ORBlockSlice) => ORBlockSlice.selectedBlockRoom
)


const getBlockSubHeader = (blockWithId:BlockDetails):DetailsSubHeader => {
    return {name:blockWithId.blockName, startTime:blockWithId.start_time, endTime:blockWithId.end_time,
    releaseDate:blockWithId.releaseDate}
}


const getBlockDetailsDay = (details:BlockDetails[], blockDate:string,room:string, selectAll:boolean, blockType:string) => {
    const summary: DetailsSummary[] = [];
     const blockDay = details.filter((detail) => (detail.blockDate == blockDate) &&
                    detail.room == room)

    let blockIDs = blockDay.map((block)=> block.blockId)
    blockIDs = [...new Set(blockIDs)]
    blockIDs.forEach((blockId) => {
        const blocksWithId = blockDay.filter((block) => block.blockId == blockId)
        blocksWithId.forEach((blockWithId) => {
            const subHeader = getBlockSubHeader(blockWithId)
            if (selectAll) {
                const procs = blockWithId.procs
                summary.push({subHeader,procs})
            } else {
                const procs = blockWithId.procs.filter((proc)=> proc.type == blockType)
                summary.push({subHeader,procs})
            }
        })
    })
    return summary
}

export const selectAllBlockDetailsDay = createSelector(
    [selectBlockDetails,selectBlockDate, selectBlockRoom],
    (ORBlockSlice, blockDate,room):DetailsSummary[] => getBlockDetailsDay(ORBlockSlice, blockDate, room, true, 'ALL')
)

export const selectInBlockDetailsDay = createSelector(
    [selectBlockDetails,selectBlockDate, selectBlockRoom],
    (ORBlockSlice, blockDate,room):DetailsSummary[] => getBlockDetailsDay(ORBlockSlice, blockDate, room, false,'IN')
)

export const selectOutBlockDetailsDay = createSelector(
    [selectBlockDetails,selectBlockDate, selectBlockRoom],
    (ORBlockSlice, blockDate,room):DetailsSummary[] => getBlockDetailsDay(ORBlockSlice, blockDate, room, false, 'OUT')
)








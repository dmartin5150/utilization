import { createSelector } from "reselect";
import { RootState } from "../../store";
import { selectBlockLists } from "./calendar.selector";
import { BlockDetails, DetailsSubHeader } from "../block.types";
import { selectBlockReducer } from "./calendar.selector";
import { DetailsSummary } from "../block.types";
import { selectBlockDayUtilizations } from "./calendar.selector";
import { DayUtilization } from "../block.types";
import { BlockDetailHeader } from "../block.types";
import { selectRoomOption,selectBlockTypeOption } from "./calendar.selector";
import { BlockDetailCard } from "../../../components/blockdetails/blockDetailCards";





export const selectBlockDetails = createSelector(
    [selectBlockLists],
    (ORBlockSlice) => ORBlockSlice.details
)

export const selectBlockDate = createSelector(
    [selectBlockReducer],
    (ORBlockSlice) => ORBlockSlice.selectedBlockDate
)

export const selectBlockPopUpIsOpen = createSelector(
    [selectBlockReducer],
    (ORBlockSlice) => ORBlockSlice.popUpOpen
)

export const selectBlockRoom = createSelector(
    [selectBlockReducer],
    (ORBlockSlice) => ORBlockSlice.selectedBlockRoom
)

export const selectBlockCards = createSelector(
    [selectBlockReducer],
    (ORBlockSlice):BlockDetailCard[] => ORBlockSlice.blockCards  
)

const getBlockSubHeader = (blockWithId:BlockDetails):DetailsSubHeader => {
    return {name:blockWithId.blockName, startTime:blockWithId.start_time, endTime:blockWithId.end_time,
    releaseDate:blockWithId.releaseDate}
}


const getBlockDetailsDay = (details:BlockDetails[], blockDate:string,room:string,dayUtilization:DayUtilization[],roomOption:string,blockOption:string) => {
    const summary: DetailsSummary[] = [];
    // console.log('blockDate', blockDate)
     const blockDay = details.filter((detail) => (detail.blockDate === blockDate) &&
                    (detail.room === room) && (detail.blockType === blockOption))
    // console.log('blockDay', blockDay)
    const utilizationDay = dayUtilization.filter((day)=> (day.date === blockDate) && (day.room === room))

    let blockIDs = blockDay.map((block)=> block.blockId)
    blockIDs = [...new Set(blockIDs)]
    blockIDs.forEach((blockId) => {
        const blocksWithId = blockDay.filter((block) => block.blockId === blockId)
        blocksWithId.forEach((blockWithId) => {
            const utilizationData = utilizationDay.filter((day) => (day.id === blockId) && (day.type === roomOption) && (day.room === room))
            let utilization = '0%'
            if (utilizationData.length > 0) {
                utilization = utilizationData[0].utilization
            }
            // console.log('blocksWithId', blocksWithId)
            const header:BlockDetailHeader = {room, utilization,blockDate }
            const subHeader = getBlockSubHeader(blockWithId)
            if (roomOption === 'ALL') {
                const procs = blockWithId.procs
                // console.log('procs', procs)
                summary.push({header, subHeader,procs})
            } else {
                const procs = blockWithId.procs.filter((proc)=> proc.type === roomOption)
                // console.log('filtered procs', procs)
                summary.push({header, subHeader,procs})
                // console.log('summary', summary)
            }
        })
    })
    console.log('summary', summary)
    return summary
}




export const selectAllBlockDetailsDay = createSelector(
    [selectBlockDetails,selectBlockDate, selectBlockRoom,selectBlockDayUtilizations,selectRoomOption,selectBlockTypeOption],
    (ORBlockSlice, blockDate,room,dayUtilization,roomOption,blockOption):DetailsSummary[] => getBlockDetailsDay(ORBlockSlice, blockDate, room,dayUtilization,roomOption,blockOption)
)

// export const selectInBlockDetailsDay = createSelector(
//     [selectBlockDetails,selectBlockDate, selectBlockRoom,selectBlockDayUtilizations,selectRoomOption,selectBlockTypeOption],
//     (ORBlockSlice, blockDate,room,dayUtilization,roomOption,blockOption):DetailsSummary[] => getBlockDetailsDay(ORBlockSlice, blockDate, room,dayUtilization,roomOption,blockOption)
// )

// export const selectOutBlockDetailsDay = createSelector(
//     [selectBlockDetails,selectBlockDate, selectBlockRoom,selectBlockDayUtilizations,selectRoomOption,selectBlockTypeOption],
//     (ORBlockSlice, blockDate,room,dayUtilization,roomOption,blockOption):DetailsSummary[] => getBlockDetailsDay(ORBlockSlice, blockDate, room,dayUtilization, roomOption, blockOption)
// )








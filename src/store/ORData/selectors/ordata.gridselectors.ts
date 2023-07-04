import { createSelector } from "reselect";
import { selectDate } from "../../Facility/facility.selector";
import { selectGrid} from "./ordata.selector";
import { Grid } from "../ordata.types";
import { minutestohours } from "../ordata.utilities";
import { selectPTminutesperroom } from "../../Facility/facility.selector";
import { selectAllRoomNames, selectActiveRoomNames,selectAllSurgeonNPIs, selectActiveSurgeonNPIs } from "./ordata.selector";
import { getPTHoursFilterdbyNPI } from "./ordata.ptselectors";

export type GridPTHours = {
    date: string;
    room: string;
    ptHours:string;
    nonptHours:string;
    utilization:string;
    numProcedures: string;
    block_status:string;

}

const getEmptyRoom = (date:string, room:string) => {
    return {
        date: date, 
        room: room, 
        npi: '0',
        ptHours: 'PT: 0H 0M',
        nonptHours:'nPT: 0H 0M',
        utilization:'0%',
        numProcedures:'0',
        block_status:'0'


    } as GridPTHours
}


const createNoUtiliztionGridData = (date:string, rooms:string[]) => {
    const gridData:GridPTHours[] = [];
    let gridPTHours:GridPTHours;
    for (let room of rooms) {
        gridPTHours = getEmptyRoom(date,room);
        gridData.push(gridPTHours);
    }
    return gridData;
}


const calculateRoomUtilization = (
    grid:Grid[],
    date:string,
    npis:string[], 
    rooms:string[],
    availablePTMinutes:number,
    filterNPI: boolean) =>{
    const gridDataForDate: GridPTHours[] = [];
    let gridFilteredbyDate = grid.filter((gridData) => gridData.procedureDate === date);
    if (filterNPI) {
        gridFilteredbyDate = getPTHoursFilterdbyNPI<Grid>(npis, gridFilteredbyDate);
    }
    if (gridFilteredbyDate.length === 0 || availablePTMinutes === 0) {
        return  createNoUtiliztionGridData(date, rooms);
    } else {
        for (let room of rooms) {
            const gridFilteredbyRoom = gridFilteredbyDate.filter((grid) => grid.room === room);
            if (gridFilteredbyRoom.length === 0){
                gridDataForDate.push(getEmptyRoom(date, room));
                continue
            } 
            const numProcedures = gridFilteredbyRoom.length;
            const ptMinutes = gridFilteredbyRoom.map((gridData) => parseInt(gridData.prime_time_minutes))
            const nonptMinutes = gridFilteredbyRoom.map((gridData) => parseInt(gridData.non_prime_time_minutes))
            const totalptMinutes = ptMinutes.reduce ((acc, totalMinutes) => acc + totalMinutes, 0);
            const totalnonptMinutes = nonptMinutes.reduce((acc, totalMinutes) => acc + totalMinutes, 0);
            const utilization = Math.round((totalptMinutes/availablePTMinutes)*100);
            // can get first value as block status is same for every value in same room
            const block_status = gridFilteredbyRoom[0].block_status
            const gridPTHours:GridPTHours = {
                date:date,
                room: room, 
                ptHours:'PT: ' + minutestohours(totalptMinutes),
                nonptHours: 'nPT: ' + minutestohours(totalnonptMinutes),
                utilization: utilization.toString() + '%',
                numProcedures: numProcedures.toString(), 
                block_status: block_status.toString()

            }
            gridDataForDate.push(gridPTHours);
        }

    }
    return gridDataForDate;
}


export const selectGridDataAll = createSelector(
    [selectGrid, selectDate,selectAllSurgeonNPIs,selectAllRoomNames, selectPTminutesperroom],
    (ORGridData, selectedDate,npis,rooms,minutes):GridPTHours[] => calculateRoomUtilization(ORGridData,selectedDate,npis,rooms,minutes,false)
)

export const selectGridDataFilteredRooms = createSelector(
    [selectGrid, selectDate,selectAllSurgeonNPIs,selectActiveRoomNames, selectPTminutesperroom],
    (ORGridData, selectedDate,npis,rooms,minutes):GridPTHours[] => calculateRoomUtilization(ORGridData,selectedDate,npis,rooms,minutes,false)
)

export const selectGridDataFilteredNPIs = createSelector(
    [selectGrid, selectDate,selectActiveSurgeonNPIs,selectAllRoomNames, selectPTminutesperroom],
    (ORGridData, selectedDate,npis,rooms,minutes):GridPTHours[] => calculateRoomUtilization(ORGridData,selectedDate,npis,rooms,minutes,true)
)

export const selectGridDataFilteredBoth = createSelector(
    [selectGrid, selectDate,selectActiveSurgeonNPIs,selectActiveRoomNames, selectPTminutesperroom],
    (ORGridData, selectedDate,npis,rooms,minutes):GridPTHours[] => calculateRoomUtilization(ORGridData,selectedDate,npis,rooms,minutes,true)
)
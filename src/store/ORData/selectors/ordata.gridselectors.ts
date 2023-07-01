import { createSelector } from "reselect";
import { selectDate } from "../../Facility/facility.selector";
import { selectGrid} from "./ordata.selector";
import { selectAllRoomNames } from "./ordata.selector";
import { Grid } from "../ordata.types";
import { minutestohours } from "../ordata.utilities";
import { selectPTminutesperroom } from "../../Facility/facility.selector";


export type GridPTHours = {
    date: string;
    room: string;
    ptHours:string;
    nonptHours:string;
    utilization:string;
}

const getEmptyRoom = (date:string, room:string) => {
    return {
        date: date, 
        room: room, 
        ptHours: 'PT: 0H 0M',
        nonptHours:'nPT: 0H 0M',
        utilization:'0%'
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


const calculateRoomUtilization = (grid:Grid[],date:string, rooms:string[],availablePTMinutes:number) =>{
    const gridDataForDate: GridPTHours[] = [];
    const gridFilteredbyDate = grid.filter((gridData) => gridData.procedureDate === date)
    if (gridFilteredbyDate.length === 0 || availablePTMinutes === 0) {
        return  createNoUtiliztionGridData(date, rooms);
    } else {
        for (let room of rooms) {
            const gridFilteredbyRoom = gridFilteredbyDate.filter((grid) => grid.room === room);
            if (gridFilteredbyRoom.length === 0){
                gridDataForDate.push(getEmptyRoom(date, room));
                continue
            } 
            const ptMinutes = gridFilteredbyRoom.map((gridData) => parseInt(gridData.prime_time_minutes))
            const nonptMinutes = gridFilteredbyRoom.map((gridData) => parseInt(gridData.non_prime_time_minutes))
            const totalptMinutes = ptMinutes.reduce ((acc, totalMinutes) => acc + totalMinutes, 0);
            const totalnonptMinutes = nonptMinutes.reduce((acc, totalMinutes) => acc + totalMinutes, 0);

            const utilization = Math.round((totalptMinutes/availablePTMinutes)*100);
            const gridPTHours:GridPTHours = {
                date:date,
                room: room, 
                ptHours:'PT: ' + minutestohours(totalptMinutes),
                nonptHours: 'nPT: ' + minutestohours(totalnonptMinutes),
                utilization: utilization.toString() + '%'
            }
            gridDataForDate.push(gridPTHours);
        }

    }
    return gridDataForDate;
}



export const selectGridDataAll = createSelector(
    [selectGrid, selectDate,selectAllRoomNames, selectPTminutesperroom],
    (ORGridData, selectedDate,rooms,minutes):GridPTHours[] => calculateRoomUtilization(ORGridData,selectedDate, rooms,minutes)
)
import { createSelector } from "reselect";
import { selectDate } from "../../Facility/facility.selector";
import { selectGrid} from "./ordata.selector";
import { Grid, SurgeonList } from "../ordata.types";
import { minutestohours } from "../ordata.utilities";
import { selectPTminutesperroom } from "../../Facility/facility.selector";
import { selectAllRoomNames, selectActiveRoomNames,selectAllSurgeonNPIs, selectActiveSurgeonNPIs } from "./ordata.selector";
import { getPTHoursFilterdbyNPI } from "./ordata.ptselectors";
import { selectCalendarSurgeonOption,selectCalendarRoomOption } from "./ordata.selector";
import { CalendarMenuOptions } from "../../../pages/utilization/utilization.constants";
import { selectActiveSurgeons,selectActiveRoomLists } from "./ordata.selector";
import { UnitRoomListItem } from "../../../pages/settings/settings.constants";



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









export const getNPIs = (surgeons:SurgeonList[], surgeonOption:CalendarMenuOptions):string[] => {
    if (surgeonOption == CalendarMenuOptions.All) {
        return surgeons.map((surgeon) => surgeon.NPI)
    } else {
        const selectedSurgeons = surgeons.filter((surgeon)=> surgeon.selected);
        return selectedSurgeons.map((surgeon) => surgeon.NPI)
    }
}




export const getRoomNames = (rooms:UnitRoomListItem[], roomOption:CalendarMenuOptions):string[] => {
    if (roomOption === CalendarMenuOptions.All) {
        return rooms.map((room) => room.name)
    } else {
        const selectedRooms = rooms.filter((room) => room.selected);
        return selectedRooms.map((room) => room.name)
    }
}



const calculateRoomUtilization = (
    grid:Grid[],
    date:string,
    surgeons:SurgeonList[], 
    rooms:UnitRoomListItem[],
    availablePTMinutes:number,
    surgeonOption:CalendarMenuOptions,
    roomOption: CalendarMenuOptions) =>{
    const gridDataForDate: GridPTHours[] = [];

    const npis = getNPIs(surgeons, surgeonOption);
    const roomNames = getRoomNames(rooms, roomOption)
    let gridFilteredbyDate = grid.filter((gridData) => gridData.procedureDate === date);
    if (surgeonOption === CalendarMenuOptions.Selected) {
        gridFilteredbyDate = getPTHoursFilterdbyNPI<Grid>(npis, gridFilteredbyDate);
    }
    if (gridFilteredbyDate.length === 0 || availablePTMinutes === 0) {
        return  createNoUtiliztionGridData(date, roomNames);
    } else {
        for (let room of roomNames) {
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
    [selectGrid, selectDate,selectActiveSurgeons,selectActiveRoomLists, selectPTminutesperroom,selectCalendarSurgeonOption, selectCalendarRoomOption],
    (ORGridData, selectedDate,surgeons,rooms,minutes,surgeonOption,roomOption):GridPTHours[] => calculateRoomUtilization(ORGridData,selectedDate,surgeons,rooms,minutes,surgeonOption,roomOption)
)




// export const selectGridDataAll = createSelector(
//     [selectGrid, selectDate,selectAllSurgeonNPIs,selectAllRoomNames, selectPTminutesperroom],
//     (ORGridData, selectedDate,npis,rooms,minutes):GridPTHours[] => calculateRoomUtilization(ORGridData,selectedDate,npis,rooms,minutes,false)
// )

// export const selectGridDataFilteredRooms = createSelector(
//     [selectGrid, selectDate,selectAllSurgeonNPIs,selectActiveRoomNames, selectPTminutesperroom],
//     (ORGridData, selectedDate,npis,rooms,minutes):GridPTHours[] => calculateRoomUtilization(ORGridData,selectedDate,npis,rooms,minutes,false)
// )

// export const selectGridDataFilteredNPIs = createSelector(
//     [selectGrid, selectDate,selectActiveSurgeonNPIs,selectAllRoomNames, selectPTminutesperroom],
//     (ORGridData, selectedDate,npis,rooms,minutes):GridPTHours[] => calculateRoomUtilization(ORGridData,selectedDate,npis,rooms,minutes,true)
// )

// export const selectGridDataFilteredBoth = createSelector(
//     [selectGrid, selectDate,selectActiveSurgeonNPIs,selectActiveRoomNames, selectPTminutesperroom],
//     (ORGridData, selectedDate,npis,rooms,minutes):GridPTHours[] => calculateRoomUtilization(ORGridData,selectedDate,npis,rooms,minutes,true)
// )
import { AnyAction } from "redux";
import { FACILITY_UNITS } from "./facitlityUnits";
import { setUnit,setDate,setRoom } from "./facilty.actions";

export type FacilityDataState = {
    unit: string, 
    date: string,
    room: string
}

const FACILITY_DATA_INITIAL_STATE: FacilityDataState = {
    unit: 'BH JRI',
    date: '2023-06-01',
    room: 'BH JRI 02'
}

export const FacilityReducer = (state=FACILITY_DATA_INITIAL_STATE, action: AnyAction):FacilityDataState =>  {
    if (setUnit.match(action)) {
        return {...state, unit: action.payload}
    }
    if (setDate.match(action)){
        return {...state, date:action.payload}
    }
    if (setRoom.match(action)) {
        return {...state, room:action.payload}
    }
    return state;
}

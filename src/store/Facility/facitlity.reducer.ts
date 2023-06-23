import { AnyAction } from "redux";
import { FACILITY_UNITS } from "./facitlityUnits";
import { setUnit,setDate,setRoom, setPrimeTime, setDateRange } from "./facilty.actions";
import { PRIME_TIME_END, PRIME_TIME_START, PrimeTime,DateRange } from "./facility.types";


import { TNNASUNIT } from "./facility.types";

export type FacilityRoom = {
    name: string;
    utilization:string
}


export type FacilityDataState = {
    unit: string, 
    dateRange:DateRange, 
    date: string,
    room: FacilityRoom,
    primeTime:PrimeTime
}

const initialPrimeTime:PrimeTime = {
    start: PRIME_TIME_START["7:00 AM"],
    end: PRIME_TIME_END['3:30 PM']
}

const initialDateRange:DateRange = {
    start: new Date('6/1/2023'),
    end: new Date('6/30/2023')
}


const FACILITY_DATA_INITIAL_STATE: FacilityDataState = {
    unit: TNNASUNIT.BHJRI,
    date: '2023-06-01',
    dateRange:initialDateRange,
    room: {
        name:'',
        utilization:''
    },
    primeTime:initialPrimeTime
}

export const FacilityReducer = (state=FACILITY_DATA_INITIAL_STATE, action: AnyAction):FacilityDataState =>  {
    if (setUnit.match(action)) {
        return {...state, unit: action.payload}
    }
    if (setDate.match(action)){
        return {...state, date:action.payload}
    }
    if (setRoom.match(action)) {
        return {...state, room: action.payload}
    }
    if( setPrimeTime.match(action)) {
        return {...state, primeTime: action.payload}
    }
    if (setDateRange.match(action)) {
        return {...state, dateRange: action.payload}
    }
    return state;
}

import { AnyAction } from "redux";
import { FACILITY_UNITS } from "./facitlityUnits";
import { setUnit,setDate,setRoom, setPrimeTime, setCustomDateRange, setSelectedOpenTimeRoom } from "./facilty.actions";
import { fetchOpenTimeFailed,fetchOpenTimeStart,fetchOpenTimeSuccess,setSelectedTimeType,setOpenTimeDuration } from "./facilty.actions";
import { setOpenTimeCalendar,SetSelectedOpenTimeRoom } from "./facilty.actions";
import { PRIME_TIME_END, PRIME_TIME_START, PrimeTime,OpenTimes, OpenTimeTypes } from "./facility.types";
import { DateRange } from "../ORData/ordata.types";
import { CalendarDayData } from "../../components/calendar/calendarDay";

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
    primeTime:PrimeTime,
    openTimes: OpenTimes[],
    openTimeType:OpenTimeTypes,
    openTimeDuration: number,
    openTimeCalendar: CalendarDayData[],
    selectedRoom: string,
    isLoading:boolean,
    error:Error | null
}

const initialPrimeTime:PrimeTime = {
    start: PRIME_TIME_START["7:00"],
    end: PRIME_TIME_END['15:30']
}

const initialDateRange:DateRange = {
    startDate: new Date('6/1/2023'),
    endDate: new Date('6/30/2023')
}


const FACILITY_DATA_INITIAL_STATE: FacilityDataState = {
    unit: TNNASUNIT.BHJRI,
    date: '2023-06-01',
    dateRange:initialDateRange,
    room: {
        name:'',
        utilization:''
    },
    primeTime:initialPrimeTime,
    openTimes:[],
    openTimeType: OpenTimeTypes.block,
    openTimeDuration:0,
    openTimeCalendar:[],
    selectedRoom:'BH JRI 06',
    isLoading:false,
    error:null
}

export const FacilityReducer = (state=FACILITY_DATA_INITIAL_STATE, action: AnyAction):FacilityDataState =>  {

    if (fetchOpenTimeStart.match(action)) {
        return{...state, isLoading:true, error:null}
    }
    if (fetchOpenTimeSuccess.match(action)) {
        return {...state, openTimes:action.payload, isLoading:false}
    }
    if (fetchOpenTimeFailed.match(action)) {
        return {...state, error:action.payload, isLoading:false}
    }
    if (setSelectedTimeType.match(action)) {
        return {...state, openTimeType:action.payload}
    }
    if (setOpenTimeDuration.match(action)) {
        return {...state, openTimeDuration:action.payload}
    }
    if (setSelectedOpenTimeRoom.match(action)) {
        return {...state, selectedRoom:action.payload}
    }

    if (setOpenTimeCalendar.match(action)) {
        return {...state, openTimeCalendar: action.payload}
    }
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
    if (setCustomDateRange.match(action)) {
        return {...state, dateRange: action.payload}
    }
    return state;
}

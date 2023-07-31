import { DetailsData } from "../../components/team-card/details-card";
import { CalendarDayData } from "../../components/calendar/calendarDay";

export enum  ORDATA_TYPES {
    FETCH_DATA_START  = 'ordata/FETCH_CALENDAR_DATA_START',
    FETCH_DATA_FAILED  ='ordata/FETCH_CALENDAR_DATA_FAILED',
    GET_CALENDAR_DATA  ='ordata/FETCH_CALENDAR_DATA',
    SET_CALENDAR_DATA = 'ordata/SET_CALENDAR_DATA',
    SET_CALENDAR_TOTALS = 'ordata/SET_CALENDAR_TOTALS', 
    FETCH_GRID_START = 'ordata/SET_GRID_START',
    FETCH_GRID_DATA_SUCCESS  ='ordata/FETCH_GRID_DATA_SUCCESS',
    FETCH_GRID_DATA_FAILED = 'ordata/FETCH_GRID_DATA_FAILED', 
    SET_GRID_DATA ='ordata/SET_GRID_DATA',
    FETCH_DETAILS_START = 'ordata/SET_DETAILS_START', 
    FETCH_DETAILS_SUCCESS = 'ordata/FETCH_DETAILS_SUCCESS',
    FETCH_DETAILS_FAILED = 'ordata/FETCH_DETAILS_FAILED', 
    FETCH_SURGEON_LISTS_START = 'ordata/FETCH_SURGEON_LISTS_START',
    FETCH_SURGEON_LISTS_SUCCESS = 'ordata/FETCH_SURGEON_LISTS_SUCCESS',
    FETCH_SURGEON_LISTS_FAILED = 'ordata/FETCH_SURGEON_LISTS_FAILED',
    FETCH_ROOM_LISTS_SUCCESS = 'ordata/FETCH_ROOM_LISTS_SUCCESS',
    SET_ACTIVE_ROOM_LIST = 'ordata/SET_ACTIVE_ROOM_LIST', 
    SET_ACTIVE_SURGEON_LIST = 'ordata/SET_ACTIVE_SURGEON_LIST',
    SET_ROOM_LISTS = 'ordata/SET_ROOM_LISTS',
    SET_SURGEON_LISTS = 'ordata/SET_SURGEON_LISTS',
    SET_ALL_ROOMS_SELECTED = 'ordata/SET_ALL_ROOMS_SELECTED',
    SET_ALL_SURGEONS_SELECTED = 'orData/SET_ALL_SURGEONS_SELECTED',
    FETCH_PT_HOURS_START = 'ordata/FETCH_PT_HOURS_START',
    FETCH_PT_HOURS_SUCCESS = 'orData/FETCH_PT_HOURS_SUCCESS',
    FETCH_PT_HOURS_FAILED = 'ordate/FETCH_PT_HOURS_FAILED',
    SET_CALENDAR_SURGEON_OPTION = 'orData/SET_CALENDAR_SURGEON_OPTION',
    SET_CALENDAR_ROOM_OPTION = 'orData/SET_CALENDAR_ROOM_OPTION',
    UPDATE_WITH_GROUP = 'ordata/UPDATE_WITH_GROUP', 
    SET_GROUP_ID = 'order/SET_GROUP_ID',
    SET_ROOM_UNIT_LIST = 'ordata/SET_ROOM_UNIT_LIST',
    SET_SURGEON_UNIT_LIST = 'ordata/SET_SURGEON_UNIT_LIST',
    SET_DATA_START_DATE = '/facilty/DATA_START_DATE',
    SET_DATA_END_DATE = 'facility/DATA_END_DATE',
    SET_DATA_CURRENT_DATE = 'facility/DATA_CURRENT_DATE',
    SET_UTIL_SUMMARY_OPTION = 'facility/SET_UTIL_SUMMAR_OPTION',
    SET_SUMMARY_DATE_RANGE = 'facility/SET_SUMMARY_DATE_RANGE',
    CLOSE_POPUP = 'ordata/CLOSE_POPUP'
}





export enum WEEKDAYS  {
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY= 5
}

export const weekDays:WEEKDAYS[] = [
    WEEKDAYS.MONDAY, WEEKDAYS.TUESDAY,WEEKDAYS.WEDNESDAY,WEEKDAYS.THURSDAY,WEEKDAYS.FRIDAY]


export type DateRange ={
    startDate: Date,
    endDate: Date
}

export type item = {
    id: number;
    name: string;
    selected: boolean;
}

export type Calendar = {
    unit:string;
    NPI: string;
    room: string;
    procedureDate: string;
    prime_time_minutes:string;
    non_prime_time_minutes: string;
    utilization?: string;
    dayOfWeek:string;
}






export type Details = {
    fullName: string;
    local_start_time: string;
    local_end_time: string;
    procedureName: string;
    duration: string;
    block?: string[]
}

export type Grid = {
    unit: string;
    NPI:string;
    room: string;
    procedureDate: string;
    prime_time_minutes: string;
    non_prime_time_minutes: string;
    num_procedures?: number
    block_status:number

}


export type SurgeryInfo = {
    id: number;
    calendar: Calendar;
    grid: Grid;
    details:Details;
}

export type PT_Hours = {
    surgeryInfo: SurgeryInfo[];
}

export type SurgeonList = {
    id: number;
    name: string;
    NPI: string;
    selected: boolean;
}

export type SurgeonLists = {
    [key:string]: SurgeonList[];
}

export type UpdatableSurgeonList = {
    key: string,
    list: SurgeonList[]
}

export type UnitSurgeonList = {
    key: string,
    list: SurgeonList[]
}


export type BlockData = {
    name:string;
    startTime:string;
    endTime:string;
    releaseDate:string
}


export type DetailsWithBlock = {
    room:DetailsData[],
    block: BlockData[]
}
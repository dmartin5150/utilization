
export enum  ORDATA_TYPES {
    FETCH_DATA_START  = 'ordata/FETCH_CALENDAR_DATA_START',
    FETCH_DATA_FAILED  ='ordata/FETCH_CALENDAR_DATA_FAILED',
    FETCH_CALENDAR_DATA_SUCCESS  ='ordata/FETCH_CALENDAR_DATA_SUCCESS',
    FETCH_GRID_DATA_SUCCESS  ='ordata/FETCH_GRID_DATA_SUCCESS',
    FETCH_DETAILS_SUCCESS = 'ordata/FETCH_DETAILS_SUCCESS',
    FETCH_SURGEON_LISTS_SUCCESS = 'ordata/FETCH_SURGEON_LISTS_SUCCESS',
    FETCH_ROOM_LISTS_SUCCESS = 'ordata/FETCH_ROOM_LISTS_SUCCESS',
    SET_ACTIVE_ROOM_LIST = 'ordata/SET_ACTIVE_ROOM_LIST', 
    SET_ACTIVE_SURGEON_LIST = 'ordata/SET_ACTIVE_SURGEON_LIST',
    SET_ROOM_LISTS = 'ordata/SET_ROOM_LISTS',
    SET_SURGEON_LISTS = 'ordata/SET_SURGEON_LISTS',
    SET_ALL_ROOMS_SELECTED = 'ordata/SET_ALL_ROOMS_SELECTED',
    SET_ALL_SURGEONS_SELECTED = 'orData/SET_ALL_SURGEONS_SELECTED',
    FETCH_PT_HOURS_SUCCESS = 'orData/FETCH_PT_HOURS_SUCCESS', 
    CLOSE_POPUP = 'ordata/CLOSE_POPUP'
} 


export type item = {
    id: number;
    name: string;
    selected: boolean;
}

export type Calendar = {
    unit:string;
    NPI: string;
    procedureDate: string;
    prime_time_minutes:string;
    non_prime_time_minutes: string;
    utilization?: string;
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
    room: string;
    procedureDate: string;
    prime_time_minutes: string;
    non_prime_time_minutes: string;
    num_procedures?: number
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
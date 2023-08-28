import { UnitRoomListItem } from "../../pages/settings/settings.constants";

export enum FACILITY_TYPES {
    SELECT_UNIT = '/facility/SELECT_UNIT',
    SELECT_DATE = '/facilty/SELECT_DATE',
    SELECT_ROOM = '/facility/SELECT_ROOM',
    SET_PRIME_TIME = '/facility/SET_PRIME_TIME',
    SET_DATE_RANGE = '/facility/SET_DATE_RANGE',
    FETCH_OPEN_TIME_START = '/facility/FETCH_OPEN_TIME_START',
    FETCH_OPEN_TIME_SUCCESS = '/facility/FETCH_OPEN_TIME_SUCCESS',
    FETCH_OPEN_TIME_FAILED = '/facility/FETCH_OPEN_TIME_FAILED',
    SET_SELECTED_TIME_TYPE = 'facility/SET_SELECTED_TIME_TYPE',
    SET_OPEN_TIME_DURATION = 'facility/SET_OPEN_TIME_DURATION',
    SET_OPEN_TIME_CALENDAR = 'facility/SET_OPEN_TIME_CALENDAR',
    SET_SELECTED_OPEN_TIME_ROOM = 'facility/SET_SELECTED_OPEN_TIME_ROOM',
    SET_OPEN_TIME_ROOM_LIST = 'facility/SET_OPEN_TIME_ROOM_LIST',
    SET_SELECTED_OPEN_TIME_DATE = 'facility/SET_SELECTED_OPEN_TIME_DATE'
}

export enum TNNASUNIT  {
    BHJRI = 'BH JRI',
    STMSTOR = 'STM ST OR',
    STOR = 'MT OR',
    BHCSC = 'BH CSC',
    West = 'ST OR'
}


export enum PRIME_TIME_START {
    '6:30' = '6:30', 
    '7:00' = '7:00', 
    '7:30' = '7:30', 
    '8:00' = '8:00', 
    '8:30' = '8:30', 
    '9:00' = '9:00',
    '9:30' = '9:30'
}

export enum PRIME_TIME_END {
    '15:00' = '15:00', 
    '15:30' = '15:30', 
    '16:00' = '16:00', 
    '16:30' = '16:30', 
    '17:00' = '17:00', 
    '17:30'= '17:30', 
    '18:00'  ='18:00'
}


export type PrimeTime = {
    start: PRIME_TIME_START;
    end: PRIME_TIME_END;
}



export const CSCroomList:UnitRoomListItem[] = [
    {id:0, name: 'BH CSC 01', selected: true},
    {id:1, name:'BH CSC 02', selected: true},
    {id:3, name:'BH CSC 03', selected: true},
    {id:4, name:'BH CSC 04', selected: true},
    {id:5, name:'BH CSC 05', selected: true},
    {id:6, name:'BH CSC 06', selected: true},
    {id:7, name: 'BH CSC 07', selected: true},
    {id:8, name:'BH CSC 09', selected: true}
]


export const JRIroomList:UnitRoomListItem[] = [
    {id:0, name: 'BH JRI 02', selected: true},
    {id:1, name:'BH JRI 03', selected: true},
    {id:3, name:'BH JRI 04', selected: true},
    {id:4, name:'BH JRI 05', selected: true},
    {id:5, name:'BH JRI 06', selected: true},
    {id:6, name:'BH JRI 07', selected: true},
    {id:7, name: 'BH JRI 08', selected: true},
    {id:8, name:'BH JRI 09', selected: true}
]

export const STMSTORroomList:UnitRoomListItem[] = [
    {id:0, name: 'STM ST OR 01', selected: true},
    {id:1, name: 'STM ST OR 02', selected: true},
    {id:2, name: 'STM ST OR 03', selected: true},
    {id:3, name: 'STM ST OR 04', selected: true},
    {id:4, name: 'STM ST OR 05', selected: true},
    {id:5, name: 'STM ST OR 06', selected: true},
    {id:6, name: 'STM ST OR 07', selected: true},
    {id:7, name: 'STM ST OR 08', selected: true},
    {id:8, name: 'STM ST OR 09', selected: true},
    {id:9, name: 'STM ST OR 10', selected: true},
    {id:10, name: 'STM ST OR 11', selected: true},
    {id:11, name: 'STM ST OR 12', selected: true},
    {id:12, name: 'STM ST OR 14', selected: true},
    {id:13, name: 'STM ST OR 15', selected: true},
    {id:14, name: 'STM ST OR 16', selected: true},
    {id:15, name: 'STM ST OR 17', selected: true},
    {id:16, name: 'STM ST OR 18', selected: true},
    {id:17, name: 'STM ST OR Hybrid', selected: true},
]

export const STORroomList:UnitRoomListItem[] = [
    {id:0, name: 'ST OR 09', selected: true},
    {id:1, name: 'ST OR 10', selected: true},
    {id:2, name: 'ST OR 11', selected: true},
    {id:3, name: 'ST OR 12', selected: true},
    {id:4, name: 'ST OR 13', selected: true},
    {id:5, name: 'ST OR 14', selected: true},
    {id:6, name: 'ST OR 15', selected: true},
    {id:7, name: 'ST OR 16', selected: true},
    {id:8, name: 'ST OR 17', selected: true},
    {id:9, name: 'ST OR 18', selected: true},
    {id:10, name: 'ST OR 19', selected: true},
    {id:11, name: 'ST OR 20', selected: true},
    {id:12, name: 'ST OR 21', selected: true},
    {id:13, name: 'ST OR 22', selected: true},
    {id:14, name: 'ST OR 23', selected: true},
    {id:15, name: 'ST OR 24', selected: true},
    {id:16, name: 'ST OR 25', selected: true},
]

export const MTORroomList:UnitRoomListItem[] = [
    {id:0, name: 'MT Cysto', selected: true},
    {id:1, name: 'MT OR 01', selected: true},
    {id:3, name: 'MT OR 02', selected: true},
    {id:4, name: 'MT OR 03', selected: true},
    {id:5, name: 'MT OR 04', selected: true},
    {id:6, name: 'MT OR 05', selected: true},
    {id:7, name: 'MT OR 06', selected: true},
    {id:8, name: 'MT OR 07', selected: true},
    {id:9, name: 'MT OR 08', selected: true},
    {id:10, name: 'MT OR 09', selected: true},
    {id:11, name: 'MT OR 10', selected: true},
    {id:12, name: 'MT OR 11', selected: true},
    {id:13, name: 'MT OR 12', selected: true},
    {id:14, name: 'MT OR 14', selected: true},
    {id:15, name: 'MT OR 15', selected: true},
    {id:16, name: 'MT OR 16', selected: true},
    {id:17, name: 'MT OR 17', selected: true}
]


export enum OpenTimeTypes  {
    all = 'ALL',
    open ='OPEN',
    block = 'BLOCK',
    soft = 'SOFT'
}



export type OpenTimes = {
    name:string;
    proc_date:Date,
    local_start_time:string;
    local_end_time:string;
    unit:string;
    room:string;
    unused_block_minutes:number;
    formatted_minutes:string;
    open_type: OpenTimeTypes;
    release_date:string;
}




export type OpenTimeDisplayInfo = {
    room:string;
    name:string;
    local_start_time:string;
    local_end_time:string;
    formatted_minutes:string;
    release_date:string;
    open_type: OpenTimeTypes;
}


export type OpenTimeDisplayObject = {
    room: string;
    data: OpenTimeDisplayInfo[]
}


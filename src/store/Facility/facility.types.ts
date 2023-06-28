import { UnitRoomListItem } from "../../pages/settings/settings.constants";

export enum FACILITY_TYPES {
    SELECT_UNIT = '/facility/SELECT_UNIT',
    SELECT_DATE = '/facilty/SELECT_DATE',
    SELECT_ROOM = '/facility/SELECT_ROOM',
    SET_PRIME_TIME = '/facility/SET_PRIME_TIME',
    SET_DATE_RANGE = '/facility/SET_DATE_RANGE'
}


export enum TNNASUNIT  {
    BHJRI = 'BH JRI',
    STMSTOR = 'STM ST OR',
    STOR = 'MT OR' 
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
    start: PRIME_TIME_START,
    end: PRIME_TIME_END
}

export type DateRange = {
    start:Date;
    end: Date;
}



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
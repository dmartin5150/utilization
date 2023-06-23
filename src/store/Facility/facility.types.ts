export enum FACILITY_TYPES {
    SELECT_UNIT = '/facility/SELECT_UNIT',
    SELECT_DATE = '/facilty/SELECT_DATE',
    SELECT_ROOM = '/facility/SELECT_ROOM',
    SET_PRIME_TIME = '/facility/SET_PRIME_TIME'
}


export enum TNNASUNIT  {
    BHJRI = 'BH JRI',
    STMSTOR = 'STM ST OR',
    STOR = 'MT OR' 
}


export enum PRIME_TIME_START {
    '6:30 AM' = '6:30 AM', 
    '7:00 AM' = '7:00 AM', 
    '7:30 AM' = '7:30 AM', 
    '8:00 AM' = '8:00 AM', 
    '8:30 AM' = '8:30 AM', 
    '9:00 AM' = '9:00 AM',
    '9:30 AM' = '9:30 AM'
}

export enum PRIME_TIME_END {
    '3:00 PM' = '3:00 PM', 
    '3:30 PM' = '3:30 PM', 
    '4:00 PM' = '4:00 PM', 
    '4:30 PM' = '4:30 PM', 
    '5:00 PM' = '5:00 PM', 
    '5:30 PM'= '5:30 PM', 
    '6:00 PM'  ='6:00 PM'
}


export type PrimeTime = {
    start: PRIME_TIME_START,
    end: PRIME_TIME_END
}

export const JRIroomList = [
    {id:0, name: 'BH JRI 02', selected: true},
    {id:1, name:'BH JRI 03', selected: true},
    {id:3, name:'BH JRI 04', selected: true},
    {id:4, name:'BH JRI 05', selected: true},
    {id:5, name:'BH JRI 06', selected: true},
    {id:6, name:'BH JRI 07', selected: true},
    {id:7, name: 'BH JRI 08', selected: true},
    {id:8, name:'BH JRI 09', selected: true}
]

export const STMSTORroomList = [
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

export const MTORroomList = [
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
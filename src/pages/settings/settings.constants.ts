import { PrimeTimeMenuItem } from "./settings";

export enum TNNASUNIT  {
    BHJRI = 'BH JRI',
    STMSTOR = 'STM ST OR',
    STOR = 'MT OR' 
}

export type Unit = {
    id: number,
    name: TNNASUNIT;
    value: TNNASUNIT;
    label: TNNASUNIT;
}


export enum PRIME_TIME_START {
    T630 = '6:30 AM', 
    T700 = '7:00 AM', 
    T730 = '7:30 AM', 
    T800 = '8:00 AM', 
    T830 = '8:30 AM', 
    T900 = '9:00 AM', 
    T930  ='9:30 AM'
}


export enum PRIME_TIME_END {
    T300 = '3:00 PM', 
    T330 = '3:30 PM', 
    T400 = '4:00 PM', 
    T430 = '4:30 PM', 
    T500 = '5:00 PM', 
    T530 = '5:30 PM', 
    T600  ='6:00 PM'
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


export type UnitRoomList = {
    id: number;
    name: string;
    selected: boolean;
}

export interface UnitRoomLists {
    [key: string]: UnitRoomList[]
}

export const TNNASRoomList:UnitRoomLists = {
    [TNNASUNIT.BHJRI]: JRIroomList,
    [TNNASUNIT.STMSTOR]:STMSTORroomList,
    [TNNASUNIT.STOR]:MTORroomList
}





export const surgeonList = [
    {id:0, name: 'Martin', selected: true},
    {id:1, name: 'Mister', selected: false},
    {id:3, name:'marian', selected: true},
    {id:4, name:'Dr. 4', selected: true},
    {id:5, name:'Dr. 5', selected: true},
    {id:6, name:'Dr 6', selected: true},
    {id:7, name: 'Martin', selected: true},
    {id:8, name: 'Mister', selected: false},
    {id:9, name:'marian', selected: true},
    {id:10, name:'Dr. 4', selected: true},
    {id:11, name:'Dr. 5', selected: true},
    {id:12, name:'Dr 6', selected: true},
    {id:13, name: 'Martin', selected: true},
    {id:14, name: 'Mister', selected: false},
    {id:15, name:'marian', selected: true},
    {id:16, name:'Dr. 4', selected: true},
    {id:17, name:'Dr. 5', selected: true},
    {id:18, name:'Dr 6', selected: true},
]

export const unitList: Unit[] = [
    {id:0, name:TNNASUNIT.BHJRI, label:TNNASUNIT.BHJRI, value:TNNASUNIT.BHJRI},
    {id:1, name:TNNASUNIT.STOR, label:TNNASUNIT.STOR, value:TNNASUNIT.STOR},
    {id:2, name:TNNASUNIT.STMSTOR, label:TNNASUNIT.STMSTOR, value:TNNASUNIT.STMSTOR}
]


export const primeTimeStartOptions: PrimeTimeMenuItem[] = [
    {id:0, label: PRIME_TIME_START.T630, value:PRIME_TIME_START.T630},
    {id:1, label: PRIME_TIME_START.T700, value:PRIME_TIME_START.T700},
    {id:2, label: PRIME_TIME_START.T730, value:PRIME_TIME_START.T730},
    {id:3, label: PRIME_TIME_START.T800, value:PRIME_TIME_START.T800},
    {id:4, label: PRIME_TIME_START.T830, value:PRIME_TIME_START.T830},
    {id:5, label: PRIME_TIME_START.T900, value:PRIME_TIME_START.T900}
]


export const primeTimeEndOptions: PrimeTimeMenuItem[] =  [
    {id:0, label: PRIME_TIME_END.T300, value:PRIME_TIME_END.T300},
    {id:1, label: PRIME_TIME_END.T330, value:PRIME_TIME_END.T330},
    {id:2, label: PRIME_TIME_END.T400, value:PRIME_TIME_END.T400},
    {id:3, label: PRIME_TIME_END.T430, value:PRIME_TIME_END.T430},
    {id:4, label: PRIME_TIME_END.T500, value:PRIME_TIME_END.T500},
    {id:5, label: PRIME_TIME_END.T530, value:PRIME_TIME_END.T530},
]

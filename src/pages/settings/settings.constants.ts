import { PrimeTimeMenuItem } from "./settings";
import { TNNASUNIT } from "../../store/Facility/facility.types";
import { JRIroomList,STMSTORroomList, MTORroomList } from "../../store/Facility/facility.types";
import { PRIME_TIME_START,PRIME_TIME_END } from "../../store/Facility/facility.types";


export type Unit = {
    id: number,
    name: TNNASUNIT;
    value: TNNASUNIT;
    label: TNNASUNIT;
}


export interface UnitRoomListItem {
    id: number;
    name: string;
    selected: boolean;
}



export interface UnitRoomLists {
    [key: string]: UnitRoomListItem[]
}

export const TNNASRoomLists:UnitRoomLists = {
    [TNNASUNIT.BHJRI]: JRIroomList,
    [TNNASUNIT.STMSTOR]:STMSTORroomList,
    [TNNASUNIT.STOR]:MTORroomList
}


export const unitList: Unit[] = [
    {id:0, name:TNNASUNIT.BHJRI, label:TNNASUNIT.BHJRI, value:TNNASUNIT.BHJRI},
    {id:1, name:TNNASUNIT.STOR, label:TNNASUNIT.STOR, value:TNNASUNIT.STOR},
    {id:2, name:TNNASUNIT.STMSTOR, label:TNNASUNIT.STMSTOR, value:TNNASUNIT.STMSTOR}
]

export type UnitLists = {
    [key: string]: Unit;
}

export const unitLists:UnitLists = {
    'BH JRI' : unitList[0],
    'MT OR': unitList[1],
    'STM ST OR': unitList[2]
}

export const primeTimeStartOptions: PrimeTimeMenuItem[] = [
    {id:0, label: '6:30 AM', value:PRIME_TIME_START['6:30'],},
    {id:1, label: '7:00 AM', value:PRIME_TIME_START['7:00']},
    {id:2, label: '7:30 AM', value:PRIME_TIME_START['7:30']},
    {id:3, label: '8:00 AM', value:PRIME_TIME_START['8:00']},
    {id:4, label: '8:30 AM', value:PRIME_TIME_START['8:30']},
    {id:5, label: '9:00 AM', value:PRIME_TIME_START['9:00']},
    {id:6, label: '9:30 AM', value:PRIME_TIME_START['9:30']}
]

export const primeTimeEndOptions: PrimeTimeMenuItem[] =  [
    {id:0, label: '3:00 PM', value:PRIME_TIME_END['15:00']},
    {id:1, label: '3:30 PM', value:PRIME_TIME_END['15:30']},
    {id:2, label: '4:00 PM', value:PRIME_TIME_END['16:00']},
    {id:3, label: '4:30 PM', value:PRIME_TIME_END['16:30']},
    {id:4, label: '5:00 PM', value:PRIME_TIME_END['17:00']},
    {id:5, label: '5:30 PM', value:PRIME_TIME_END['17:30']},
    {id:6, label: '6:00 PM', value:PRIME_TIME_END['18:00']},
]



export const neuroSurgeonGroup = ['1346406956', '1710184130']

export const surgeonGroups = [neuroSurgeonGroup]
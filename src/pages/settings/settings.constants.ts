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


export const unitList: Unit[] = [
    {id:0, name:TNNASUNIT.BHJRI, label:TNNASUNIT.BHJRI, value:TNNASUNIT.BHJRI},
    {id:1, name:TNNASUNIT.STOR, label:TNNASUNIT.STOR, value:TNNASUNIT.STOR},
    {id:2, name:TNNASUNIT.STMSTOR, label:TNNASUNIT.STMSTOR, value:TNNASUNIT.STMSTOR}
]

export const primeTimeStartOptions: PrimeTimeMenuItem[] = [
    {id:0, label: PRIME_TIME_START['6:30 AM'], value:PRIME_TIME_START['6:30 AM'],},
    {id:1, label: PRIME_TIME_START['7:00 AM'], value:PRIME_TIME_START['7:00 AM']},
    {id:2, label: PRIME_TIME_START['7:30 AM'], value:PRIME_TIME_START['7:30 AM']},
    {id:3, label: PRIME_TIME_START['8:00 AM'], value:PRIME_TIME_START['8:00 AM']},
    {id:4, label: PRIME_TIME_START['8:30 AM'], value:PRIME_TIME_START['8:30 AM']},
    {id:5, label: PRIME_TIME_START['9:00 AM'], value:PRIME_TIME_START['9:00 AM']}
]

export const primeTimeEndOptions: PrimeTimeMenuItem[] =  [
    {id:0, label: PRIME_TIME_END['3:00 PM'], value:PRIME_TIME_END['3:00 PM']},
    {id:1, label: PRIME_TIME_END['3:30 PM'], value:PRIME_TIME_END['3:30 PM']},
    {id:2, label: PRIME_TIME_END['4:00 PM'], value:PRIME_TIME_END['4:00 PM']},
    {id:3, label: PRIME_TIME_END['4:30 PM'], value:PRIME_TIME_END['4:30 PM']},
    {id:4, label: PRIME_TIME_END['5:00 PM'], value:PRIME_TIME_END['5:00 PM']},
    {id:5, label: PRIME_TIME_END['5:30 PM'], value:PRIME_TIME_END['5:30 PM']},
]

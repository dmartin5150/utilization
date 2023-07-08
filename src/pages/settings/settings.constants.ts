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

export type SurgeonGroup = {
    unit: string;
    surgeons: string[];
    rooms: string[]
}


export const neuroSurgeonGroup:SurgeonGroup = {
    unit: 'STM ST OR',
    surgeons: ['1356445712','1619978822','1558565036','1346359460','1164865671',
                '1235109463','1427028695','1134562051','1700856994','1578610457',
                '1770634412','1841540457','1285894394', '1669445813','1245222397',
                '1528038676','1124065420','1205923323','1245405661','1801114079',
                '1982751772','1720358971','1972861680','1265479844','1346569589'],
    rooms: ['STM ST OR 01', 'STM ST OR 02', 'STM ST OR 03', 'STM ST OR 04', 'STM ST OR 05']

}

export const surgeonGroups = [neuroSurgeonGroup]
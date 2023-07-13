import { CalendarDayData } from "../../components/calendar/calendarDay";

export type CalendarMenuItem = {
    id: number;
    value: string;
    label:string;
}

type CalendarMenuItems = {
    [key:string] : CalendarMenuItem
}


export enum CalendarMenuOptions {
    All = '1',
    Selected = '2',
    Mixed = '3',
    In = '4',
    Out = '5'
}

export type CalendarMenus = {
    [key:string]: CalendarMenuItem[]
}




export const calendarSurgeonOptionsNone: CalendarMenuItem[] = [
    {id:0, label: 'All', value: CalendarMenuOptions.All},
]

export const calendarSurgeonOptionsSelected: CalendarMenuItem[] = [
    {id:0, label: 'Selected', value: CalendarMenuOptions.Selected},
]


export const calendarSurgeonOptionsAll: CalendarMenuItem[] = [
    {id:0, label: 'All', value: CalendarMenuOptions.All},
    {id:1, label: 'Selected', value: CalendarMenuOptions.Selected},
]

export const calendarSurgeonMenus:CalendarMenus = {
    'All': calendarSurgeonOptionsAll,
    'None': calendarSurgeonOptionsNone,
    'Selected': calendarSurgeonOptionsSelected
}



export const calendarRoomOptionsAll: CalendarMenuItem[] = [
    {id:0, label: 'All', value: CalendarMenuOptions.All,},
    {id:1, label: 'Selected', value:CalendarMenuOptions.Selected},
    {id:2, label: 'Surgeon', value:CalendarMenuOptions.Mixed},
]


export const calendarRoomOptionsSelect: CalendarMenuItem[] = [
    {id:0, label: 'All', value: CalendarMenuOptions.All,},
    {id:2, label: 'Selected', value:CalendarMenuOptions.Selected},
]

export const calendarRoomOptionsMixed: CalendarMenuItem[] = [
    {id:0, label: 'All', value: CalendarMenuOptions.All,},
    {id:2, label: 'Surgeon', value:CalendarMenuOptions.Mixed},
]

export const calendarRoomOptionsNone: CalendarMenuItem[] = [
    {id:0, label: 'All', value: CalendarMenuOptions.All,},
]

export const calendarRoomMenus: CalendarMenus = {
    'All': calendarRoomOptionsAll,
    'Mixed': calendarRoomOptionsMixed,
    'None': calendarRoomOptionsNone,
    'Selected': calendarRoomOptionsSelect
}



export const calendarTotalData: CalendarDayData[]= [
    {date:'Total', display: '50%', subHeading1: 'PT: 30H 15M', subHeading2:'nPT: 30H 15M',ptMinutes:0, nonptMinutes:0,totalptMinutes:0,dayOfWeek:1},
    {date:'Total', display: '50%', subHeading1: 'PT: 30H 15M', subHeading2:'nPT: 30H 15M',ptMinutes:0, nonptMinutes:0,totalptMinutes:0,dayOfWeek:2},
    {date:'Total', display: '50%', subHeading1: 'PT: 30H 15M', subHeading2:'nPT: 30H 15M',ptMinutes:0, nonptMinutes:0,totalptMinutes:0,dayOfWeek:3},
    {date:'Total', display: '50%', subHeading1: 'PT: 30H 15M', subHeading2:'nPT: 30H 15M',ptMinutes:0, nonptMinutes:0,totalptMinutes:0,dayOfWeek:4},
    {date:'Total', display: '50%', subHeading1: 'PT: 30H 15M', subHeading2:'nPT: 30H 15M',ptMinutes:0, nonptMinutes:0,totalptMinutes:0,dayOfWeek:5},
]
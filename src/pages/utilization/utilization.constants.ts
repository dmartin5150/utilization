

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
    Mixed = '3'
}

export type CalendarMenus = {
    [key:string]: CalendarMenuItem[]
}




export const calendarSurgeonOptionsNone: CalendarMenuItem[] = [
    {id:0, label: 'All', value: CalendarMenuOptions.All},
]

export const calendarSurgeonOptionsAll: CalendarMenuItem[] = [
    {id:0, label: 'All', value: CalendarMenuOptions.All},
    {id:1, label: 'Selected', value: CalendarMenuOptions.Selected},
]

export const calendarSurgeonMenus:CalendarMenus = {
    'All': calendarSurgeonOptionsAll,
    'None': calendarSurgeonOptionsNone
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

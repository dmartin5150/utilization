

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


export const calendarSurgeonOptions: CalendarMenuItem[] = [
    {id:0, label: 'All', value: CalendarMenuOptions.All},
    {id:1, label: 'Selected', value: CalendarMenuOptions.Selected},
]

export const calendarRoomOptions: CalendarMenuItem[] = [
    {id:0, label: 'All', value: CalendarMenuOptions.All,},
    {id:1, label: 'Selected', value:CalendarMenuOptions.Selected},
    {id:2, label: 'Surgeon', value:CalendarMenuOptions.Mixed},
]



export type CalendarMenuItem = {
    id: number;
    value: string;
    label:string;
}

type CalendarMenuItems = {
    [key:string] : CalendarMenuItem
}


export const calendarSurgeonOptions: CalendarMenuItem[] = [
    {id:0, label: 'All', value:'All',},
    {id:1, label: 'Selected', value:'Selected'},
]

export const calendarRoomOptions: CalendarMenuItem[] = [
    {id:0, label: 'All', value:'All',},
    {id:1, label: 'Selected', value:'Selected'},
    {id:2, label: 'Surgeon', value:'Surgeon'},
]

import { CalendarMenuItem } from "../utilization/utilization.constants"
import { CalendarMenus } from "../utilization/utilization.constants"
import { CalendarMenuOptions } from "../utilization/utilization.constants"
import Block from "./Block"


export enum BlockMenuOptions {
    Surgeon = '1',
    Surgeon_Group = '2',
    Surgical_Specialty= '3',
    All = '4'
}



export const blockTypeOptions: CalendarMenuItem[] = [
    {id:0, label: 'Surgeon', value:BlockMenuOptions.Surgeon},
    {id:1, label: 'Group', value:BlockMenuOptions.Surgeon_Group},
    {id:3, label: 'Specialty', value:BlockMenuOptions.Surgical_Specialty},
    {id:4, label: 'All', value:BlockMenuOptions.All}
]



export const blockRoomOptions: CalendarMenuItem[] = [
    {id:0, label: 'All', value: CalendarMenuOptions.All,},
    {id:1, label: 'In', value:CalendarMenuOptions.In},
    {id:2, label: 'Out', value:CalendarMenuOptions.Out},
]

export const calendarBlockMenus:CalendarMenus = {
    'Types': blockTypeOptions, 
    'Rooms': blockRoomOptions,
}
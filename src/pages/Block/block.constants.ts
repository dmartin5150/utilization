import { CalendarMenuItem } from "../utilization/utilization.constants"
import { CalendarMenus } from "../utilization/utilization.constants"
import { CalendarMenuOptions } from "../utilization/utilization.constants"
import Block from "./Block"


export enum BlockMenuOptions {
    Surgeon = 'Surgeon',
    Surgeon_Group = 'Surgeon Group',
    Surgical_Specialty= 'Surgical Specialty',
    All = 'All'
}

export enum BlockRoomOptions {
    All = 'ALL',
    In = 'IN',
    Out = 'OUT'
}



export const blockTypeOptions: CalendarMenuItem[] = [
    {id:0, label: 'Surgeon', value:BlockMenuOptions.Surgeon},
    {id:1, label: 'Group', value:BlockMenuOptions.Surgeon_Group},
    {id:3, label: 'Specialty', value:BlockMenuOptions.Surgical_Specialty},
    {id:4, label: 'All', value:BlockMenuOptions.All}
]



export const blockRoomOptions: CalendarMenuItem[] = [
    {id:0, label: 'ALL', value: BlockRoomOptions.All},
    {id:1, label: 'IN', value:BlockRoomOptions.In},
    {id:2, label: 'OUT', value:BlockRoomOptions.Out},
]

export const calendarBlockMenus:CalendarMenus = {
    'Types': blockTypeOptions, 
    'Rooms': blockRoomOptions,
}
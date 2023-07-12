import { CalendarMenuItem } from "../utilization/utilization.constants"
import { CalendarMenus } from "../utilization/utilization.constants"
import { CalendarMenuOptions } from "../utilization/utilization.constants"






export const blockRoomOptions: CalendarMenuItem[] = [
    {id:0, label: 'All', value: CalendarMenuOptions.All,},
    {id:1, label: 'In', value:CalendarMenuOptions.In},
    {id:2, label: 'Out', value:CalendarMenuOptions.Out},
]

export const calendaBlockRoomMenus:CalendarMenus = {
    'All': blockRoomOptions,
}
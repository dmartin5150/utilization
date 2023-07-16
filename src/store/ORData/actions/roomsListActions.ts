import { createAction, ActionWithPayload, Action, withMatcher } from "../../../utilities/reducer/reducerutils"

import { UnitRoomLists, UnitRoomListItem } from "../../../pages/settings/settings.constants"
import { ORDATA_TYPES } from "../ordata.types"




export type FetchRoomLists = 
    ActionWithPayload<ORDATA_TYPES.FETCH_ROOM_LISTS_SUCCESS,UnitRoomLists>

export type SetRoomLists = ActionWithPayload<ORDATA_TYPES.SET_ROOM_LISTS,UnitRoomLists >

export type SetActiveRoomList = ActionWithPayload<ORDATA_TYPES.SET_ACTIVE_ROOM_LIST,UnitRoomListItem[]>

export type SetAllRoomsSelected = ActionWithPayload<ORDATA_TYPES.SET_ALL_ROOMS_SELECTED, boolean>


export const setAllRoomsSelected = withMatcher((selected:boolean):SetAllRoomsSelected=> {
    return createAction(ORDATA_TYPES.SET_ALL_ROOMS_SELECTED, selected)
});

export const fetchRoomLists = withMatcher((roomLists:UnitRoomLists):FetchRoomLists => {
    return createAction(ORDATA_TYPES.FETCH_ROOM_LISTS_SUCCESS, roomLists)
});

export const setRoomLists = withMatcher((roomLists:UnitRoomLists):SetRoomLists => {
    return createAction(ORDATA_TYPES.SET_ROOM_LISTS,roomLists)
});

export const setActiveRoomList = withMatcher((roomList:UnitRoomListItem[]):SetActiveRoomList => {
    return createAction(ORDATA_TYPES.SET_ACTIVE_ROOM_LIST,roomList);
});
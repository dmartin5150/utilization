import { createAction, ActionWithPayload, Action, withMatcher } from "../../../utilities/reducer/reducerutils"

import { UnitRoomLists, UnitRoomListItem } from "../../../pages/settings/settings.constants"
import { ORDATA_TYPES } from "../ordata.types"




export type FetchRoomListsSuccess = 
    ActionWithPayload<ORDATA_TYPES.FETCH_ROOM_LISTS_SUCCESS,UnitRoomLists>

export type SetRoomListsSuccess = ActionWithPayload<ORDATA_TYPES.SET_ROOM_LISTS,UnitRoomLists >

export type SetActiveRoomListSuccess = ActionWithPayload<ORDATA_TYPES.SET_ACTIVE_ROOM_LIST,UnitRoomListItem[]>

export type SetAllRoomsSelected = ActionWithPayload<ORDATA_TYPES.SET_ALL_ROOMS_SELECTED, boolean>


export const setAllRoomsSelected = withMatcher((selected:boolean):SetAllRoomsSelected=> {
    return createAction(ORDATA_TYPES.SET_ALL_ROOMS_SELECTED, selected)
});

export const fetchRoomListsSuccess = withMatcher((roomLists:UnitRoomLists):FetchRoomListsSuccess => {
    return createAction(ORDATA_TYPES.FETCH_ROOM_LISTS_SUCCESS, roomLists)
});

export const setRoomListsSuccess = withMatcher((roomLists:UnitRoomLists):SetRoomListsSuccess => {
    return createAction(ORDATA_TYPES.SET_ROOM_LISTS,roomLists)
});

export const setActiverRoomListSuccess = withMatcher((roomList:UnitRoomListItem[]):SetActiveRoomListSuccess => {
    return createAction(ORDATA_TYPES.SET_ACTIVE_ROOM_LIST,roomList);
});
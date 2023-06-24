
export enum  ORDATA_TYPES {
    FETCH_DATA_START  = 'ordata/FETCH_CALENDAR_DATA_START',
    FETCH_DATA_FAILED  ='ordata/FETCH_CALENDAR_DATA_FAILED',
    FETCH_CALENDAR_DATA_SUCCESS  ='ordata/FETCH_CALENDAR_DATA_SUCCESS',
    FETCH_GRID_DATA_SUCCESS  ='ordata/FETCH_GRID_DATA_SUCCESS',
    FETCH_DETAILS_SUCCESS = 'ordata/FETCH_DETAILS_SUCCESS',
    FETCH_SURGEON_LISTS_SUCCESS = 'ordata/FETCH_SURGEON_LISTS_SUCCESS',
    FETCH_ROOM_LISTS_SUCCESS = 'ordata/FETCH_ROOM_LISTS_SUCCESS',
    SET_ACTIVE_ROOM_LIST = 'ordata/SET_ACTIVE_ROOM_LIST', 
    SET_ACTIVE_SURGEON_LIST = 'ordata/SET_ACTIVE_SURGEON_LIST',
    SET_ROOM_LISTS = 'ordata/SET_ROOM_LISTS',
    SET_SURGEON_LISTS = 'ordata/SET_SURGEON_LISTS',
    SET_ALL_ROOMS_SELECTED = 'ordata/SET_ALL_ROOMS_SELECTED',
    SET_ALL_SURGEONS_SELECTED = 'orData/SET_ALL_SURGEONS_SELECTED', 
    CLOSE_POPUP = 'ordata/CLOSE_POPUP'
} 


export type item = {
    id: number;
    name: string;
    selected: boolean;
}

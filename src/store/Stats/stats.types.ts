import { StringDecoder } from "string_decoder";

export enum STATS_TYPES  {
    FETCH_STATS_START  = 'stats/FETCH_STATS_DATA_START',
    FETCH_STATS_FAILED  ='stats/FETCH_STATS_DATA_FAILED',
    FETCH_STATS_DATA_SUCCESS  ='stats/FETCH_STATS_DATA_SUCCESS',
    SET_SUMMARY_RESULTS = 'stats/SET_SUMMARY_RESULTS',
    FETCH_ROOM_START = 'stats/FETCH_ROOM_START',
    FETCH_ROOM_FAILED = 'stats/FETCH_ROOM_FAILED',
    FETCH_ROOM_STATS_SUCCESS = 'stats/FETCH_ROOM_STATS_SUCCESS',
    SET_ROOM_PROCEDURES = 'stats/SET_ROOM_PROCEDURES'
}

export type StatDataSet = {
    day: string | null;
    procedure:string | null;
    hour:string |null;
}


export type StatCardResults = {
    title: string | null;
    data: StatDataSet[];
}

export type SurgeonList = {
    id: string | null;
    name: string | null;
    npi: string | null;
}



export type SurgeonMenuItem = {
    id: string;
    value:string;
    label:string;
}

export type SelectorMenuItem = {
    id:string;
    value:string;
    label:string;
}

export type StatSummaryResults = {
    surgeon: SurgeonMenuItem;
    mainCard: StatCardResults;
    secondaryCards:StatCardResults[];
}


export type RoomStats = {
    unit:string;
    procedureName:string;
    room: string;
    usage:number;
    duration:number;
    duration_std:number;
}



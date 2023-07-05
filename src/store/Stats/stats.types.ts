export enum STATS_TYPES  {
    FETCH_STATS_START  = 'stats/FETCH_STATS_DATA_START',
    FETCH_STATA_FAILED  ='stats/FETCH_STATS_DATA_FAILED',
    FETCH_STATS_DATA_SUCCESS  ='stats/FETCH_STATS_DATA_SUCCESS',
}

export type StatDataSet = {
    day: string | null;
    procedure:string | null;
    hour:string |null;
}


export type StatCardData = {
    title: string | null;
    data: StatDataSet;
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

export type StatSummary = {
    surgeon: SurgeonMenuItem;
    mainCard: StatDataSet[];
    secondaryCards:StatDataSet[][];
}




export enum STATS_TYPES  {
    FETCH_STATS_START  = 'stats/FETCH_STATS_DATA_START',
    FETCH_STATA_FAILED  ='stats/FETCH_STATS_DATA_FAILED',
    FETCH_STATS_DATA_SUCCESS  ='stats/FETCH_STATS_DATA_SUCCESS',
    SET_SUMMARY_RESULTS = 'stats/SET_SUMMARY_RESULTS'
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



export type StatSummaryResults = {
    surgeon: SurgeonMenuItem;
    mainCard: StatCardResults;
    secondaryCards:StatCardResults[];
}




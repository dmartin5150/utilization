

export enum BLOCK_TYPES  {
    FETCH_BLOCK_START  = 'block/FETCH_BLOCK_DATA_START',
    FETCH_BLOCK_FAILED  ='block/FETCH_BLOCK_DATA_FAILED',
    FETCH_BLOCK_SUCCESS  ='block/FETCH_BLOCK_SUCCESS',
    SET_SELECTED_BLOCK_DATE = 'block/SET_SELECTED_BLOCK_DATE',
    SET_SELECTED_BLOCK_ROOM = 'block/SET_SELECTED_BLOCK_ROOM',
    SET_BLOCK_POPUP_OPEN = 'block/SET_BLOCK_POPUP_OPEN',
    SET_CALENDAR_DATA = 'block/SET_CALENDAR_DATA',
    SET_CALENDAR_TOTALS = 'block/SET_CALENDAR_TOTAL',
    SET_BLOCK_CARDS = 'block./SET_BLOCK_CARDS'
}



export type BlockData = {
    id: string;
    blockDate:string;
    unit:string;
    room:string;
    utilization:string;
    bt_minutes:string;
    nbt_minutes:string;
    total_minutes:string;
    type:string

}



export type BlockProcedure = {
    fullName:string;
    procedureDate:string;
    unit:string;
    procedureName:string;
    local_start_time:string;
    local_end_time:string;
    NPI:string;
    type:string;
    room: string;
}


export type BlockDetails = {
    blockId:string;
    blockName:string;
    room:string;
    unit:string;
    blockDate:string;
    type:string
    procs: BlockProcedure[];
    start_time:string,
    end_time:string,
    releaseDate:string

}

export type BlockLists = {
    grid: BlockData[];
    details:BlockDetails[];
}


export type BlockStats = {
    btMinutes: number,
    nbtMinutes: number,
    totalMinutes: number,
    utilization: string, 
 } 

 export type DetailsSubHeader = {
    name:string;
    startTime:string;
    endTime:string;
    releaseDate:string;
 }

export type BlockDetailHeader = {
    room:string;
    utilization:string;
    blockDate: string;

}


 export type DetailsSummary = {
    header:BlockDetailHeader, 
    subHeader:DetailsSubHeader;
    procs: BlockProcedure[];
 }


 export type DayUtilization = {
    id:string,
    date: string,
    type:string,
    room:string,
    utilization:string
}
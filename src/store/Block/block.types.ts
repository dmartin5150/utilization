

export enum BLOCK_TYPES  {
    FETCH_BLOCK_START  = 'stats/FETCH_BLOCK_DATA_START',
    FETCH_BLOCK_FAILED  ='stats/FETCH_BLOCK_DATA_FAILED',
    FETCH_BLOCK_SUCCESS  ='stats/FETCH_BLOCK_SUCCESS',
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
    NPI:string
}


export type BlockDetails = {
    blockId:string;
    blockName:string;
    room:string;
    unit:string;
    blockDate:string;
    type:string
    blockType: BlockProcedure[];

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
import { AnyAction } from "redux";
import { fetchStatsStart,fetchStatsSuccess,fetchStatsFailed, setStatSummary } from "./stats.actions";
import { StatSummaryResults, StatCardResults, StatDataSet, SurgeonMenuItem,  } from "./stats.types";


export type ORStatState = {
    statSummary: StatSummaryResults;
    curStatSummary: StatSummaryResults;
    isLoading: boolean;
    error: null | Error
}



export const STAT_DATA_SET_INITIAL_SET: StatDataSet = {
    day: null,
    procedure: null,
    hour: null
}



export const SURGEON_MENU_ITEM_INITIAL_STATE: SurgeonMenuItem = {
    id: '0',
    label:'',
    value:'0'
}

export const STAT_CARD_INITIAL_STATE:StatCardResults = {
    title:'',
    data:[]
}

export const STAT_SUMMARY_INITIAL_STATE:StatSummaryResults = {
    surgeon: SURGEON_MENU_ITEM_INITIAL_STATE,
    mainCard: STAT_CARD_INITIAL_STATE,
    secondaryCards:[]
}


export const OR_STAT_INITIAL_STATE:ORStatState  = {
    statSummary: STAT_SUMMARY_INITIAL_STATE,
    curStatSummary: STAT_SUMMARY_INITIAL_STATE,
    isLoading:false,
    error:null
}


export const ORStatReducer = (state=OR_STAT_INITIAL_STATE, action: AnyAction):ORStatState =>  {
    if (fetchStatsStart.match(action)) {
        return {...state, isLoading: true}
    }
    if (fetchStatsSuccess.match(action)) {
        return {...state, statSummary: action.payload }
    }
    if (fetchStatsFailed.match(action)) {
        return {...state, error: action.payload}
    }
    if (setStatSummary.match(action)) {
        return {...state, curStatSummary: action.payload}
    }
    return state;
}
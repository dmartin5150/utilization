import { AnyAction } from "redux";
import { fetchStatsStart,fetchStatsSuccess,fetchStatsFailed } from "./stats.actions";
import { StatSummary, SecondaryCards, StatCardData, StatDataSet, SurgeonMenuItem } from "./stats.types";


export type ORStatState = {
    statSummary: StatSummary;
    isLoading: boolean;
    error: null | Error
}

const SECONDARY_CARDS_INITIAL_STATE: SecondaryCards = {
    cards: []
}

const STAT_DATA_SET_INITIAL_SET: StatDataSet = {
    day: null,
    procedure: null,
    hour: null
}

const MAIN_CARD_INITIAL_STATE: StatCardData = {
    title: null,
    data: STAT_DATA_SET_INITIAL_SET
}

const SURGEON_MENU_ITEM_INITIAL_STATE: SurgeonMenuItem = {
    id: '0',
    label:'',
    value:'0'
}

const STAT_SUMMARY_INITIAL_STATE:StatSummary = {
    surgeon: SURGEON_MENU_ITEM_INITIAL_STATE,
    mainCard: MAIN_CARD_INITIAL_STATE,
    secondaryCards: SECONDARY_CARDS_INITIAL_STATE
}


export const OR_STAT_INITIAL_STATE:ORStatState  = {
    statSummary: STAT_SUMMARY_INITIAL_STATE,
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
    return state;
}
import { FACILITY_TYPES } from "./facility.types";
import { createAction, Action, ActionWithPayload, withMatcher } from "../../utilities/reducer/reducerutils";
import { FACILITY_UNITS } from "./facitlityUnits";
import { PrimeTime, DateRange } from "./facility.types";
import { item } from "../ORData/ordata.types";
import { FacilityRoom } from "./facitlity.reducer";
import { TNNASUNIT } from "./facility.types";

export type SetUnit = ActionWithPayload<FACILITY_TYPES.SELECT_UNIT, string>
export type SetDate = ActionWithPayload<FACILITY_TYPES.SELECT_DATE, string>
export type SetRoom = ActionWithPayload<FACILITY_TYPES.SELECT_ROOM, FacilityRoom>
export type SetPrimeTime= ActionWithPayload<FACILITY_TYPES.SET_PRIME_TIME,PrimeTime>
export type SetDateRange = ActionWithPayload<FACILITY_TYPES.SET_DATE_RANGE, DateRange>

export const setUnit = withMatcher((unit: string):SetUnit => {
    return createAction(FACILITY_TYPES.SELECT_UNIT, unit);
});

export const setDate = withMatcher((date:string):SetDate => {
    return createAction(FACILITY_TYPES.SELECT_DATE, date);
});

export const setRoom = withMatcher((room:FacilityRoom):SetRoom => {
    return createAction(FACILITY_TYPES.SELECT_ROOM, room)
});

export const setPrimeTime = withMatcher((primeTime:PrimeTime):SetPrimeTime => {
    return createAction(FACILITY_TYPES.SET_PRIME_TIME, primeTime)
});

export const setDateRange = withMatcher((dateRange:DateRange):SetDateRange => {
    return createAction(FACILITY_TYPES.SET_DATE_RANGE, dateRange)
})
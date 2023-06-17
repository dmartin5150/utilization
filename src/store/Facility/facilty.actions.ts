import { FACILITY_TYPES } from "./facility.types";
import { createAction, Action, ActionWithPayload, withMatcher } from "../../utilities/reducer/reducerutils";
import { FACILITY_UNITS } from "./facitlityUnits";

export type SelectUnit = ActionWithPayload<FACILITY_TYPES.SELECT_UNIT,string>
export type SelectDate = ActionWithPayload<FACILITY_TYPES.SELECT_DATE, string>
export type SelectRoom = ActionWithPayload<FACILITY_TYPES.SELECT_ROOM, string>


export const setUnit = withMatcher((unit: string):SelectUnit => {
    return createAction(FACILITY_TYPES.SELECT_UNIT, unit);
});

export const setDate = withMatcher((date:string):SelectDate => {
    return createAction(FACILITY_TYPES.SELECT_DATE, date);
});

export const setRoom = withMatcher((room:string) => {
    return createAction(FACILITY_TYPES.SELECT_ROOM, room)
});
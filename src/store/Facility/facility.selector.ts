import { RootState } from "../store"
import { createSelector } from "reselect";

const selectFacilityReducer = (state:RootState) => state.Facility;

export const selectUnit = createSelector(
    [selectFacilityReducer],
    (facilitySlice) => facilitySlice.unit
)

export const selectDate = createSelector(
    [selectFacilityReducer],
    (facilitySlice) => facilitySlice.date
)

export const selectRoom = createSelector(
    [selectFacilityReducer],
    (facilitySlice) => facilitySlice.room
)

export const selectPrimeTime = createSelector(
    [selectFacilityReducer],
    (facilitySlice) => facilitySlice.primeTime
)

export const selectDateRange = createSelector(
    [selectFacilityReducer],
    (facilitySlice) => facilitySlice.dateRange
)
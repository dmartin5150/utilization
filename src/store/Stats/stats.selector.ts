import { createSelector } from "reselect";
import { RootState } from "../store";

const selectStatReducer = (state:RootState) => state.Stats;

export const selectStatSummary = createSelector(
    [selectStatReducer],
    (ORStatsSlice) => ORStatsSlice.statSummary
)
export const selectStatSurgeonName = createSelector(
    [selectStatSummary],
    (ORStatsSlice) => ORStatsSlice.surgeonName
)

export const selectStatMainCard = createSelector(
    [selectStatSummary],
    (ORStatsSlice) => ORStatsSlice.mainCard
)

export const selectStatSecondaryCards = createSelector(
    [selectStatSummary],
    (ORStatsSlice) => ORStatsSlice.secondaryCards
)
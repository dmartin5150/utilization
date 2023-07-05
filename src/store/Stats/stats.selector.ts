import { createSelector } from "reselect";
import { RootState } from "../store";

const selectStatReducer = (state:RootState) => state.Stats;

export const selectStatSummary = createSelector(
    [selectStatReducer],
    (ORStatsSlice) => ORStatsSlice.statSummary
)

export const selectCurrentStatSummary = createSelector(
    [selectStatReducer],
    (ORStatsSlice) => ORStatsSlice.curStatSummary
)

export const selectStatSurgeon = createSelector(
    [selectStatSummary],
    (ORStatsSlice) => ORStatsSlice.surgeon
)

export const selectStatMainCard = createSelector(
    [selectStatSummary],
    (ORStatsSlice) => ORStatsSlice.mainCard
)



export const selectStatSecondaryCards = createSelector(
    [selectStatSummary],
    (ORStatsSlice) => ORStatsSlice.secondaryCards
)



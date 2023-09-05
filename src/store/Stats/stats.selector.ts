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

export const selectStatLoading = createSelector(
    [selectStatReducer],
    (ORStatsSlice) => ORStatsSlice.roomStatsLoading
)

export const selectRoomStats = createSelector(
    [selectStatReducer],
    (ORStatsSlice) => ORStatsSlice.roomStats
)

export const selectStatsError = createSelector(
    [selectStatReducer],
    (ORStatsSlice) => ORStatsSlice.error
)

export const selectProcedures = createSelector(
    [selectStatReducer],
    (ORStatsSlice) => ORStatsSlice.procedures
)


export const selectStatSecondaryCards = createSelector(
    [selectStatSummary],
    (ORStatsSlice) => ORStatsSlice.secondaryCards
)



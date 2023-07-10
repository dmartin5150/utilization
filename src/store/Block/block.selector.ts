import { createSelector } from "reselect";
import { RootState } from "../store";

const selectBlockReducer = (state:RootState) => state.Block;

export const selectBlockLists = createSelector(
    [selectBlockReducer],
    (ORBlockSlice) => ORBlockSlice.lists
)

export const selectBlockGrid = createSelector(
    [selectBlockLists],
    (ORBlockSlice) => ORBlockSlice.grid
)

export const selectBlockDetails = createSelector(
    [selectBlockLists],
    (ORBlockSlice) => ORBlockSlice.details
)


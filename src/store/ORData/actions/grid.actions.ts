import { SummaryGridData } from "../../../components/summary-grid/summary-grid";
import { ORDATA_TYPES } from "../ordata.types";
import { createAction, ActionWithPayload, Action, withMatcher } from "../../../utilities/reducer/reducerutils"
import { AppDispatch } from "../../store"
import getGridData from "../../../utilities/fetchData/getGridData";
import { fetchDataStart, fetchDataFailed } from "./ordata.actions";
import { SummaryGridRowData } from "../../../components/summary-grid/summary-grid-row";

export type FetchGridSuccess = ActionWithPayload<ORDATA_TYPES.FETCH_GRID_DATA_SUCCESS, SummaryGridRowData[]>
export type SetGridData = ActionWithPayload<ORDATA_TYPES.SET_GRID_DATA, SummaryGridRowData[]>



export const setGridData = withMatcher((data:SummaryGridRowData[]):SetGridData => {
    return createAction(ORDATA_TYPES.SET_GRID_DATA, data);
})

export const fetchGridSuccess = withMatcher((data:SummaryGridRowData[]):FetchGridSuccess => {
    return createAction(ORDATA_TYPES.FETCH_GRID_DATA_SUCCESS, data)
});



export const fetchGridDataAsync = (unit: string, date: string) => {
    return async(dispatch:AppDispatch) => {
        dispatch(fetchDataStart);
        try {
            const gridData  = await getGridData(unit, date)
            dispatch(fetchGridSuccess(gridData))
        } catch (error) {
            dispatch(fetchDataFailed(error as Error))
        }
    }
}
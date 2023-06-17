import { SummaryGridData } from "../../../components/summary-grid/summary-grid";
import { ORDATA_TYPES } from "../ordata.types";
import { createAction, ActionWithPayload, Action, withMatcher } from "../../../utilities/reducer/reducerutils"
import { AppDispatch } from "../../store"
import getGridData from "../../../utilities/fetchData/getGridData";
import { fetchDataStart, fetchDataFailed } from "./ordata.actions";


export type FetchGridSuccess = ActionWithPayload<ORDATA_TYPES.FETCH_GRID_DATA_SUCCESS, SummaryGridData[]>





export const fetchGridSuccess = withMatcher((data:SummaryGridData[]):FetchGridSuccess => {
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
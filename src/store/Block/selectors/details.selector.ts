import { createSelector } from "reselect";
import { RootState } from "../../store";
import { BlockData } from "../block.types";
import { CalendarDayData } from "../../../components/calendar/calendarDay";
import { SummaryGridRowData } from "../../../components/summary-grid/summary-grid-row";
import { selectBlockLists } from "./calendar.selector";



export const selectBlockDetails = createSelector(
    [selectBlockLists],
    (ORBlockSlice) => ORBlockSlice.details
)






import { combineReducers} from "redux";
import { ORDataReducer } from "./ORData/ordata.reducer";
import { FacilityReducer } from "./Facility/facitlity.reducer";
import { ORStatReducer } from "./Stats/stats.reducer";


export const rootReducer = combineReducers({
    ORData: ORDataReducer,
    Facility:FacilityReducer,
    Stats: ORStatReducer
}) 
import { combineReducers} from "redux";
import { ORDataReducer } from "./ORData/ordata.reducer";
import { FacilityReducer } from "./Facility/facitlity.reducer";
import { ORStatReducer } from "./Stats/stats.reducer";
import { BlockReducer } from "./Block/block.reducer";


export const rootReducer = combineReducers({
    ORData: ORDataReducer,
    Facility:FacilityReducer,
    Stats: ORStatReducer,
    Block: BlockReducer
}) 
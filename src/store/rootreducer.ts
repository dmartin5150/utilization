import { combineReducers} from "redux";
import { ORDataReducer } from "./ORData/ordata.reducer";

export const rootReducer = combineReducers({
    ORData: ORDataReducer
}) 
/**
 * Auther: Gaurav Chaware
 * Date: 24-09-2020
 * Desc: Combine all reducer files here
 */
import { combineReducers } from "redux";
import commonReducer from "./common";

const createRootReducer = () =>
    combineReducers({
        common: commonReducer
    });

export default createRootReducer;
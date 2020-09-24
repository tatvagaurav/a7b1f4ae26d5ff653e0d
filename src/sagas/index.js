/**
 * Auther: Gaurav Chaware
 * Date: 24-09-2020
 * Desc: Combine all sagas files here
 */
import { all } from "redux-saga/effects";

import { getPlanetsWatcher } from "./common";

export default function* rootSaga() {
    yield all([getPlanetsWatcher()]);
}
// reducers.js
import { combineReducers } from "redux";
import converterReducer from "./converter/converterReducer";
import { connectRouter } from "connected-react-router";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    currency: converterReducer
  });
export default createRootReducer;
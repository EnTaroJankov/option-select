import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers/index";
import { applyMiddleware, createStore } from "redux";

export default createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

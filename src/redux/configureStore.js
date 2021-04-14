import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./rootReducer";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        logger,
        thunk
      )
    )
  );

  return store;
}
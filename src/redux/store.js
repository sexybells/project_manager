import { legacy_createStore as createStore, combineReducers, compose, applyMiddleware } from 'redux';
import reducers from "./reducers";

const reducersStorage = combineReducers({
    state: reducers,
});
const store = createStore(reducersStorage);
export default store;
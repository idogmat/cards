import thunkMiddleware from "redux-thunk";
import {applyMiddleware, combineReducers, createStore} from "redux";
import authReducer from "./authReducer";

let rootReducer=combineReducers({
    authReducer
})

let store=createStore(rootReducer,applyMiddleware(thunkMiddleware))
export type AppStateType= ReturnType<typeof rootReducer>
export default store
// @ts-ignore
window.store = store;
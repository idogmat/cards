import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AnyAction, combineReducers} from "redux";
import authReducer from "./authReducer";
import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

let rootReducer=combineReducers({
    auth: authReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
})
export type RootState = ReturnType<typeof store.getState>
export type AppThunkActionType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store
// @ts-ignore
window.store = store;
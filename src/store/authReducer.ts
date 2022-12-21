import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunkActionType} from "./store";
import {API} from "../api/api";
export type UserType = {
    email: string
    password: string
    rememberMe?: boolean
}
const initialState = {
    isLoggedIn: false as boolean,
    user:{} as UserType
}
const slice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        loginAC(state,action:PayloadAction<{ value: boolean }>){
            state.isLoggedIn = action.payload.value
        }
    }

})
const authReducer=slice.reducer
export const loginAC= slice.actions.loginAC
export default authReducer
export const loginThunk = (user: UserType): AppThunkActionType => async (dispatch) => {
    try {
        const res = await API.login(user)
        console.log(res)
        // if (res.data.resultCode === 0) {
            dispatch(loginAC({value: true}))
        //     dispatch(changeStatusError({status:'succeeded'}))
        // } else {
        //     handleServerNetworkError(res.statusText, dispatch)
        // }
    } catch (e: any) {
        // handleServerNetworkError(e, dispatch)
        console.log(e)
    }
}
export const registrationThunk = (user: UserType): AppThunkActionType => async (dispatch) => {
    try {
        const res = await API.register(user)
        console.log(res)
        // if (res.data.resultCode === 0) {
        //     dispatch(loginAC({value: true}))
        //     dispatch(changeStatusError({status:'succeeded'}))
        // } else {
        //     handleServerNetworkError(res.statusText, dispatch)
        // }
    } catch (e: any) {
        // handleServerNetworkError(e, dispatch)
        console.log(e)
    }
}
export const AuthMeThunk = (): AppThunkActionType => async (dispatch) => {
    try {
        const res = await API.authMe()
        console.log(res)
        // if (res.data.resultCode === 0) {
            dispatch(loginAC({value: true}))
        //     dispatch(changeStatusError({status:'succeeded'}))
        // } else {
        //     handleServerNetworkError(res.statusText, dispatch)
        // }
    } catch (e: any) {
        // handleServerNetworkError(e, dispatch)
        console.log(e)
    }
}
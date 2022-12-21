import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunkActionType} from "./store";
import {API} from "../api/api";
import {loginAC} from "./authReducer";
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
    name:'app',
    initialState:initialState,
    reducers:{

    },
    // extraReducers:(builder)=>{
    //     builder.addCase(loginAC, (state, action) => {
    //         !action.payload.value && (state = {});
    //     });
    // }

})
const appReducer=slice.reducer

export default appReducer

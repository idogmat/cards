export type AuthUserType={
    id: number|null
    email: string|null
    login: string|null
}
const initialState: AuthUserType = {
    id: null,
    email: null,
    login: null,
}
const authReducer = (state = initialState, action:any) => {

    switch (action.type) {

        default:
            return state
    }
}
export default  authReducer
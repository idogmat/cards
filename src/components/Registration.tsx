import React from 'react';
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import {useFormik} from "formik";
import {Button, FormControl, FormControlLabel, FormGroup, Grid, TextField} from "@mui/material";
import SuperCheckbox from "../common/SuperCheckbox/SuperCheckbox";
import {Navigate, Route, useNavigate} from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Login from "./Login";
import {useAppDispatch, useAppSelector} from "../store/store";
import {registrationThunk} from "../store/authReducer";


type FormikErrorType = {
    email?: string
    password?: string
    repeatPassword?: string
}
const Registration = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLogged = useAppSelector(state => state.auth.isLoggedIn)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (values.password !== values.repeatPassword){
                errors.password = 'Invalid passwords'
            }
            if (values.password.length < 8){
                errors.password = 'Invalid password length'
            }
            return errors
        },
        onSubmit: (values, {resetForm}) => {
            console.log(values)
            dispatch(registrationThunk(values))
        },
    })
    if(isLogged){
        return <Navigate to={'/'}/>
    }
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl  >
                    <FormGroup>
                        <TextField label="Email" margin="normal"
                                   {...formik.getFieldProps('email')}
                        />
                        <TextField type="password" label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                            // name={'password'} onChange={formik.handleChange}
                            // value={formik.values.password}
                        />

                        <TextField type="password" label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('repeatPassword')}
                            // name={'password'} onChange={formik.handleChange}
                            // value={formik.values.password}
                        />
                        {formik.errors.password
                            && formik.touched.password
                            && formik.touched.repeatPassword  && <article>{formik.errors.password}</article>}
                        {formik.errors.email
                        && formik.touched.email
                        && <article>{formik.errors.email}</article>}

                        <Button type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                        >
                            Login
                        </Button>
                        <p>Already have an account?</p>
                            <p onClick={()=>navigate('/login')}>Sign In</p>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
};

export default Registration;
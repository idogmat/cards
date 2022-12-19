import React from 'react';
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import SuperCheckbox from "../common/SuperCheckbox/SuperCheckbox";
import {Button, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
const Login = () => {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (values.password.length < 8){
                errors.password = 'Invalid password length'
            }
            return errors
        },
        onSubmit: (values, {resetForm}) => {
            console.log(values)
            // dispatch(loginThunk(values))
        },
    })
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
                        {formik.errors.password
                            && formik.touched.password
                            && <article>{formik.errors.password}</article>}
                        {formik.errors.email
                            && formik.touched.email
                            && <article>{formik.errors.email}</article>}

                        <FormControlLabel
                            label={'Remember me'} control={<SuperCheckbox/>}
                            {...formik.getFieldProps('rememberMe')}

                        />
                        <p onClick={()=>navigate('/resetPassword')}>Forgot Password?</p>

                        <Button type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                                >
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
};

export default Login;
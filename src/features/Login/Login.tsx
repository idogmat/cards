import Button from "@mui/material/Button/Button";
import FormControl from "@mui/material/FormControl/FormControl";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { loginTC } from "./loginThunks";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { hasError } from "../../common/utils/errorHandlers";
import { useAllSelector, useAppDispatch } from "../../common/hooks";
import { validMail } from "../../common/utils/regExp";
import { appStateSelect } from "../../app/selectors";
import { Preloader } from "../../common/components/Preloader/Preloader";
import styles from "../../common/styles/common.module.css";

interface ILoginErrorType {
  email?: string;
  password?: string;
  rememberMe?: boolean;
}

export const Login = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAllSelector(appStateSelect);
  const [showPassword, setShowPassword] = useState(false);

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: ILoginErrorType = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (!validMail.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (values.password.length < 8) {
        errors.password = "Invalid password length";
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(loginTC(values));
    },
  });
  const changePasswordFieldType = () => setShowPassword((prev) => !prev);
  const passwordFieldType = showPassword ? "text" : "password";
  const loginHasError = hasError.bind(null, loginForm);
  return (
    <Grid
      container
      justifyContent={"center"}
      alignContent={"center"}
      sx={{ height: "100vh" }}
    >
      <Grid
        item
        justifyContent={"center"}
        xs={3}
        sx={{
          minWidth: "360px",
          position: "relative",
          pointerEvents: `${isLoading ? "none" : "auto"}`,
        }}
      >
        {isLoading && (
          <div className={styles.preventSending}>
            <Preloader />
          </div>
        )}
        <Paper sx={{ padding: "35px" }}>
          <form onSubmit={loginForm.handleSubmit}>
            <FormControl sx={{ width: "100%", textAlign: "center" }}>
              <FormLabel>
                <Typography variant={"h3"} sx={{ textAlign: "center" }}>
                  Sign in
                </Typography>
              </FormLabel>
              <FormGroup>
                <TextField
                  error={loginHasError("email")}
                  label={
                    loginHasError("email") ? loginForm.errors.email : "Email"
                  }
                  margin={"normal"}
                  variant={"standard"}
                  {...loginForm.getFieldProps("email")}
                />
                <TextField
                  sx={{
                    marginBottom: "1rem",
                  }}
                  error={loginHasError("password")}
                  label={
                    loginHasError("password")
                      ? loginForm.errors.password
                      : "Password"
                  }
                  margin={"normal"}
                  type={passwordFieldType}
                  variant={"standard"}
                  {...loginForm.getFieldProps("password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position={"end"}>
                        <IconButton onClick={changePasswordFieldType}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormGroup>
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox />}
                {...loginForm.getFieldProps("rememberMe")}
                checked={loginForm.values.rememberMe}
              />
              <Typography sx={{ marginBottom: "1rem", textAlign: "end" }}>
                <Link to={"/recovery"}>Forgot Password?</Link>
              </Typography>

              <Button
                type={"submit"}
                variant={"contained"}
                disabled={loginHasError("email") || loginHasError("password")}
                color={"primary"}
                sx={{ borderRadius: "30px", marginBottom: "30px" }}
              >
                Sign in
              </Button>
              <Typography mb={1} variant={"subtitle1"} component={"span"}>
                Haven't account?
              </Typography>
              <Typography sx={{ fontSize: "16px", color: "#366EFF" }}>
                <Link to={"/register"} style={{ color: "inherit" }}>
                  Sign up
                </Link>
              </Typography>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

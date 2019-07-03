import React from "react";
import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { EmailTextField, PasswordTextField, ButtonSubmit } from "..";
import { inputForm, textField, errorMassage } from "./SignInForm.module.css";

const validate = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Required")
    .required("Required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/,
      "Required"
    )
    .required("Required")
});

const useStyles = makeStyles(theme => ({
  container: {
    margin: 0,
    padding: 0,
    width: "550px",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
}));

export default function SignInForm(props) {
  const classes = useStyles();
  return (
    <div className={inputForm}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validate}
        onSubmit={values => console.log(values)}
        render={props => (
          <form
            className={classes.container}
            autoComplete="off"
            onSubmit={props.handleSubmit}
          >
            <div className={textField}>
              <EmailTextField
                name="email"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
              />
              <div className={errorMassage}>
                <ErrorMessage name="email" />
              </div>
            </div>
            <div className={textField}>
              <PasswordTextField
                name="password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
              />
              <div className={errorMassage}>
                <ErrorMessage name="password" className={errorMassage} />
              </div>
            </div>
            <ButtonSubmit type="submit" />
          </form>
        )}
      />
    </div>
  );
}

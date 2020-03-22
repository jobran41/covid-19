import * as React from "react";
import { Formik, Form, Field } from "formik";
import {withRouter} from 'react-router-dom';

import {
  Button,
/*   LinearProgress,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel */
} from "@material-ui/core";
import MuiTextField from "@material-ui/core/TextField";
import {
  fieldToTextField,
  TextField,
  TextFieldProps ,
/*   Select,
  Switch */
} from "formik-material-ui";
/* import {
  TimePicker,
  DatePicker,
  DateTimePicker
} from "formik-material-ui-pickers"; */
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {submitLogin} from "../../auth/store/actions/login.actions"
import { connect } from "react-redux";

function UpperCasingTextField(props) {
  const {
    form: { setFieldValue },
    field: { name }
  } = props;
  const onChange = React.useCallback(
    event => {
      const { value } = event.target;
      setFieldValue(name, value ? value.toUpperCase() : "");
    },
    [setFieldValue, name]
  );
  return (
    <MuiTextField
      {...fieldToTextField({
        label: "Outlined",
        variant: "outlined",
        ...props
      })}
      onChange={onChange}
    />
  );
}

const Login = (props) => {
const [email, setEmail] = React.useState('')
const [password, setPassword] = React.useState('')
  return (
  <Formik
    initialValues={{
      email: "",
      password: "",
    }}
    validate={values => {
      const errors = {};

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (values.password === "") {
        errors.password = "Required";
      }
      if (values.password.length < 8) {
        errors.password = "password must be 8 caractere";
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      const {submitLogin}=props
      console.log('values', values)
      setSubmitting(false)
      submitLogin(values).then(res=>{
        props.history.push('/dashboard')
      })
    }}
    render={({resetForm, submitForm, isSubmitting, values, setFieldValue }) => (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Form style={{
            width:"50%",
            margin:"0 auto"
        }}>
          <div
            style={{
              margin: 10
            }}
          >
            <Field
              component={UpperCasingTextField}
              name="email"
              type="email"
              label="Email"
              value={email}
              onChange={v=>setEmail(v.target.value.toLowerCase())}
            />
            <Field
              value={password}
              component={TextField}
              type="password"
              label="Password"
              name="password"
              variant="outlined"
              onChange={v=>setPassword(v.target.value)}
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Valider
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={resetForm}
            >
              clear
            </Button>
          </div>
        </Form>
      </MuiPickersUtilsProvider>
    )}
  />)
};

export default  connect(null,{submitLogin})(Login);

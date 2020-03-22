import * as React from "react";
import { Formik, Form, Field } from "formik";
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

const App = () => (
  <Formik
    initialValues={{
      email: "",
      nom: "",
      prenom: "",
      cin: "",
      adresse: ""
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
      if (values.nom === "") {
        errors.nom = "Required";
      }
      if (values.prenom === "") {
        errors.prenom = "Required";
      }
      if (values.cin === "") {
        errors.cin = "Required";
      }
      if (values.adresse === "") {
        errors.adresse = "Required";
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
        alert(JSON.stringify(values, null, 2));
      }, 500);
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
            />
            <Field
              component={TextField}
              type="password"
              label="Password"
              name="Password"
              variant="outlined"
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
  />
);

export default App;

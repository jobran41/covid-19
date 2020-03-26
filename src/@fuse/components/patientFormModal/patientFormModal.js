import * as React from "react";
import { Modal } from "@fuse";
import { Formik, Form, Field } from "formik";
import { withRouter } from "react-router-dom";
import QuestionEducation from "./QuestionEducation";
import {
  Button
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
  TextFieldProps
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

const PatientFormModal = ({
  staticCount,
  dynamicCount,
  modalAction,
  dataModal,
  submitFormCallback,
  updateResponse
}) => {
  const handleClose = id => {
    modalAction(id);
  };

/*   function UpperCasingTextField(props) {
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
  } */
  const getAllState = data => {
    updateResponse(data);
  };
  console.log("dynamicCount,  staticCount,", dynamicCount, staticCount);
  return (
    <Modal className="patientForm" id="PatientForm" ModalAction={modalAction}>
      <div className="modal-header">
        <h4>FORMULAIRE DE MALADIE</h4>
        <button onClick={() => handleClose("PatientForm")}>x</button>
      </div>
      <div className="modal-content">
        {dataModal &&
          dataModal.map(el => {
            return (
              <div className="question-list">
                <h4>{el.label}</h4>
                {el.questions.map((elem, i) => (
                  <QuestionEducation
                    index={i}
                    key={elem.id}
                    getState={getAllState}
                    title={elem.fr_value}
                    description={elem.ar_value}
                    {...elem}
                  />
                ))}
              </div>
            );
          })}
        <h4 className="personnal-question-title">Données Personnelles</h4>
        <Formik
          initialValues={{
            email: "",
            nom: "",
            prenom: "",
            adresse: "",
            mytel: "",
            zipcode:""
          }}
          validate={values => {
            const errors = {};
            // if (!values.email) {
            //   errors.email = "Required";
            // } else if (
            //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            // ) {
            //   errors.email = "Invalid email address";
            // }
            if (values.nom === "") {
              errors.nom = "Required";
            }
            if (values.prenom === "") {
              errors.prenom = "Required";
            }
            /*          if (values.cin === "") {
              errors.cin = "Required";
            } */
            if (values.adresse === "") {
              errors.adresse = "Required";
            }else if (values.adresse.length < 5) {
              errors.adresse = "invalid length";
            }

            if (values.mytel === "") {
              errors.mytel = "Required";
            } else if (values.mytel.length <= 7) {
              errors.mytel = "invalid length";
            }
          

            if (values.zipcode === "") {
              errors.zipcode = "Required";
            }else if (values.zipcode.length <= 3) {
              errors.zipcode = "zip code must be 4 number";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const caste = {
              firstName: values.prenom,
              lastName: values.nom,
              address: values.adresse,
              zipCode: values.zipcode,
              phoneNumber: values.mytel
            };
            submitFormCallback(caste);
          }}
          render={({
            resetForm,
            submitForm,
            isSubmitting,
            values,
            setFieldValue
          }) => (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Form>
                <div
                  style={{
                    margin: 10
                  }}
                >
                  <Field
                    component={TextField}
                    type="text"
                    label="Nom"
                    name="nom"
                    variant="outlined"
                    style={{
                      margin: "0 12px"
                    }}
                  />
                  <Field
                    component={TextField}
                    type="text"
                    label="Prenom"
                    name="prenom"
                    variant="outlined"
                    style={{
                      margin: "0 12px"
                    }}
                  />
                </div>
                <div
                  style={{
                    margin: 10
                  }}
                >
                  <Field
                    component={TextField}
                    type="text"
                    label="Adress"
                    name="adresse"
                    variant="outlined"
                    style={{
                      margin: "0 12px"
                    }}
                  />
                </div>

                {/*  <Field
                    component={TextField}
                    type="text"
                    label="Cin"
                    name="cin"
                    variant="outlined"
                    style={{
                      margin: "0 12px"
                    }}
                  /> */}
                <div
                  style={{
                    margin: 10
                  }}
                >
                  <Field
                    component={TextField}
                    type="text"
                    label="Numero de telephone"
                    name="mytel"
                    variant="outlined"
                    style={{
                      margin: "0 12px"
                    }}
                  />

                  {/* <Field
                    component={UpperCasingTextField}
                    name="email"
                    type="email"
                    label="Email"
                    style={{
                      margin: "0 12px"
                    }}
                  /> */}
                  <Field
                    component={TextField}
                    type="text"
                    label="Zip Code"
                    name="zipcode"
                    variant="outlined"
                    style={{
                      margin: "0 12px"
                    }}
                  />
                </div>
                {/*                <div
                  style={{
                    margin: 10
                  }}
                >
                  <Field
                    component={TextField}
                    type="number"
                    label="Numerode telephone"
                    name="tel"
                    variant="outlined"
                    style={{
                      margin: "0 12px"
                    }}
                  />
                </div> */}
                <div className="action-buttons">
                  <Button
                    className="cancel"
                    variant="outlined"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={() => {
                      resetForm();
                      handleClose("PatientForm");
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    className="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={() => {
                     // if (staticCount === dynamicCount) {
                        submitForm();
                     // } else {
                     //   alert("Merci de répondre à toutes les questions");
                    //  }
                    }}
                  >
                    Valider
                  </Button>
                </div>
              </Form>
            </MuiPickersUtilsProvider>
          )}
        />
      </div>
    </Modal>
  );
};

export default withRouter(PatientFormModal);

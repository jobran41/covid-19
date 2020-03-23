import React from "react";
import { Modal } from "@fuse";
import { Formik, Form, Field } from "formik";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import MuiTextField from "@material-ui/core/TextField";
import {
  fieldToTextField,
  TextField,
  TextFieldProps
} from "formik-material-ui";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const InformModal = ({ modalAction, submitForm, history }) => {
  const handleClose = id => {
    modalAction(id);
  };

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

  return (
    <Modal className="informer" id="Inform" ModalAction={modalAction}>
      <div>
        <div>formulaire de dénonciation</div>
        <Button
          onClick={() => {
            handleClose("Inform");
          }}
        >
          x
        </Button>
      </div>
      <Formik
        initialValues={{
          emailDenonciateur: "",
          nomDenonciateur: "",
          prenomDenonciateur: "",
          cinDenonciateur: "",
          adresseDenonciateur: "",
          codePostalDenonciateur: "",
          numeroDenonciateur: "",
          nomCoupable: "",
          prenomCoupable: "",
          adresseCoupable: "",
          commentaire: ""
        }}
        validate={values => {
          const errors = {};

          if (!values.emailDenonciateur) {
            errors.emailDenonciateur = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
              values.emailDenonciateur
            )
          ) {
            errors.emailDenonciateur = "Invalid email address";
          }
          if (values.nomDenonciateur === "") {
            errors.nomDenonciateur = "Required";
          }
          if (values.prenomDenonciateur === "") {
            errors.prenomDenonciateur = "Required";
          }
          if (values.cinDenonciateur === "") {
            errors.cinDenonciateur = "Required";
          } else if (!/^[0-9]*$/i.test(values.cinDenonciateur)) {
            errors.cinDenonciateur = "Invalid CIN number";
          }
          if (values.adresseDenonciateur === "") {
            errors.adresseDenonciateur = "Required";
          }
          if (values.codePostalDenonciateur === "") {
            errors.codePostalDenonciateur = "Required";
          } else if (!/^[0-9]*$/i.test(values.codePostalDenonciateur)) {
            errors.codePostalDenonciateur = "Invalid postal code";
          }
          if (values.numeroDenonciateur === "") {
            errors.numeroDenonciateur = "Required";
          } else if (
            values.numeroDenonciateur.length !== 8 ||
            !/^[0-9]*$/i.test(values.numeroDenonciateur)
          ) {
            errors.numeroDenonciateur = "Invalid phone number";
          }
          if (values.nomCoupable === "") {
            errors.nomCoupable = "Required";
          }
          if (values.prenomCoupable === "") {
            errors.prenomCoupable = "Required";
          }
          if (values.adresseCoupable === "") {
            errors.adresseCoupable = "Required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log("values", values);
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {props => (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Form
              onSubmit={() => {
                submitForm(props.values);
              }}
            >
              <h2>1.Données du dénonciateur</h2>
              <div
                style={{
                  margin: 10
                }}
              >
                <div>
                  <div> Nom</div>
                  <Field
                    component={TextField}
                    type="text"
                    name="nomDenonciateur"
                    variant="outlined"
                  />
                </div>
                <div>
                  <div> Prenom</div>
                  <Field
                    component={TextField}
                    type="text"
                    name="prenomDenonciateur"
                    variant="outlined"
                  />
                </div>
              </div>
              <div
                style={{
                  margin: 10
                }}
              >
                <div> CIN</div>

                <Field
                  component={TextField}
                  type="text"
                  name="cinDenonciateur"
                  variant="outlined"
                />
                <div> Adresse</div>

                <Field
                  component={TextField}
                  type="text"
                  name="adresseDenonciateur"
                  variant="outlined"
                />
              </div>
              <div
                style={{
                  margin: 10
                }}
              >
                <div> Code Postal</div>

                <Field
                  component={TextField}
                  name="codePostalDenonciateur"
                  label="code Postal"
                  variant="outlined"
                />
                <div> numéro de téléphone</div>

                <Field
                  component={TextField}
                  type="text"
                  name="numeroDenonciateur"
                  variant="outlined"
                />
              </div>
              <div
                style={{
                  margin: 10
                }}
              >
                <h2>2.Données du coupable</h2>
                <div> Nom</div>

                <Field
                  component={TextField}
                  type="text"
                  name="nomCoupable"
                  variant="outlined"
                />
                <div> Prénom</div>

                <Field
                  component={TextField}
                  type="text"
                  name="prenomCoupable"
                  variant="outlined"
                />
              </div>
              <div> Adresse</div>
              <Field
                component={TextField}
                type="text"
                name="adresseCoupable"
                variant="outlined"
              />
              <div> Commentaire</div>
              <Field
                component={TextField}
                type="text"
                name="commentaire"
                variant="outlined"
              />
              <div>
                <Button variant="contained" component="label">
                  Telecharger un fichier{" "}
                  <input type="file" style={{ display: "none" }} />
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={props.isSubmitting}
                  onClick={() => {
                    history.push("/envoiyer/jo");
                  }}
                >
                  Valider
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={props.isSubmitting}
                  onClick={() => {
                    props.resetForm();
                    handleClose("Inform");
                  }}
                >
                  Annuler
                </Button>
              </div>
            </Form>
          </MuiPickersUtilsProvider>
        )}
      </Formik>
    </Modal>
  );
};

export default withRouter(InformModal);

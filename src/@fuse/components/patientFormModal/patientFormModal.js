import * as React from "react";
import { Modal } from "@fuse";
import { Formik, Form, Field } from "formik";
import {withRouter} from 'react-router-dom';
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

const helpers = [
  {
    section: "Question Generale",
    questions: [
      {
        id: 1,
        fr_value: "Étiez vous à l'étranger récemment ?",
        ar_value: "هل كنت  في الخارج مؤخرًا ؟",
        oui: false,
        non: false
      },
      {
        id: 2,
        fr_value:
          "Étiez vous en contact avec une personne venant de l'étranger ?",
        ar_value: "هل كنت على اتصال بشخص قادم  من الخارج ؟",
        oui: false,
        non: false
      },
      {
        id: 3,
        fr_value:
          "Étiez en contact avec une personne qui a été testée positive ?",
        ar_value: "هل كنت على اتصال بشخص كانت نتيجة اختباره إيجابية ؟",
        oui: false,
        non: false
      },
      {
        id: 4,
        fr_value: "Quel est votre âge ?",
        ar_value: "كم عمرك ؟",
        oui: false,
        non: false
      },
      {
        id: 5,
        fr_value: "Êtes vous diabétique ? (oui, non)",
        ar_value: "هل تعاني من مرض السكري ؟",
        oui: false,
        non: false
      },
      {
        id: 6,
        fr_value:
          "Avez vous une maladie respiratoire ? êtes vous suivi par un pneumologue ? (oui, non)",
        ar_value: "هل تعاني من مرض تنفسي؟ هل يتابعك طبيب مختص في أمراض الرئة ؟",
        oui: false,
        non: false
      },
      {
        id: 7,
        fr_value:
          "Avez-vous de l'hypertension artérielle ? Ou avez-vous une maladie cardiaque ou vasculaire ? Ou prenez-vous un traitement à visée cardiologique ? (oui, non, je ne sais pas)",
        ar_value:
          "هل تعاني من ارتفاع ضغط الدم؟ أو لديك مرض القلب أو الأوعية الدموية؟ هل  تأخذ علاج للقلب ؟",
        oui: false,
        non: false
      },
      {
        id: 8,
        fr_value:
          "Avez-vous une insuffisance rénale chronique dialysée ? (oui, non)",
        ar_value: "هل تعاني من قصور كلوي ؟",
        oui: false,
        non: false
      },
      {
        id: 9,
        fr_value: "Avez-vous une maladie chronique de foie ? (oui, non)",
        ar_value: "هل لديك مرض مزمن في الكبد ؟",
        oui: false,
        non: false
      },
      {
        id: 10,
        fr_value: "Avez vous ou avez vous eu un cancer ? (oui, non)",
        ar_value: "هل لديك أو كان  لديك مرض سرطان ؟",
        oui: false,
        non: false
      },
      {
        id: 11,
        fr_value: "Êtes vous enceinte ?(oui, non, non applicable) ?",
        ar_value: "هل أنت حامل ؟",
        oui: false,
        non: false
      },
      {
        id: 12,
        fr_value:
          "Avez-vous une maladie connue diminuer vos défenses immunitaires ? (oui, non)",
        ar_value: "هل تعاني من مرض ينقص من مناعتك؟",
        oui: false,
        non: false
      },
      {
        id: 13,
        fr_value: "Prenez vous un traitement immunosuppresseur ? (oui, non)",
        ar_value: "هل تتناول علاج مثبط للمناعة ؟",
        oui: false,
        non: false
      },
      {
        id: 14,
        fr_value:
          "Avez-vous de la fièvre, des frissons, des sueurs ? (oui, non)",
        ar_value: "هل تعاني من الحمى والرعشة والتعرق ؟",
        oui: false,
        non: false
      },
      {
        id: 15,
        fr_value: "Si oui indiquez la temperature ?",
        ar_value: "إذا كان الجواب نعم ، حدد درجة الحرارة؟",
        oui: false,
        non: false
      },
      {
        id: 16,
        fr_value:
          "Avez-vous une toux ou une augmentation de votre toux habituelle ces derniers jours ? (oui, non)",
        ar_value:
          "هل تعاني من السعال  أو زيادة في السعال المعتاد  في الأيام القليلة الماضية ؟",
        oui: false,
        non: false
      },
      {
        id: 17,
        fr_value:
          "Avez-vous un mal de gorge apparu ces derniers jours ? (oui, non)",
        ar_value: "هل أصبت بالتهاب حنجرة  في الأيام الأخيرة ؟",
        oui: false,
        non: false
      }
    ]
  },
  {
    section: "section Medical",
    questions: [
      {
        id: 18,
        fr_value: "Avez-vous des maux de tête ? (oui, non)",
        ar_value: "هل تعاني من آلام بالرأس ؟",
        oui: false,
        non: false
      },
      {
        id: 19,
        fr_value:
          "Avez-vous des douleurs musculaires ou des courbatures inhabituelles ces derniers jours ? (oui, non)",
        ar_value:
          "هل عانيت من آلام أو آلام عضلية غير معتادة في الأيام القليلة الماضية ؟",
        oui: false,
        non: false
      },
      {
        id: 20,
        fr_value:
          "Avez-vous une fatigue inhabituelle ces derniers jours ? (oui, non)",
        ar_value: "هل تعاني من تعب غير معتاد  في الأيام الأخيرة ؟",
        oui: false,
        non: false
      },
      {
        id: 21,
        fr_value:
          "Avez-vous une gêne respiratoire ou une augmentation de votre gêne respiratoire inhabituelle ? (oui, non)",
        ar_value: "هل  تعاني من صعوبة في التنفس ؟",
        oui: false,
        non: false
      }
    ]
  }
];

const PatientFormModal = ({ modalAction,history }) => {
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
  const getAllState = data => {
    console.log("data", data);
  };

  return (
    <Modal id="PatientForm" ModalAction={modalAction}>
      <button onClick={() => handleClose("PatientForm")}>close </button>
      {helpers.map(el => {
        return (
          <>
            <h4>{el.section}</h4>
            {el.questions.map(elem => (
              <QuestionEducation
                key={elem.id}
                getState={getAllState}
                title={elem.fr_value}
                description={elem.ar_value}
              />
            ))}
          </>
        );
      })}
      <h3>Donner Personnel</h3>
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
                />
                <Field
                  component={TextField}
                  type="text"
                  label="Prenom"
                  name="prenom"
                  variant="outlined"
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
                  label="Cin"
                  name="cin"
                  variant="outlined"
                />
                <Field
                  component={TextField}
                  type="text"
                  label="Adress"
                  name="adresse"
                  variant="outlined"
                />
              </div>

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
                  type="number"
                  label="Numerode telephone"
                  name="adresse"
                  variant="outlined"
                />
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={()=>{
                    submitForm()
                    history.push('/envoiyer/jo')
                  }}
                >
                  Valider
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={resetForm}
                >
                  Annuler
                </Button>
              </div>
            </Form>
          </MuiPickersUtilsProvider>
        )}
      />
    </Modal>
  );
};

export default withRouter(PatientFormModal);

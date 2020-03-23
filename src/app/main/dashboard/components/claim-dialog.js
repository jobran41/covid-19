import React, { useState, useEffect } from "react";
import {
  Dialog,
  Grid,
  Select,
  MenuItem,
  TextField,
  Button,
  InputLabel,
  Divider
} from "@material-ui/core";
import { Send } from "@material-ui/icons";

import ellipse from "../ellipse.svg";
import group from "../group.svg";

const predefinedResponses = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
];

const ClaimDialog = ({
  visible = false,
  isSent = false,
  onClose,
  onSendSMS,
  onClickNext,
  patient
}) => {
  const [response, setResponse] = useState("");
  const [open, setOpen] = useState(false);
  const [condition, setCondition] = useState(null);

  useEffect(() => {}, []);

  console.log("patient", patient);

  const {
    guid,
    first_name,
    last_name,
    address,
    zip_code,
    phone_number,
    responses
  } = patient;

  const handleChange = event => {
    setResponse(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const renderClassName = value => {
    switch (value) {
      case "0":
        return "critique-active";

      case "1":
        return "stable-active";

      default:
        return "urgent-active";
    }
  };

  const renderValue = (value, type) => {
    if (type === 1) {
      switch (value) {
        case "0":
          return "non";

        case "1":
          return "oui";

        default:
          break;
      }
    } else if (type === 2) {
      switch (value) {
        case "0":
          return "non";

        case "1":
          return "oui";

        default:
          return "neutre";
      }
    } else {
      switch (value) {
        case "0":
          return "non";

        case "1":
          return "oui";

        default:
          return "N/A";
      }
    }
  };

  const renderQuestions = cat => {
    return responses[cat].map(q => {
      return (
        <div className="single-question">
          <p> {q.question.fr_value}</p>
          {[1, 2, 3].indexOf(q.question.type) >= 0 && (
            <Button
              variant="outlined"
              disabled
              className={renderClassName(q.response.value)}
            >
              {renderValue(q.response.value, q.question.type)}
            </Button>
          )}
          {q.question.type === 4 && (
            <TextField
              id={q.question.id}
              className="question-textfield"
              label=""
              disabled
              variant="outlined"
              value={q.response.value}
            />
          )}
        </div>
      );
    });
  };

  const renderCategories = () => {
    return (
      responses &&
      Object.keys(responses).map((cat, index) => {
        switch (cat) {
          case "CATEGORY_GENERAL":
            return (
              <div>
                <h3>{index + 1}.Quéstions génarales</h3>
                {renderQuestions(cat)}
              </div>
            );
          case "CATEGORY_ANTECEDENT":
            return (
              <div>
                <h3>{index + 1}.Quéstions médicales</h3>
                {renderQuestions(cat)}
              </div>
            );
          case "CATEGORY_SYMPTOMS":
            return (
              <div>
                <h3>{index + 1}.les symptomes</h3>
                {renderQuestions(cat)}
              </div>
            );

          default:
            break;
        }
      })
    );
  };

  return (
    <Dialog
      className="claim-dialog"
      onClose={onClose}
      aria-labelledby="Claim Dialog"
      open={visible}
      fullWidth={true}
      maxWidth={"md"}
    >
      {!isSent && (
        <Grid container spacing={0}>
          <Grid item md={6} xs={12}>
            <div className="claim-dialog-form">
              <div className="claim-dialog-user-info">
                <p>
                  nom: <span>{last_name}</span>
                </p>
                <p>
                  prénom: <span>{first_name}</span>
                </p>
                <p>
                  adresse: <span>{address}</span>
                </p>
                <p>
                  code postal: <span>{zip_code}</span>
                </p>
                <p>
                  numéro de téléphone: <span>{phone_number}</span>
                </p>
              </div>
              <Divider />
              <div className="claim-dialog-message">
                <InputLabel id="select-response-label">
                  utilisez une réponse rapide
                </InputLabel>
                <Select
                  labelId="select-response-label"
                  id="select-response"
                  className="select-response"
                  label="utilisez une réponse rapide"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={response}
                  onChange={handleChange}
                >
                  {predefinedResponses.map(response => (
                    <MenuItem value={response}>{response}</MenuItem>
                  ))}
                </Select>
                <TextField
                  id="standard-multiline-static"
                  className="text-response"
                  label=""
                  placeholder="ecrire un message"
                  multiline
                  rows="4"
                  variant="outlined"
                  value={response}
                  onChange={handleChange}
                />
              </div>
              <div className="conditions">
                <Button
                  variant="outlined"
                  className={condition === "stable" && "stable-active"}
                  onClick={() =>
                    condition === "stable"
                      ? setCondition(null)
                      : setCondition("stable")
                  }
                >
                  stable
                </Button>
                <Button
                  variant="outlined"
                  className={condition === "urgent" && "urgent-active"}
                  onClick={() =>
                    condition === "urgent"
                      ? setCondition(null)
                      : setCondition("urgent")
                  }
                >
                  urgent
                </Button>
                <Button
                  variant="outlined"
                  className={condition === "critique" && "critique-active"}
                  onClick={() =>
                    condition === "critique"
                      ? setCondition(null)
                      : setCondition("critique")
                  }
                >
                  critique
                </Button>
              </div>
              <Button
                variant="outlined"
                onClick={() => {
                  onSendSMS();
                  setCondition(null);
                  setResponse("");
                }}
                disabled={!condition || !response}
              >
                envoyer sms
              </Button>
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="claim-dialog-questions">{renderCategories()}</div>
          </Grid>
        </Grid>
      )}

      {isSent && (
        <div className="issent">
          <div className="issent-content">
            <img alt="" class="Ellipse" src={ellipse} />
            <button class="send">
              <img alt="" src={group} />
            </button>
            <Send />
            <h2> Merci Beaucoup docteur!</h2>
          </div>
          <Divider />
          <div className="issent-actions">
            <Button variant="outlined" size="small" onClick={onClose}>
              reviens au dashboard
            </Button>
            <Button
              className="issent-actions-btn"
              size="large"
              onClick={onClickNext}
            >
              traiter la réclamation suivant
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  );
};
export default ClaimDialog;

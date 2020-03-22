import React, { useState } from "react";
import {
  Dialog,
  Grid,
  Select,
  MenuItem,
  TextField,
  Button
} from "@material-ui/core";

const helper = {
  nom: "doe",
  prenom: "john",
  adresse: "test",
  codePostal: "111",
  telephone: "4444"
};

const predefinedResponses = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
];

const ClaimDialog = ({ visible = false, onClose, onSendSMS }) => {
  const [response, setResponse] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = event => {
    setResponse(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Dialog
      className="claim-dialog"
      onClose={onClose}
      aria-labelledby="Claim Dialog"
      open={visible}
    >
      <Grid container spacing={0}>
        <Grid item md={6} xs={12}>
          <div className="claim-dialog-user-info">
            <p>
              nom: <span>{helper.nom}</span>
            </p>
            <p>
              prénom: <span>{helper.prenom}</span>
            </p>
            <p>
              adresse: <span>{helper.adresse}</span>
            </p>
            <p>
              code postal: <span>{helper.codePostal}</span>
            </p>
            <p>
              numéro de téléphone: <span>{helper.telephone}</span>
            </p>
          </div>
          <div className="claim-dialog-message">
            <Select
              labelId="select-response"
              id="select-response"
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
              label=""
              placeholder="ecrire un message"
              multiline
              rows="4"
              variant="outlined"
              value={response}
              onChange={handleChange}
            />
          </div>
          <Button variant="outlined" onClick={onSendSMS}>
            envoyer sms
          </Button>
        </Grid>
        <Grid item md={6} xs={12}>
          <div className="claim-dialog-questions">
            <h4> 1.Questions générales</h4>
          </div>
        </Grid>
      </Grid>
    </Dialog>
  );
};
export default ClaimDialog;

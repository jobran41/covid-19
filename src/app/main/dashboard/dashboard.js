import React, { useState } from "react";
import { Button, Container, Grid } from "@material-ui/core";

import ClaimDialog from "./components/claim-dialog";

import "./dashboard.scss";

const helper = [
  {
    id: 5,
    guid: "PAT-2147483647",
    first_name: "test",
    last_name: "test",
    cin: "test",
    address: "string",
    zip_code: "2222",
    phone_number: 22222222,
    status: "ON_HOLD"
  },
  {
    id: 6,
    guid: "PAT-2147483647",
    first_name: "test",
    last_name: "test",
    cin: "test1",
    address: "string",
    zip_code: "2222",
    phone_number: 22222222,
    status: "IN_PROGRESS"
  },
  {
    id: 7,
    guid: "PAT-2147483647",
    first_name: "test",
    last_name: "test",
    cin: "tests",
    address: "string",
    zip_code: "2222",
    phone_number: 22222222,
    status: "ON_HOLD"
  }
];

const listOfStatus = ["non-traité", "en cours de traitment", "traité"];

const Dashboard = () => {
  const [visible, setVisible] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const filterPatients = status => {
    let currentStatus = "ON_HOLD";
    switch (status) {
      case "non-traité":
        currentStatus = "ON_HOLD";
        break;
      case "en cours de traitment":
        currentStatus = "IN_PROGRESS";
        break;
      case "traité":
        currentStatus = "CLOSED";
        break;

      default:
        break;
    }
    return helper.filter(({ status }) => status === currentStatus);
  };

  const renderPatients = status => {
    return filterPatients(status).map(
      ({ first_name, last_name, phone_number }) => (
        <div className="single-patient">
          <h4>{first_name + " " + last_name}</h4>
          <span> {phone_number}</span>
        </div>
      )
    );
  };

  const renderColumns = () => {
    return listOfStatus.map(elem => (
      <Grid item md={4} xs={12}>
        <div className={`single-column ${elem.replace(/ /g, "-")}`}>
          <div>
            {elem} <span>({filterPatients(elem).length})</span>
          </div>
          <div className="patients">{renderPatients(elem)}</div>
        </div>
      </Grid>
    ));
  };

  return (
    <div className="dashboard">
      <Container maxWidth="md">
        <header>
          <h2>Bienvenu au Dashboard des docteurs!</h2>
          <p>Cliquez au-dessous pour commoncer a traiter les reclamations</p>

          <Button variant="outlined" onClick={() => setVisible(true)}>
            traiter une reclamation
          </Button>
        </header>
        <Grid className="columns" container spacing={4}>
          {renderColumns()}
        </Grid>
        {visible && (
          <ClaimDialog
            visible={visible}
            isSent={isSent}
            onClose={() => {
              setVisible(false);
              setIsSent(false);
            }}
            onSendSMS={() => setIsSent(true)}
            onClickNext={() => setIsSent(false)}
          />
        )}
      </Container>
    </div>
  );
};
export default Dashboard;

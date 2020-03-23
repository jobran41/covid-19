import React, { Component, useState } from "react";
import MuiTextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const QuestionEducation = props => {
  const [stateNon, setStateNon] = useState(false);
  const [stateOui, setStateOui] = useState(false);
  const [extraField, setExtraField] = useState("");

  const handleClickOui = () => {
    setStateOui(true);
    setStateNon(false);
    props.getState({ stateNon, stateNon, title: props.title });
  };
  const handleClickNon = () => {
    setStateOui(false);
    setStateNon(true);
    props.getState({ stateNon, stateNon, title: props.title });
  };

  return (
    <div className="question-item">
      <h5>{props.title}</h5>
      <p className="arabic-question">{props.description}</p>
      <div>
        <Button
          className=""
          variant={`${stateOui ? "contained" : "outline"}`}
          style={{
            border: "1px solid #11B683",
            borderRadius: 20,
            margin: 10,
            backgroundColor: stateOui ? "#11B683" : "white",
            color: stateOui ? "white" : "#11B683",
            boxShadow: stateOui ? "none" : "none",
            padding: "8px 28px"
          }}
          color="primary"
          onClick={handleClickOui}
        >
          OUI
        </Button>
        <Button
          className=""
          variant={`${stateNon ? "contained" : "outline"}`}
          color="primary"
          style={{
            border: "1px solid #E23B42",
            borderRadius: 20,
            margin: 10,
            backgroundColor: stateNon ? "#E23B42" : "white",
            color: stateNon ? "white" : "#E23B42",
            boxShadow: stateNon ? "none" : "none",
            padding: "8px 28px"
          }}
          onClick={handleClickNon}
        >
          non
        </Button>
        <div>
          {props.withTextField && (
            <>
              <p>{props.textField}</p>
              <MuiTextField
                variant="outlined"
                value={extraField}
                id="filled-basic"
                onChange={v => setExtraField(v.target.value)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default QuestionEducation;

import axios from "axios";

export const getPatient = async () => {
  const response = await axios
    .get("https://api.ensembletn.beecoop.co/api/v1/secured/treat-patient")
    .catch(err => {
      throw new Error(err);
    });

  return response;
};

export const getAllPatients = async () => {
  const response = await axios
    .get("https://api.ensembletn.beecoop.co/api/v1/secured/patient")
    .catch(err => {
      throw new Error(err);
    });

  return response;
};

export const patchPatient = async (status, guid) => {
  console.log("guid,status", guid,status);
  if(guid){
    const response = await axios
    .patch(`https://api.ensembletn.beecoop.co/api/v1/secured/patient/${guid}`, {
      status: status
    })
    .catch(err => {
      alert(err)
     // throw new Error(err);
    });
    return response;
  }
};

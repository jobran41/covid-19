import axios from "axios";

export const getPatient = async () => {
  const response = await axios
    .get("http://api.ensembletn.beecoop.co/api/v1/secured/treat-patient")
    .catch(err => {
      throw new Error(err);
    });

  return response;
};

export const getAllPatients = async () => {
  const response = await axios
    .get("http://api.ensembletn.beecoop.co/api/v1/secured/patient")
    .catch(err => {
      throw new Error(err);
    });

  return response;
};

export const patchPatient = async (status, guid) => {
  console.log("guid", guid);
  const response = await axios
    .patch(`http://api.ensembletn.beecoop.co/api/v1/secured/patient/${guid}`, {
      status: status
    })
    .catch(err => {
      throw new Error(err);
    });

  return response;
};

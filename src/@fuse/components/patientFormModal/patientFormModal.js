import React from "react";
import { Modal } from "@fuse";

const PatientFormModal = ({ modalAction }) => {
  const handleClose = id => {
    modalAction(id);
  };

  return (
    <Modal id="PatientForm" ModalAction={modalAction}>
      <button onClick={() => handleClose("PatientForm")}>close </button>
    </Modal>
  );
};

export default PatientFormModal;

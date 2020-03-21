import React from "react";
import { Modal } from "@fuse";

const InformModal = ({ modalAction }) => {
  const handleClose = id => {
    modalAction(id);
  };

  return (
    <Modal id="Inform" ModalAction={modalAction}>
      <button onClick={() => handleClose("Inform")}>close </button>
    </Modal>
  );
};

export default InformModal;

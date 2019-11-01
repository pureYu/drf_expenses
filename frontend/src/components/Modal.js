import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";


//const Modal = ({ handleClose, show, children }) => {
//  const showHideClassName = show ? "modal display-block" : "modal display-none";
//
//  return (
//    <div className={showHideClassname}>
//      <section className="modal-main">
//        {children}
//        <button onClick={handleClose}>close</button>
//      </section>
//    </div>
//  );
//};


export default class CustomModal extends Component {

  render() {
    const { toggle, onSave, mTitle } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> {mTitle} </ModalHeader>
        <ModalBody>

          {this.props.children}

        </ModalBody>
      </Modal>
    );
  }
}
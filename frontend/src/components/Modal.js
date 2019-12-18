import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";


export default class CustomModal extends Component {

  render() {
    const { toggle, mTitle } = this.props;
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
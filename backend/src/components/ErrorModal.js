import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap"; 

/**
 *
 * Renders a Error modal if app encounter any error.
 */

export default class ErrorModal extends Component {
  state = {};
  render() {
    return (
      <Modal show={this.props.show}>
        <ModalHeader>
          Error
        </ModalHeader>

        <ModalBody>
          <h1 className="text-center">
            {/* <Glyphicon glyph="alert" /> */}
          </h1>
          <h5 className="text-center">{this.props.errorMessage}</h5>
        </ModalBody>
      </Modal>
    );
  }
}

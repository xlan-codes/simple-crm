import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap"; 

/**
 *
 * Renders a loader modal.
 */

export default class LoadingModal extends Component {
  state = {};
  render() {
    return (
      <Modal show={this.props.show}>
        <ModalBody>
          <h1 className="text-center">
            {/* <Glyphicon glyph="refresh" /> */}
          </h1>
          <h5 className="text-center">Loading...</h5>
        </ModalBody>
      </Modal>
    );
  }
}

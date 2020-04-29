import React, { Component } from "react";
import {
  MessageList,
  Navbar as NavbarComponent,
  Avatar
} from "react-chat-elements";
import { Col, Input, FormGroup, InputGroup, Jumbotron, Button } from 'reactstrap';

/**
 *
 * ChatBox Component
 *
 * displays all the messages from chat history.
 * renders message text box for input.
 */

export default class ChatBox extends Component {
  state = {
    messageText: ""
  };
  /**
   *
   * Sends a message only if it is not falsy.
   */
  onSendClicked() {
    if (!this.state.messageText) {
      return;
    }
    this.props.onSendClicked(this.state.messageText);
    this.setState({ messageText: "" });
  }
  onMessageInputChange(e) {
    this.setState({ messageText: e.target.value });
  }
  /**
   *
   * @param {KeyboardEvent}
   *
   * listen for enter pressed and sends the message.
   */
  onMessageKeyPress(e) {
    if (e.key === "Enter") {
      this.onSendClicked();
    }
  }

  render() {
    return (
      <div>
        {this.props.targetUser ? (
          <div>
            <NavbarComponent
              left={
                <div>
                  <Col>
                    <p className="navBarText">
                      {/* <Glyphicon
                        onClick={this.props.onBackPressed}
                        glyph="chevron-left"
                      /> */}
                    </p>
                  </Col>
                  <Avatar
                    src= {require(`../assets/img/brand/avatar.png`)}
                    alt={"logo"}
                    size="large"
                    type="circle flexible"
                  />
                  <p className="navBarText">{this.props.targetUser.RoomCode}</p>
                </div>
              }
            />
            <MessageList
              className="message-list"
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={
                [
                  {
                    position: 'right',
                    type: 'text',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                    date: new Date(),
                },
                ]
              }
            />
            <FormGroup>
              <InputGroup>
                <Input
                  type="text"
                  value={this.state.messageText}
                  onChange={this.onMessageInputChange.bind(this)}
                  onKeyPress={this.onMessageKeyPress.bind(this)}
                  placeholder="Type a message here..."
                  ref="messageTextBox"
                  className="messageTextBox"
                  // maxLength="3000"
                  autoFocus
                />
                  <Button
                    disabled={!this.state.messageText}
                    className="sendButton"
                    onClick={this.onSendClicked.bind(this)}
                  >
                    Send
                  </Button>
              </InputGroup>
            </FormGroup>
          </div>
        ) : (
          <div>
            <Jumbotron>
              <h1>Hello, {(this.props.signedInUser || {}).name}!</h1>
              <p>Select a room to start a chat.</p>
            </Jumbotron>
          </div>
        )}
      </div>
    );
  }
}

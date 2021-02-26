import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";

function ReactAlert(props) {
  if (props.message.successMsg.title !== "") {
    return (
      <Alert variant="success" onClose={props.setSuccess} dismissible>
        <Alert.Heading>{props.message.successMsg.title}</Alert.Heading>
        <p>{props.message.successMsg.text}</p>
      </Alert>
    );
  } else {
    return (
      <Alert variant="danger" onClose={props.setError} dismissible>
        <Alert.Heading>{props.message.errorMsg.title}</Alert.Heading>
        <p>{props.message.errorMsg.text}</p>
      </Alert>
    );
  }
}

export default ReactAlert;

import React, { Component } from "react";
import { Container, FormGroup } from "reactstrap";
import { inject, observer } from "mobx-react";
import {
  Layout,
  Form,
  Icon,
  Button,
  Checkbox,
  Input,
  Modal,
  Label,
  Alert
} from "antd";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.hideShow = this.handleShow.bind(this);
  }

  handleShow() {
    console.log(this.state);
    this.setState({
      visible: true
    });
  }

  hideShow() {
    this.setState({
      visible: false
    });
  }

  handleFormValidity = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Recieved values from form:", values);
      }
    });
  };

  render() {}
}

export default inject("userStore")(observer(RegisterForm));

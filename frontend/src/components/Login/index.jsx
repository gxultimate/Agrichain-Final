import React, { Component } from "react";

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
  Alert,
  message
} from "antd";

import "./style.css";
import WrapLogin from "./login";

class Login extends Component {
  render() {
    return (
      <Layout>
        <div className="bg" style={{ height: "100%", width: "100%" }}>
          <WrapLogin />
        </div>
      </Layout>
    );
  }
}

export default inject("userStore")(observer(Login));

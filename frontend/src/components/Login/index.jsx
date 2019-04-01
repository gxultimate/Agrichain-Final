import "./index.css";
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

//
import WrapLogin from "./login";

class Login extends Component {
  render() {
    return (
      <Layout className="bg-light">
        <div>
          <WrapLogin />
        </div>
      </Layout>
    );
  }
}

export default inject("userStore")(observer(Login));

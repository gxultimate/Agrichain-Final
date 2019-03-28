import React, { Component, PropTypes } from "react";
import { BrowserRouter as Route, Redirect, withRouter } from "react-router-dom";

import ReactDOM from "react-dom";
import { Container } from "reactstrap";
import { inject, observer } from "mobx-react";
import {
  Layout,
  Form,
  Icon,
  Button,
  Checkbox,
  Input,
  Modal,
  message
} from "antd";
import WrapRegister from "./register";
import WrapForgot from "./forgotpass";

message.config({
  top: 150,
  duration: 2
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleWallet = this.handleWallet.bind(this);
  }
  state = {
    visible: false,
    display: false
  };

  handleWallet(event) {
    const msg = message.loading("wow", 100);
    setTimeout(msg, 2500);
    this.props.history.push("/wallet");
  }

  toggleModalReg() {
    this.setState({
      visible: !this.state.visible
    });
  }

  toggleForgotPassModal() {
    this.setState({
      display: !this.state.display
    });
  }

  render() {
    const authenticate = () => {
      const hide = message.loading("Logging In...", 0);
      setTimeout(hide, 2500);
    };
    let { getFieldDecorator } = this.props.form;
    let {
      userStore: { currentUser, loginUser }
    } = this.props;
    return (
      <div>
        <div>
          <WrapRegister
            toggleModal={this.state.visible}
            onCancel={this.toggleModalReg.bind(this)}
          />
        </div>
        <div>
          <WrapForgot
            toggleModal={this.state.display}
            onCancel={this.toggleForgotPassModal.bind(this)}
          />
        </div>

        <Layout>
          <Layout.Content>
            <Form className="login-form" id="login-form">
              <Form.Item>
                {getFieldDecorator("userName", {
                  rules: [
                    { required: true, message: "please input your username" }
                  ]
                })(
                  <Input
                    size="large"
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
                    onKeyPress={userName =>
                      currentUser.setProperty("userName", userName.target.value)
                    }
                    pattern="[a-z][a-zA-Z0-9-_\.]{1,15}$"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "please input your password"
                    }
                  ]
                })(
                  <Input
                    size="large"
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                    onChange={passWord =>
                      currentUser.setProperty("passWord", passWord.target.value)
                    }
                    pattern="[a-z][a-zA-Z0-9-_\.]{1,15}$"
                    required
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Checkbox>Remember me</Checkbox>
                <Button
                  href="#"
                  className="login-form-forgot btnReg"
                  onClick={this.toggleForgotPassModal.bind(this)}
                >
                  Forgot Password?
                </Button>
                <div className="btn-group-login">
                  <Button
                    type="primary"
                    className="login-form-button"
                    size="large"
                    onClick={() => {
                      loginUser();
                      authenticate();
                      this.handleWallet();
                    }}
                  >
                    Log in
                  </Button>
                  Or
                  <Button
                    className="btnReg"
                    id="btnReg"
                    onClick={this.toggleModalReg.bind(this)}
                  >
                    register now!
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Layout.Content>
        </Layout>
      </div>
    );
  }
}

const WrapLogin = Form.create()(LoginForm);

export default withRouter(inject("userStore")(observer(WrapLogin)));

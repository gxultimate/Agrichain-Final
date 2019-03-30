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
  Spin,
  notification
} from "antd";
import WrapRegister from "./register";
import WrapForgot from "./forgotpass";

const antIcon = (
  <Icon type="loading" style={{ fontSize: 24, color: "white" }} spin />
);

// const {
//   FormWithConstraints,
//   FieldFeedbacks,
//   FieldFeedback
// } = ReactFormWithConstraints;

class LoginForm extends Component {
  constructor(props) {
    super(props);
    // this.handleWallet = this.handleWallet.bind(this);
  }
  state = {
    visible: false,
    display: false,
    redirect: false
  };

  // handleChange = e => {
  //   this.form.validateFields(e.target);
  // };

  // contactSubmit = e => {
  //   e.preventDefaault();
  // this.form.validateFields();
  // if (!this.form.isValid()){
  //   console.log("form is invalid")
  // }
  // else{
  //   console.log(form)
  // }

  // };

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

  handleLogin = () => {
    let {
      userStore: { loginUser }
    } = this.props;

    loginUser().then(res => {
      if (res) {
        notification["success"]({
          message: "Welcome Back User!",
          description: "",
          duration: 2,
          onClick: () => {
            console.log("Notification Clicked!");
          }
        });
        return this.props.history.push("/wallet");
      } else {
        notification["error"]({
          message: "Login Error",
          description: "username or password was invalid",
          duration: 2,
          onClick: () => {
            console.log("Notification Clicked!");
          }
        });
        return this.props.history.push("/");
      }
    });
  };

  render() {
    // let { getFieldDecorator } = this.props.form;
    let {
      userStore: { currentUser, isLoading, loginUser, resp, isLoggedIn }
    } = this.props;

    const handleWallet = () => {};

    return (
      <Layout>
        <Layout>
          <WrapRegister
            toggleModal={this.state.visible}
            onCancel={this.toggleModalReg.bind(this)}
          />
        </Layout>
        <Layout>
          <WrapForgot
            toggleModal={this.state.display}
            onCancel={this.toggleForgotPassModal.bind(this)}
          />
        </Layout>

        <Layout>
          <Layout.Content>
            <Form className="login-form" id="login-form">
              <Form.Item>
                {/* {getFieldDecorator("userName", {
                  rules: [
                    { required: true, message: "please input your username" }
                  ]
                })(
            
                )} */}
                <Input
                  size="large"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                  onChange={userName =>
                    currentUser.setProperty("userName", userName.target.value)
                  }
                  pattern="[a-z][a-zA-Z0-9-_\.]{1,15}$"
                />
              </Form.Item>
              <Form.Item>
                {/* {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "please input your password"
                    }
                  ]
                })(
                 
                )} */}
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
                      this.handleLogin();
                      // authenticate();
                      // handleWallet();
                      // console.log(currentUser);
                    }}
                  >
                    {isLoading ? <Spin indicator={antIcon} /> : "Log in"}
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
      </Layout>
    );
  }
}

// const WrapLogin = Form.create()(LoginForm);

// export default withRouter(inject("userStore")(observer(WrapLogin)));
export default withRouter(inject("userStore")(observer(LoginForm)));

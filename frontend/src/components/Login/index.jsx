import "./index.css";
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

export const Head = () => {
  return (
    <head>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
      <script
        src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"
      />
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"
      />
      <script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Overpass"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
        crossorigin="anonymous"
      />
      <script src="../login/js/jquery-3.3.1.min.js" />
      <script src="../login/js/jquerysession.js" />
      <script src="../login/js/notify.min.js" />
    </head>
  );
};

class Login extends Component {
  state = {
    visible: true,
    registermodalIsOpen: false,
    forgotmodalIsOpen: false
  };

  handleChange(event) {
    const target = event.target;
    const value = target.name === "wow" ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  toggleAlert() {
    this.setState({
      visible: !this.state.visible
    });
  }

  toggleRegisterModal() {
    this.setState({
      registermodalIsOpen: !this.state.registermodalIsOpen
    });
  }

  toggleForgotPassModal() {
    this.setState({
      forgotmodalIsOpen: !this.state.forgotmodalIsOpen
    });
  }

  handleFormValidity(event) {
    if (!event.target.checkValidity()) {
      return console.log("wrong");
    }
    console.log("wew");
  }

  loginForm() {
    let {
      userStore: { currentUser, loginUser }
    } = this.props;

    return (
      <Layout>
        <Layout.Content>
          <Form className="login-form" id="login-form">
            <Form.Item>
              {
                <Input
                  size="large"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                  onChange={
                    (username =>
                      currentUser.setProperty(
                        "username",
                        username.target.value
                      ),
                    this.handleFormValidity)
                  }
                  pattern="[a-z]{1,15}"
                  required
                />
              }
            </Form.Item>
            <Form.Item>
              {
                <Input
                  size="large"
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                  onChange={password =>
                    currentUser.setProperty("password", password.target.value)
                  }
                  required
                />
              }
            </Form.Item>
            <Form.Item>
              <Checkbox>Remember me</Checkbox>
              <Button
                href="#"
                onClick={this.toggleForgotPassModal.bind(this)}
                className="login-form-forgot btnReg"
              >
                Forgot Password?
              </Button>
              <div className="btn-group-login">
                <Button
                  type="primary"
                  className="login-form-button"
                  size="large"
                  onClick={(loginUser, this.clearBox)}
                >
                  {" "}
                  Log in
                </Button>{" "}
                Or{" "}
                <Button
                  className="btnReg"
                  id="btnReg"
                  onClick={this.toggleRegisterModal.bind(this)}
                >
                  register now!
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Layout.Content>
      </Layout>
    );
  }

  registerModal() {
    let {
      userStore: { getUserData, postData, user, registerUser }
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <Container>
        <Modal
          visible={this.state.registermodalIsOpen}
          onCancel={this.toggleRegisterModal.bind(this)}
          title="Sign Up"
          footer={(null, null)}
          size="md"
        >
          {" "}
          <div className="regForm">
            <Form {...formItemLayout} onSubmit={postData}>
              <Form.Item label="* Full Name">
                <Input
                  name="fullName"
                  type="text"
                  onChange={fullName =>
                    user.setProperty("fullName", fullName.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label="* Cooperative Name">
                <Input
                  name="coopName"
                  type="text"
                  onChange={coopName =>
                    user.setProperty("coopName", coopName.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label="* Current Address">
                <Input
                  name="currentAddress"
                  type="text"
                  onChange={currAddress =>
                    user.setProperty("currAddress", currAddress.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label="* Mobile Number">
                <Input
                  name="mobileNumber"
                  type="text"
                  onChange={contactNum =>
                    user.setProperty("contactNum", contactNum.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label="* Username">
                <Input
                  name="username"
                  type="text"
                  onChange={username =>
                    user.setProperty("username", username.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label="* Password">
                <Input
                  name="password"
                  type="password"
                  onChange={password =>
                    user.setProperty("password", password.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label="* Repeat Password">
                <Input
                  name="rpassword"
                  type="password"
                  onChange={rpassword =>
                    user.setProperty("rpassword", rpassword.target.value)
                  }
                />
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  className="login-form-button btnRegForm"
                  size="large"
                  onClick={() => {
                    // getUser();
                    registerUser();
                  }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </Container>
    );
  }

  forgotPasswordModal() {
    let {
      userStore: { user, forgotPasswordUser }
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <Container>
        <Modal
          visible={this.state.forgotmodalIsOpen}
          onCancel={this.toggleForgotPassModal.bind(this)}
          title="Change Password"
          footer={(null, null)}
          size="md"
        >
          {" "}
          <div className="forgForm">
            <Form {...formItemLayout}>
              <Form.Item label="* Username">
                <Input
                  name="username"
                  type="text"
                  onChange={username =>
                    user.setProperty("username", username.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label="* Password">
                <Input
                  name="password"
                  type="password"
                  onChange={password =>
                    user.setProperty("password", password.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label="* Repeat Password">
                <Input
                  name="rpassword"
                  type="password"
                  onChange={rpassword =>
                    user.setProperty("rpassword", rpassword.target.value)
                  }
                />
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  className="login-form-button btnRegForm"
                  size="large"
                  onClick={forgotPasswordUser}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </Container>
      //
    );
  }

  render() {
    return (
      <Layout className="bg-light">
        <div>{this.loginForm()}</div>
        <div>{this.registerModal()}</div>
        <div>{this.forgotPasswordModal()}</div>
      </Layout>
    );
  }
}
export default inject("userStore")(observer(Login));

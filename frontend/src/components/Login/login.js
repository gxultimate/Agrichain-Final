import React, { Component } from "react";
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

message.config({
  top: 150,
  duration: 2
});

class LoginForm extends Component {
  state = {
    visible: false,
    display: false
  };

  toggleModal() {
    this.setState({
      visible: !this.state.visible
    });
  }

  toggleForgotPassModal() {
    this.setState({
      display: !this.state.display
    });
  }
  RegisterForm() {
    const authenticate = () => {
      const hide = message.loading("Creating an Account...", 0);
      setTimeout(hide, 2500);
    };
    let {
      userStore: { getUserData, postData, user, registerUser }
    } = this.props;
    let { getFieldDecorator } = this.props.form;
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
          visible={this.state.visible}
          onCancel={this.toggleModal.bind(this)}
          title="Sign Up"
          footer={(null, null)}
          size="md"
        >
          {" "}
          <div className="regForm">
            <Form {...formItemLayout} onSubmit={this.handleFormValidity}>
              <Form.Item label=" Full Name">
                {getFieldDecorator("fullname", {
                  rules: [
                    { required: true, message: "please input your full name" }
                  ]
                })(
                  <Input
                    name="fullName"
                    type="text"
                    onChange={fullName =>
                      user.setProperty("fullName", fullName.target.value)
                    }
                  />
                )}
              </Form.Item>
              <Form.Item label=" Cooperative Name">
                {getFieldDecorator("coopname", {
                  rules: [
                    {
                      required: true,
                      message: "cooperative name is required"
                    }
                  ]
                })(
                  <Input
                    name="coopName"
                    type="text"
                    onChange={coopName =>
                      user.setProperty("coopName", coopName.target.value)
                    }
                  />
                )}
              </Form.Item>
              <Form.Item label=" Current Address">
                {getFieldDecorator("currentAddress", {
                  rules: [{ required: true, message: "address is required" }]
                })(
                  <Input
                    name="currentAddress"
                    type="text"
                    onChange={currAddress =>
                      user.setProperty("currAddress", currAddress.target.value)
                    }
                  />
                )}
              </Form.Item>
              <Form.Item label="Mobile Number">
                {getFieldDecorator("contactNum", {
                  rules: [
                    { required: true, message: "contact number is required" }
                  ]
                })(
                  <Input
                    name="mobileNumber"
                    type="text"
                    onChange={contactNum =>
                      user.setProperty("contactNum", contactNum.target.value)
                    }
                  />
                )}
              </Form.Item>
              <Form.Item label=" Username">
                {getFieldDecorator("username", {
                  rules: [{ required: true, message: "username is required" }]
                })(
                  <Input
                    name="username"
                    type="text"
                    onChange={username =>
                      user.setProperty("username", username.target.value)
                    }
                  />
                )}
              </Form.Item>
              <Form.Item label=" Password">
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "password is required" }]
                })(
                  <Input
                    name="password"
                    type="password"
                    onChange={password =>
                      user.setProperty("password", password.target.value)
                    }
                  />
                )}
              </Form.Item>
              <Form.Item label=" Repeat Password">
                {getFieldDecorator("rpassword", {
                  rules: [
                    { required: true, message: "please repeat your password" }
                  ]
                })(
                  <Input
                    name="rpassword"
                    type="password"
                    onChange={rpassword =>
                      user.setProperty("rpassword", rpassword.target.value)
                    }
                  />
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  className="login-form-button btnRegForm"
                  size="large"
                  onClick={(registerUser(), authenticate)}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </Container>
    );
  }

  ForgotForm() {
    const { getFieldDecorator } = this.props.form;
    const authenticate = () => {
      const hide = message.loading("Changing Password...", 0);
      setTimeout(hide, 2500);
    };
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
          visible={this.state.display}
          onCancel={this.toggleForgotPassModal.bind(this)}
          title="Change Password"
          footer={(null, null)}
          size="md"
        >
          {" "}
          <div className="forgForm">
            <Form {...formItemLayout}>
              <Form.Item label=" Username">
                {getFieldDecorator("username", {
                  rules: [{ required: true, message: "username is required" }]
                })(
                  <Input
                    name="username"
                    type="text"
                    onChange={username =>
                      user.setProperty("username", username.target.value)
                    }
                  />
                )}
              </Form.Item>
              <Form.Item label=" Password">
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "password is required" }]
                })(
                  <Input
                    name="password"
                    type="password"
                    onChange={password =>
                      user.setProperty("password", password.target.value)
                    }
                  />
                )}
              </Form.Item>
              <Form.Item label=" Repeat Password">
                {getFieldDecorator("rpassword", {
                  rules: [{ required: true, message: "rpassword is required" }]
                })(
                  <Input
                    name="rpassword"
                    type="password"
                    onChange={rpassword =>
                      user.setProperty("rpassword", rpassword.target.value)
                    }
                  />
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  className="login-form-button btnRegForm"
                  size="md"
                  onClick={(forgotPasswordUser, authenticate)}
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
    let { getFieldDecorator } = this.props.form;
    let {
      userStore: { currentUser, loginUser }
    } = this.props;
    return (
      <div>
        <div>{this.RegisterForm()}</div>
        <div>{this.ForgotForm()}</div>
        <Layout>
          <Layout.Content>
            <Form className="login-form" id="login-form">
              <Form.Item>
                {getFieldDecorator("username", {
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
                    onChange={username =>
                      currentUser.setProperty("username", username.target.value)
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
                    onChange={
                      (password =>
                        currentUser.setProperty(
                          "password",
                          password.target.value
                        ),
                      this.handleFormValidity)
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
                    onClick={loginUser}
                  >
                    Log in
                  </Button>
                  Or
                  <Button
                    className="btnReg"
                    id="btnReg"
                    onClick={this.toggleModal.bind(this)}
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

export default inject("userStore")(observer(WrapLogin));

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
  Alert,
  message
} from "antd";

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

export default inject("userStore")(
  observer(
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
              rules: [{ required: true, message: "contact number is required" }]
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
              onClick={(registerUser, authenticate)}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
);

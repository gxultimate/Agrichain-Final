import React, { Component } from "react";

import { Container } from "reactstrap";
import { inject, observer } from "mobx-react";
import { Form, Button, Input, Modal, message } from "antd";

message.config({
  top: 150,
  duration: 2
});

class RegisterForm extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    visible: false
  };

  toggleModalRegister = () => {
    this.setState({
      visible: !this.props.toggleModal
    });
  };
  render() {
    const authenticate = () => {
      const hide = message.loading("Creating an Account...", 0);
      setTimeout(hide, 2500);
    };

    let {
      userStore: { checkName, postData, user, registerUser }
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
          visible={this.props.toggleModal}
          onCancel={this.props.onCancel}
          title="Sign Up"
          footer={(null, null)}
          size="md"
        >
          {" "}
          <div className="regForm">
            <Form {...formItemLayout}>
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
                {getFieldDecorator("userName", {
                  rules: [{ required: true, message: "username is required" }]
                })(
                  <Input
                    name="userName"
                    type="text"
                    onChange={userName =>
                      user.setProperty("userName", userName.target.value)
                    }
                  />
                )}
              </Form.Item>
              <Form.Item label=" Password">
                {getFieldDecorator("passWord", {
                  rules: [{ required: true, message: "password is required" }]
                })(
                  <Input
                    name="passWord"
                    type="password"
                    onChange={passWord =>
                      user.setProperty("passWord", passWord.target.value)
                    }
                  />
                )}
              </Form.Item>
              <Form.Item label=" Repeat Password">
                {getFieldDecorator("rpassWord", {
                  rules: [
                    { required: true, message: "please repeat your password" }
                  ]
                })(
                  <Input
                    name="rpassWord"
                    type="password"
                    onChange={rpassWord =>
                      user.setProperty("rpassWord", rpassWord.target.value)
                    }
                  />
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  className="login-form-button btnRegForm"
                  size="large"
                  onClick={() => {
                    registerUser();
                  }}
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
}

const WrapRegister = Form.create()(RegisterForm);
export default inject("userStore")(observer(WrapRegister));

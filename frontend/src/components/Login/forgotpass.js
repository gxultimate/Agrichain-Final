import React, { Component } from "react";
import { Container } from "reactstrap";
import { inject, observer } from "mobx-react";
import { Form, Button, Input, Modal, message } from "antd";

class ForgotForm extends Component {
  state = {
    visible: true,
    registermodalIsOpen: false,
    forgotmodalIsOpen: false
  };

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

  handleFormValidity = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Recieved values from form:", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const authenticate = () => {
      const hide = message.loading("Changing Password...", 0);
      setTimeout(hide, 2500);
    };
    let {
      userStore: { user, forgotPasswordUser, checkName }
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
          visible={this.props.toggleModal}
          onCancel={this.props.onCancel}
          title="Change Password"
          footer={(null, null)}
          size="md"
        >
          {" "}
          <div className="forgForm">
            <Form {...formItemLayout}>
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
                  rules: [{ required: true, message: "please repeat password" }]
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
                  size="default"
                  onClick={() => {
                    forgotPasswordUser();
                    authenticate();
                  }}
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
}

const WrapForgot = Form.create()(ForgotForm);
export default inject("userStore")(observer(WrapForgot));

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
              <Form.Item label="* Password">
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
              <Form.Item label="* Repeat Password">
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
}

const WrapForgot = Form.create()(ForgotForm);
export default inject("userStore")(observer(WrapForgot));

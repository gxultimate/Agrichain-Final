import React, { Component } from "react";

import { Container } from "reactstrap";
import { inject, observer } from "mobx-react";
import {
  Form,
  Button,
  Input,
  Modal,
  message,
  Popconfirm,
  Popover,
  Col
} from "antd";
import { BrowserRouter as Route, withRouter } from "react-router-dom";
message.config({
  top: 150,
  duration: 2
});

class RegisterForm extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    visible: false,
    confirmDirty: false
  };

  toggleModalRegister = () => {
    this.setState({
      visible: !this.props.toggleModal
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  checkRegister = () => {
    let {
      userStore: { registerUser, registerResponse, user, cookiesRegister }
    } = this.props;
    const response = cookiesRegister.get("registerResponse");
    console.log("response", response);
    if (response == "true") {
      const success = () => {
        message
          .loading("Creating an Account...", 2.5)
          .then(() => message.success("Account Successfully Created!", 2.5));
      };

      setTimeout(success, 2000);
    } else {
      const fail = () => {
        message
          .loading("Creating an Account...", 2.5)
          .then(() => message.warning("Username already exists!", 2.5));
      };
      setTimeout(fail, 2000);
    }
  };
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  render() {
    // const authenticate = () => {
    //   if (isValid !== false) {
    //     const hide = message.loading("Creating an Account...", 0);
    //     setTimeout(hide, 2500);
    //     this.setState({ visible: !this.state.visible });
    //   } else {
    //     const hide = message.warning("UserName Already Exists...", 0);
    //     setTimeout(hzide, 2000);
    //   }
    // };

    let {
      userStore: {
        checkName,
        postData,
        user,
        registerUser,
        isValid,
        registerResponse,
        cookiesRegister
      }
    } = this.props;
    const isvalid = isValid;

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
        >
          {" "}
          <div className="regForm">
            <Form {...formItemLayout}>
              <Form.Item>
                <span>User Information</span>
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
                        user.setProperty(
                          "currAddress",
                          currAddress.target.value
                        )
                      }
                    />
                  )}
                </Form.Item>
                <Form.Item label=" Membership Type">
                  {getFieldDecorator("membershipType", {
                    rules: [
                      {
                        required: true,
                        message: "membership type is required"
                      }
                    ]
                  })(
                    <Input
                      name="membershipType"
                      type="text"
                      // onChange={authenticate()}
                      onChange={membershipType =>
                        user.setProperty(
                          "membershipType",
                          membershipType.target.value
                        )
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
                      // onChange={authenticate()}
                      onChange={userName =>
                        user.setProperty("userName", userName.target.value)
                      }
                    />
                  )}
                </Form.Item>
                <Form.Item label="Password">
                  {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your password!"
                      },
                      {
                        validator: this.validateToNextPassword
                      }
                    ]
                  })(
                    <Input.Password
                      type="password"
                      onChange={passWord =>
                        user.setProperty("passWord", passWord.target.value)
                      }
                    />
                  )}
                </Form.Item>
                <Form.Item label="Confirm Password">
                  {getFieldDecorator("confirm", {
                    rules: [
                      {
                        required: true,
                        message: "Please confirm your password!"
                      },
                      {
                        validator: this.compareToFirstPassword
                      }
                    ]
                  })(
                    <Input.Password
                      type="password"
                      onChange={rpassWord =>
                        user.setProperty("rpassWord", rpassWord.target.value)
                      }
                      onBlur={this.handleConfirmBlur}
                    />
                  )}
                </Form.Item>

                <span>Loan Information</span>
                <Form.Item label=" Occupation">
                  {getFieldDecorator("occupation", {
                    rules: [
                      {
                        required: true,
                        message: "occupation field is required"
                      }
                    ]
                  })(
                    <Input
                      name="occupation"
                      type="text"
                      // onChange={authenticate()}
                      onChange={occupation =>
                        user.setProperty("occupation", occupation.target.value)
                      }
                    />
                  )}
                </Form.Item>
                <Form.Item label=" Place of Assignment">
                  {getFieldDecorator("placeOfAssignment", {
                    rules: [
                      {
                        required: true,
                        message: " place of assignment field is required"
                      }
                    ]
                  })(
                    <Input
                      name="placeOfAssignment"
                      type="text"
                      onChange={placeOfAssignment =>
                        user.setProperty(
                          "placeOfAssignment",
                          placeOfAssignment.target.value
                        )
                      }
                    />
                  )}
                </Form.Item>
                <Form.Item label=" Position">
                  {getFieldDecorator("position", {
                    rules: [
                      {
                        required: true,
                        message: "position field is required"
                      }
                    ]
                  })(
                    <Input
                      name="position"
                      type="text"
                      // onChange={authenticate()}
                      onChange={position =>
                        user.setProperty("position", position.target.value)
                      }
                    />
                  )}
                </Form.Item>
                <Form.Item label=" Monthly Basic Salary">
                  {getFieldDecorator("monthlyBasicSalary", {
                    rules: [
                      {
                        required: true,
                        message: "monthly basic salary field is required"
                      }
                    ]
                  })(
                    <Input
                      name="monthlyBasicSalary"
                      type="text"
                      // onChange={authenticate()}
                      onChange={monthlyBasicSalary =>
                        user.setProperty(
                          "monthlyBasicSalary",
                          monthlyBasicSalary.target.value
                        )
                      }
                    />
                  )}
                </Form.Item>
                <Form.Item label=" Avenue Monthly Take Home Pay (past 6 mos.)">
                  {getFieldDecorator("avenueMonthlyTakeHomePay", {
                    rules: [
                      {
                        required: true,
                        message:
                          "avenue monthly take home pay field is required"
                      }
                    ]
                  })(
                    <Input
                      name="avenueMonthlyTakeHomePay"
                      type="text"
                      // onChange={authenticate()}
                      onChange={avenueMonthlyTakeHomePay =>
                        user.setProperty(
                          "avenueMonthlyTakeHomePay",
                          avenueMonthlyTakeHomePay.target.value
                        )
                      }
                    />
                  )}
                </Form.Item>
                <Form.Item label=" Total Monthly  Statutory Deductions">
                  {getFieldDecorator("totalMonthlyStatutoryDeductions", {
                    rules: [
                      {
                        required: true,
                        message:
                          "total monthly statutory deductions field is required"
                      }
                    ]
                  })(
                    <Input
                      name="totalMonthlyStatutoryDeductions"
                      type="text"
                      // onChange={authenticate()}
                      onChange={totalMonthlyStatutoryDeductions =>
                        user.setProperty(
                          "totalMonthlyStatutoryDeductions",
                          totalMonthlyStatutoryDeductions.target.value
                        )
                      }
                    />
                  )}
                </Form.Item>
                <Form.Item label=" Total Monthly Non-Statutory Deductions">
                  {getFieldDecorator("totalMonthlyNonStatutoryDeductions", {
                    rules: [
                      {
                        required: true,
                        message:
                          "total monthly non statutory deductions field is required"
                      }
                    ]
                  })(
                    <Input
                      name="totalMonthlyNonStatutoryDeductions"
                      type="text"
                      // onChange={authenticate()}
                      onChange={totalMonthlyNonStatutoryDeductions =>
                        user.setProperty(
                          "totalMonthlyNonStatutoryDeductions",
                          totalMonthlyNonStatutoryDeductions.target.value
                        )
                      }
                    />
                  )}
                </Form.Item>
                <Form.Item label="Contact Number Office">
                  {getFieldDecorator("contactNoOffice", {
                    rules: [
                      {
                        required: true,
                        message: "contact number office field is required"
                      }
                    ]
                  })(
                    <Input
                      name="contactNoOffice"
                      type="text"
                      // onChange={authenticate()}
                      onChange={contactNoOffice =>
                        user.setProperty(
                          "contactNoOffice",
                          contactNoOffice.target.value
                        )
                      }
                    />
                  )}
                </Form.Item>
                <Form.Item label="Residence Contact Number">
                  {getFieldDecorator("residence", {
                    rules: [
                      {
                        required: true,
                        message: "residence field is required"
                      }
                    ]
                  })(
                    <Input
                      name="residence"
                      type="text"
                      // onChange={authenticate()}
                      onChange={residence =>
                        user.setProperty("residence", residence.target.value)
                      }
                    />
                  )}
                </Form.Item>
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  className="login-form-button btnRegForm"
                  size="large"
                  onClick={() => {
                    registerUser();
                    this.checkRegister();
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
export default withRouter(inject("userStore")(observer(WrapRegister)));

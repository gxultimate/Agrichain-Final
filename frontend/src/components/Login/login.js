import React, { Component } from "react";
import { BrowserRouter as Route, withRouter } from "react-router-dom";

import { inject, observer } from "mobx-react";
import {
  Layout,
  Form,
  Icon,
  Button,
  Checkbox,
  Input,
  Spin,
  notification,
  Typography
} from "antd";
import WrapRegister from "./register";
import WrapForgot from "./forgotpass";
import "./style.css";
import axios from "axios";

const { Title } = Typography;
const antIcon = (
  <Icon type="loading" style={{ fontSize: 24, color: "white" }} spin />
);

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

  // checkPort = () => {
  //   let {
  //     userStore: { cookies }
  //   } = this.props;

  //   axios.get("http://localhost:3001/getPort").then(resp => {

  //     if (resp.data != "" || resp.data != null) {
  //       cookies.set("port", 3001);
  //     } else {
  //       axios.get("http://localhost:3002/getPort").then(resp => {
  //         if (resp.data != "" || resp.data != null) {
  //           cookies.set("port", 3002);
  //         } else {
  //           axios.get("http://localhost:3003/getPort").then(resp => {
  //             if (resp.data != "" || resp.data != null) {
  //               cookies.set("port", 3003);
  //             } else {
  //               axios.get("http://localhost:3004/getPort").then(resp => {
  //                 if (resp.data != "" || resp.data != null) {
  //                   cookies.set("port", 3004);
  //                 } else {
  //                   axios.get("http://localhost:3005/getPort").then(resp => {
  //                     if (resp.data != "" || resp.data != null) {
  //                       cookies.set("port", 3005);
  //                     } else {
  //                       axios
  //                         .get("http://localhost:3006/getPort")
  //                         .then(resp => {
  //                           if (resp.data != "" || resp.data != null) {
  //                             cookies.set("port", 3006);
  //                           } else {
  //                             axios
  //                               .get("http://localhost:3007/getPortss")
  //                               .then(resp => {
  //                                 if (resp.data != "" || resp.data != null) {
  //                                   cookies.set("port", 3007);
  //                                 }
  //                               });
  //                           }
  //                         });
  //                     }
  //                   });
  //                 }
  //               });
  //             }
  //           });
  //         }
  //       });
  //     }
  //   });
  // };

  componentDidMount() {
    let {
      userStore: { cookies, checkPort }
    } = this.props;
    checkPort();
  }
  handleLogin = () => {
    let {
      userStore: { loginUser }
    } = this.props;

    loginUser().then(res => {
      let {
        userStore: { currentUser }
      } = this.props;

      const name = currentUser.fullName;
      if (res === 2) {
        notification["success"]({
          message: `Welcome Back ${name}`,
          description: "",
          duration: 2,
          onClick: () => {
            console.log("Notification Clicked!");
          }
        });

        return this.props.history.push("/wallet");
      } else if (res === 1) {
        notification["success"]({
          message: `Welcome Back ${name}`,
          description: "",
          duration: 2,
          onClick: () => {
            console.log("Notification Clicked!");
          }
        });

        return this.props.history.push("/loan");
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
    let {
      userStore: {
        getCookie,
        currentUser,
        isLoading,
        loginUser,
        isLoggedIn,
        thing,
        cookieData
      }
    } = this.props;
    // let { getFieldDecorator } = this.props.form;
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

        <Layout className="bg">
          <Layout.Content>
            <Form className="login-form" id="login-form">
              <Form.Item>
                {/* {getFieldDecorator("userName", {
                  rules: [
                    { required: true, message: "please input your username" }
                  ]
                })()} */}
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
                })()} */}
                <Input.Password
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

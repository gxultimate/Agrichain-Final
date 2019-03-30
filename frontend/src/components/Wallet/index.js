import React, { Component } from "react";

import {
  Layout,
  Form,
  Icon,
  Button,
  Checkbox,
  Input,
  Modal,
  message,
  Menu,
  Avatar
} from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Sidebar from "./common/Sidebar";
import Headerbar from "./common/Header";
import WalletForm from "./wallet";
import CashInForm from "./cashIn";

const { Content, Header, Footer, Sider } = Layout;

class Wallet extends Component {
  render() {
    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar />
          <Layout>
            <Headerbar />

            <Content style={{ margin: "0 16px " }}>
              <div
                style={{
                  padding: 24,
                  background: "#fff",
                  marginTop: "5vh",
                  minHeight: 400,
                  height: "90%"
                }}
              >
                <Route exact path="/wallet" component={WalletForm} />
                <Route exact path="/wallet/cashin" component={CashInForm} />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default Wallet;

import React, { Component } from "react";

import { Layout, Icon, Menu } from "antd";
import { BrowserRouter as Route, withRouter } from "react-router-dom";

const { Sider } = Layout;

const SubMenu = Menu.SubMenu;

class Sidebar extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleEventWallet = () => {
    this.props.history.push("/wallet");
  };
  handleEventCashIn = () => {
    this.props.history.push("/wallet/cashin");
  };

  handleEventCashOut = () => {
    this.props.history.push("/wallet/cashout");
  };
  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        style={{ marginBottom: "5vh" }}
      >
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item
            key="1"
            style={{ marginTop: "7vh" }}
            onClick={this.handleEventWallet}
          >
            <Icon type="wallet" />
            <span>Wallet</span>
          </Menu.Item>
          <Menu.Item key="2" onClick={this.handleEventCashIn}>
            <Icon type="bank" />
            <span>Cash In</span>
          </Menu.Item>
          <Menu.Item key="3" onClick={this.handleEventCashOut}>
            <Icon type="credit-card" />
            <span>Cash Out</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="upload" />
            <span>Invest</span>
          </Menu.Item>

          <Menu.Item key="5">
            <Icon type="file-done" />
            <span>Pay Bills</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="book" />
                <span>Loans</span>
              </span>
            }
          >
            <Menu.Item key="6">
              <span>
                {" "}
                <Icon type="user-add" />
              </span>
              Agricultural
            </Menu.Item>
            <Menu.Item key="7">
              {" "}
              <span>
                {" "}
                <Icon type="warning" />
              </span>
              Emergency
            </Menu.Item>
            <Menu.Item key="8">
              <span>
                {" "}
                <Icon type="read" />
              </span>
              Educational
            </Menu.Item>

            <Menu.Item key="9">
              {" "}
              <span>
                {" "}
                <Icon type="user" />
              </span>
              Personal
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(Sidebar);

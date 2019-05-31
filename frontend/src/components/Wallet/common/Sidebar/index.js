import React, { Component } from "react";

import { Layout, Icon, Menu } from "antd";
import { BrowserRouter as Route, withRouter } from "react-router-dom";
import theme from "../../../../../package.json";
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

  handleEventPayBill = () => {
    this.props.history.push("/wallet/paybill");
  };
  handleEventAgricultural = () => {
    this.props.history.push("/wallet/agricultural");
  };
  handleEventEmergency = () => {
    this.props.history.push("/wallet/emergency");
  };
  handleEventLivelihood = () => {
    this.props.history.push("/wallet/livelihood");
  };

  handleEventShortTerm = () => {
    this.props.history.push("/wallet/short-term");
  };

  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        style={{ marginBottom: "5vh" }}
        theme="dark"
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          <Menu.Item
            key="1"
            style={{ marginTop: "7.3vh" }}
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

          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="book" />
                <span>Loans</span>
              </span>
            }
          >
            <Menu.Item key="4" onClick={this.handleEventPayBill}>
              <Icon type="file-done" />
              <span>Pay Loan</span>
            </Menu.Item>
            <Menu.Item key="5" onClick={this.handleEventAgricultural}>
              <span>
                {" "}
                <Icon type="apple" />
              </span>
              Agricultural
            </Menu.Item>
            <Menu.Item key="6" onClick={this.handleEventEmergency}>
              {" "}
              <span>
                {" "}
                <Icon type="warning" />
              </span>
              Emergency
            </Menu.Item>
            <Menu.Item key="7" onClick={this.handleEventLivelihood}>
              <span>
                {" "}
                <Icon type="shop" />
              </span>
              Livelihood
            </Menu.Item>

            <Menu.Item key="8" onClick={this.handleEventShortTerm}>
              {" "}
              <span>
                {" "}
                <Icon type="hourglass" />
              </span>
              Short Term
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(Sidebar);

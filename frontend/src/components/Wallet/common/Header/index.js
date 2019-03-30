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

const SubMenu = Menu.SubMenu;
class Headerbar extends Component {
  state = {};

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <Menu
        theme="dark"
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        style={{}}
      >
        <SubMenu
          key="sub1"
          style={{ float: "right", marginRight: "2vh" }}
          title={
            <span>
              <Icon type="user" />
              <span>Account</span>
            </span>
          }
        >
          <Menu.Item key="6">My Account</Menu.Item>
          <Menu.Item key="7">Log Out</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default Headerbar;

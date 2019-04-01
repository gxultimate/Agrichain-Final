import React, { Component } from "react";

import { Icon, Menu } from "antd";
import { inject, observer } from "mobx-react";
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
    let {
      userStore: { currentUser, cookies, thing }
    } = this.props;
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
              <span>{thing}</span>
            </span>
          }
        >
          <Menu.Item key="6" onClick={console.log(thing)}>
            My Account
          </Menu.Item>
          <Menu.Item key="7">Log Out</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default inject("userStore")(observer(Headerbar));

import React, { Component } from "react";
import { withRouter, browserHistory, Link, Redirect } from "react-router-dom";
// import { browserHistory } from "react-router";
import { Icon, Menu } from "antd";
import { inject, observer } from "mobx-react";
const SubMenu = Menu.SubMenu;
class Headerbar extends Component {
  state = {
    logout: false
  };

  handleLogout = () => {
    window.location.href = "/";
  };

  render() {
    let {
      userStore: { currentUser, cookies, thing, list }
    } = this.props;

    if (this.state.logout == true) {
      return <Redirect to={{ pathname: "/" }} />;
    }

    return (
      <Menu
        theme="dark"
        onClick={this.handleClick}
        style={{ height: "6vh " }}
        mode="horizontal"
      >
        <Menu.Item style={{ float: "left" }} key="1">
          <span>
            <Icon type="file-exclamation" />
          </span>
          Pending Loan Request
        </Menu.Item>
        <Menu.Item style={{ float: "left" }} key="2">
          <span>
            <span>
              {" "}
              <Icon type="file-done" />
            </span>
          </span>
          Approved Loan Request
        </Menu.Item>
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
          <Menu.Item key="6">My Account</Menu.Item>
          <Menu.Item key="7" onClick={() => this.handleLogout()}>
            Log Out
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default withRouter(inject("userStore")(observer(Headerbar)));

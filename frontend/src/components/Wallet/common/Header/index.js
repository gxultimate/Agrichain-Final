import React, { Component } from "react";
import { withRouter, browserHistory, Link } from "react-router-dom";
// import { browserHistory } from "react-router";
import { Icon, Menu } from "antd";
import { inject, observer } from "mobx-react";
const SubMenu = Menu.SubMenu;
class Headerbar extends Component {
  state = {
    logout: false
  };

  handleLogout = () => {
    this.props.history.push("/");
  };

  render() {
    let {
      userStore: { currentUser, cookies, thing }
    } = this.props;

    // if (this.state.logout == true) {
    //   return <Redirect to="/" />;
    // }

    return (
      <Menu
        theme="dark"
        onClick={this.handleClick}
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

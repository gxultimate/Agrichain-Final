import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Container } from "reactstrap";
import { inject, observer } from "mobx-react";
import {
  Layout,
  Form,
  Icon,
  Button,
  Checkbox,
  Input,
  Modal,
  message,
  Menu
} from "antd";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.MenuItemGroup;
class WalletForm extends Component {
  state = {};
  render() {
    return (
      <Menu>
        <Menu.Item>
          <Icon type="mail" /> Example
        </Menu.Item>
      </Menu>
    );
  }
}

export default WalletForm;

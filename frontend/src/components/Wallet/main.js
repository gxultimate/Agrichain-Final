import React, { Component } from "react";
import { Layout, Card, Row, Col, Button, Tabs, Icon, Input, Modal } from "antd";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch,
  Redirect,
  Link,
  NavLink
} from "react-router-dom";
// import { browserHistory } from "react-router";

import { inject, observer } from "mobx-react";
import WalletForm from "./wallet";
import CashInForm from "./cashIn";
import CashOutForm from "./cashOut";

class Main extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch />
        </Layout>
      </Router>
    );
  }
}

export default withRouter(Main);

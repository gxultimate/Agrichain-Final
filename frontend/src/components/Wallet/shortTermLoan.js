import React, { Component } from "react";
import { Button, Layout, Modal, Input, Form, Table, Card } from "antd";
import { inject, observer } from "mobx-react";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch
} from "react-router-dom";
class ShortTermLoan extends Component {
  state = {};
  render() {
    return (
      <Card title="ShortTerm Loan" bordered="false" style={{ width: 300 }}>
        <p>ShortTerm</p>
      </Card>
    );
  }
}

export default withRouter(inject("userStore")(observer(ShortTermLoan)));

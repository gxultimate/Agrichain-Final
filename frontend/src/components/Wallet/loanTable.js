import React, { Component } from "react";
import { Table, List, Typography, Layout, Col, Row } from "antd";
import { inject, observer } from "mobx-react";

class LoanTable extends Component {
  state = {};

  componentWillMount() {
    let {
      userStore: { getLoanRequest, listOfAmortization, getLoanAmortization }
    } = this.props;

    setInterval(() => {
      getLoanAmortization();
    }, 3000);
  }

  render() {
    let {
      userStore: {
        getLoanRequest,
        listOfAmortization,
        loanInterest,
        loanBalance,
        loanPrincipal,
        loanDueDate
      }
    } = this.props;

    const data = loanPrincipal;
    const data2 = loanInterest;
    const data3 = loanBalance;
    const data4 = loanDueDate;

    return (
      <Layout span={12}>
        <Row>
          <Col style={{ width: "25%" }} span={4}>
            <List
              size="small"
              header={<div style={{ fontSize: "2.4vh" }}>Payment Schedule</div>}
              bordered
              dataSource={data4}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Col>
          <Col style={{ width: "25%" }} span={4}>
            <List
              size="small"
              header={<div style={{ fontSize: "2.4vh" }}>Principal</div>}
              bordered
              dataSource={data}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Col>
          <Col style={{ width: "25%" }} span={8}>
            <List
              size="small"
              header={<div style={{ fontSize: "2.4vh" }}>Interest(%)</div>}
              bordered
              dataSource={data2}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Col>
          <Col style={{ width: "25%" }} span={8}>
            <List
              size="small"
              header={<div style={{ fontSize: "2.4vh" }}> Unpaid Balance</div>}
              bordered
              dataSource={data3}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default inject("userStore")(observer(LoanTable));

import React, { Component } from "react";
import {
  Button,
  Layout,
  Modal,
  Input,
  Form,
  Table,
  Card,
  Col,
  Row
} from "antd";
import { inject, observer } from "mobx-react";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch
} from "react-router-dom";

import WrapShortTermLoanModal from "./modal/shortTermLoanModal";
import LoanTable from "./loanTable";
const { Content } = Layout;
class ShortTermLoan extends Component {
  state = {
    visible: false
  };

  toggleLoanModal = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  render() {
    return (
      <Layout>
        <WrapShortTermLoanModal
          visible={this.state.visible}
          onCancel={this.toggleLoanModal.bind(this)}
        />
        <Content>
          <Row>
            <Col span={6}>
              <Card
                title="Short Term Loan"
                bordered="false"
                style={{
                  width: 300,
                  height: "100%",
                  marginTop: "4vh",
                  textAlign: "center",
                  marginLeft: "4vh",
                  marginBottom: "4vh",
                  fontSize: "3vh"
                }}
              >
                <Button
                  size="large"
                  style={{ marginTop: "35vh" }}
                  onClick={this.toggleLoanModal.bind(this)}
                >
                  Apply for this Loan
                </Button>
                <Button onClick={this.toggleLoanModal.bind(this)}>
                  Loan Calculator
                </Button>
              </Card>
            </Col>
            <Col span={17}>
              <Content style={{ marginLeft: "10vh" }}>
                <Card
                  style={{
                    height: "20vh",
                    marginTop: "4vh",
                    marginBottom: "3vh"
                  }}
                >
                  <p>
                    Short-Term Loan is intended for borrowers with existing
                    livelihood activities , vendors , trisikad and motorcycle
                    drivers with brgy. business permit , with co-maker or with
                    favorable credit and investigation report.{" "}
                  </p>
                </Card>
                <Card>
                  <LoanTable />
                </Card>
              </Content>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default withRouter(inject("userStore")(observer(ShortTermLoan)));

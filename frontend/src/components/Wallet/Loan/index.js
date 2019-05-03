import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

import { Table, Input, Button, Icon, Layout, Popconfirm, Form } from "antd";
import Headerbar from "./Header";
const { Content } = Layout;
class LoanPage extends Component {
  state = {};
  render() {
    const columns = [
      {
        title: "Loan Requests ID",
        dataIndex: "loanRequestID",
        width: "10%"
      },
      {
        title: "Type of Loan",
        dataIndex: "typeOfLoan",
        width: "10%"
      },
      {
        title: "senderWalletAddress",
        dataIndex: "senderWalletAddress",
        width: "10%"
      },
      {
        title: "Loan Applicant Name",
        dataIndex: "loanApplicantName",
        width: "10%"
      },
      {
        title: "Amount",
        dataIndex: "amount",
        width: "10%"
      },
      {
        title: "Interest (%)",
        dataIndex: "interest",
        width: "5%"
      },
      {
        title: "Term Of Loan",
        dataIndex: "termOfLoan",
        width: "5%"
      },
      {
        title: "Penalty",
        dataIndex: "penalty",
        width: "15%"
      },
      {
        title: "Service Fee",
        dataIndex: "serviceFee",
        width: "15%"
      },
      {
        title: "Action",
        dataIndex: "",

        render: data => (
          <Popconfirm
            title="Approve Loan Request?"
            trigger="click"
            onConfirm={this.toggleAddModal.bind(this)}
            onClick={() => {
              this.assignData(data);
            }}

            // onConfirm={console.log("assign", assignJob)}
          >
            <a href="javascript:;">Assign</a>
          </Popconfirm>
        )
      }
    ];
    {
      return (
        <Layout>
          <Headerbar />
          <Content
            style={{
              width: "100%",
              height: "100%",
              marginTop: "10vh",
              textAlign: "center",
              margin: "auto"
            }}
          >
            <Table
              style={{
                width: "90%",
                height: "40%",
                margin: "auto",
                textAlign: "center",

                marginTop: "10vh"
              }}
              columns={columns}
              // dataSource={listOfAllPendingJob}
              rowKey="jobID"
            />
          </Content>
        </Layout>
      );
    }
  }
}

export default withRouter(inject("userStore")(observer(LoanPage)));

import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

import { Table, Input, Button, Icon, Layout, Popconfirm, Form } from "antd";
import Headerbar from "./Header";
const { Content } = Layout;
class LoanPage extends Component {
  state = {};

  componentDidMount() {
    let {
      userStore: { getAllLoanRequest, listOfAllLoan }
    } = this.props;
    setInterval(() => {
      getAllLoanRequest();
      console.log("list", listOfAllLoan);
    }, 3000);
  }

  render() {
    let {
      userStore: { getallloanrequests, listOfAllLoan }
    } = this.props;

    const columns = [
      {
        title: "Loan Requests ID",
        dataIndex: "loanRequestID"
      },
      {
        title: "Type of Loan",
        dataIndex: "borrowerParsedTypeOfLoan"
      },
      {
        title: "senderWalletAddress",
        dataIndex: "borrowerSenderWallerAddress"
      },
      {
        title: "Loan Applicant Name",
        dataIndex: "borrowerFullname"
      },
      {
        title: "Amount",
        dataIndex: "borrowerParsedInitialAmount"
      },
      {
        title: "Interest (%)",
        dataIndex: "borrowerParsedInterest"
      },
      {
        title: "Term Of Loan",
        dataIndex: "borrowerParsedTermOfLoan"
      },
      {
        title: "Penalty",
        dataIndex: "borrowerParsedPenalty"
      },
      {
        title: "Service Fee",
        dataIndex: "borrowerParsedServiceFee1"
      },
      {
        title: "Action",
        dataIndex: "",

        render: data => (
          <Popconfirm
            title="Approve Loan Request?"
            trigger="click"
            // // onConfirm={this.toggleAddModal.bind(this)}
            // onClick={() => {
            //   this.assignData(data);
            // }}

            // onConfirm={console.log("assign", assignJob)}
          >
            <a href="javascript:;">Approve</a>
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
              dataSource={listOfAllLoan}
              rowKey="jobID"
            />
          </Content>
        </Layout>
      );
    }
  }
}

export default withRouter(inject("userStore")(observer(LoanPage)));

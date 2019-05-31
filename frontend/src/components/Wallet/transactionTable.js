import React, { Component } from "react";
import { Button, Layout, Modal, Input, Form, Table, Card } from "antd";
import { inject, observer } from "mobx-react";
import "../Login/style.css";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch
} from "react-router-dom";

class TransactionTable extends Component {
  render() {
    let {
      userStore: { getTransaction, listOfTransaction }
    } = this.props;

    const columns = [
      {
        title: "Sender Address",
        dataIndex: "senderAddress",
        width: 25
      },
      {
        title: "Date",
        dataIndex: "dateCreated",
        width: 20
      },
      {
        title: "Recipient Address",
        dataIndex: "to",
        width: 25
      },
      {
        title: "Amount",
        dataIndex: "trueAmount",
        width: 15
      },
      {
        title: "Transaction Fee",
        dataIndex: "transactionFee",
        width: 15
      },

      {
        title: "Detail",
        dataIndex: "data",
        width: 20
      }
    ];

    return (
      <Layout width="100%">
        <Table
          className="fixed"
          columns={columns}
          bordered
          dataSource={listOfTransaction}
          style={{ height: "100%", width: "auto" }}
          scroll={{ x: "150%", y: 300 }}
        />
      </Layout>
    );
  }
}

export default inject("userStore")(observer(TransactionTable));

import React, { Component } from "react";
import { Button, Layout, Modal, Input, Form, Table, Card } from "antd";
import { inject, observer } from "mobx-react";
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
        colSpan: 4
      },
      {
        title: "Date",
        dataIndex: "dateCreated"
      },
      {
        title: "Recipient Address",
        dataIndex: "to"
      },
      {
        title: "Amount",
        dataIndex: "trueAmount"
      },
      {
        title: "Transaction Fee",
        dataIndex: "transactionFee",
        colSpan: 4
      },

      {
        title: "Detail",
        dataIndex: "data",
        colSpan: 4
      }
    ];

    return (
      <Layout width="100%">
        <Table
          columns={columns}
          dataSource={listOfTransaction}
          style={{ height: "100%", textAlign: "center" }}
          scroll={{ x: 600, y: 300 }}
        />
      </Layout>
    );
  }
}

export default inject("userStore")(observer(TransactionTable));

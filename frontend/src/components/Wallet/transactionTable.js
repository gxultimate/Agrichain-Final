import React, { Component } from "react";
import {
  Button,
  Layout,
  Modal,
  Input,
  Form,
  InputNumber,
  List,
  Row,
  Col,
  Icon,
  Table
} from "antd";
import { inject, observer } from "mobx-react";

class TransactionTable extends Component {
  render() {
    let {
      userStore: { getTransaction, listOfTransaction }
    } = this.props;

    const columns = [
      {
        title: "Sender Address",
        dataIndex: "senderAddress",
        width: "10%"
      },
      {
        title: "Date",
        dataIndex: "dateCreated",
        width: "10%"
      },
      {
        title: "Recipient Address",
        dataIndex: "to",
        width: "10%"
      },
      {
        title: "Amount",
        dataIndex: "amount",
        width: "10%"
      },
      {
        title: "Transaction Fee",
        dataIndex: "transactionFee",
        width: "10%"
      },

      {
        title: "Detail",
        dataIndex: "data",
        width: "10%"
      }
    ];

    return (
      <Layout width="50%">
        <Table
          columns={columns}
          dataSource={listOfTransaction}
          style={{ height: "50%" }}
        />
      </Layout>
    );
  }
}

export default inject("userStore")(observer(TransactionTable));

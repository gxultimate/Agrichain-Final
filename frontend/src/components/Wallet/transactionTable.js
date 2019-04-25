import React, { Component } from "react";
import { Button, Layout, Modal, Input, Form, Table } from "antd";
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
        width: "8%"
      },
      {
        title: "Date",
        dataIndex: "dateCreated",
        width: "18%"
      },
      {
        title: "Recipient Address",
        dataIndex: "to",
        width: "10%"
      },
      {
        title: "Amount",
        dataIndex: "amount",
        width: "5%"
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
      <Layout width="100%">
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

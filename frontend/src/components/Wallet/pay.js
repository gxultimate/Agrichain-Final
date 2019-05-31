import React, { Component } from "react";
import {
  Layout,
  Card,
  Row,
  Col,
  Button,
  Tabs,
  Icon,
  Input,
  Modal,
  Popover,
  Popconfirm,
  Table
} from "antd";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import SendModal from "./modal/send";
import RequestModal from "./modal/request";
import { CopyToClipboard } from "react-copy-to-clipboard";
import LoanTable from "./loanTable";
import WrapPayBillModal from "./modal/payBill";
// import ClipBoard from "clipboard";
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;
function callback(key) {
  console.log(key);
}

class PayBillsForm extends Component {
  state = {
    visible: false,
    visible2: false,
    visibleSend: false,
    visibleRequest: false,
    copy: false,
    value: ""
  };
  toggleLoanModal = () => {
    this.setState({
      visible2: !this.state.visible2
    });
  };
  componentWillMount() {
    let {
      userStore: { getLoanRequest, listOfUserLoan }
    } = this.props;

    setInterval(() => {
      getLoanRequest();
    }, 3000);
  }

  toggleQrCode = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  assignData = value => {
    let {
      userStore: { currentLoan, cookies }
    } = this.props;
    console.log(value);
    currentLoan.setProperty("data", value);
  };

  render() {
    let {
      userStore: {
        getTransaction,
        listOfTransaction,
        currentUser,
        thing,
        cookies,
        listOfUserLoan,
        balance
      }
    } = this.props;

    const columns = [
      {
        title: "Date Requested",
        dataIndex: "borrowerParsedDateRequested"
      },
      {
        title: "Full Name",
        dataIndex: "borrowerFullname"
      },
      {
        title: "Co-Maker Name",
        dataIndex: "borrowerParsedCoMakerName"
      },
      {
        title: "Type of Loan",
        dataIndex: "borrowerParsedTypeOfLoan"
      },
      {
        title: "Amount Requested",
        dataIndex: "borrowerParsedAmountOfLoan"
      },
      {
        title: "Balance",
        dataIndex: "borrowerParsedLoanBalance"
      },
      {
        title: "Pay Bill",
        dataIndex: "",

        render: data => (
          <Popconfirm
            title="Sure to Pay Loan?"
            trigger="click"
            onConfirm={this.toggleLoanModal.bind(this)}
            onClick={() => {
              this.assignData(data);
            }}

            // onConfirm={console.log("assign", assignJob)}
          >
            <a href="javascript:;">Pay</a>
          </Popconfirm>
        )
      }
    ];

    const cookieData = cookies.get("userData");
    const walletAddr = cookieData["walletAddress"];
    const React = require("react");
    const QrCode = require("qrcode.react");

    return (
      <Layout>
        <WrapPayBillModal
          visible={this.state.visible2}
          onCancel={this.toggleLoanModal.bind(this)}
        />
        <Modal
          title={`${thing} Wallet Address`}
          bodyStyle={{ height: "15vh" }}
          style={{ height: "30vh" }}
          visible={this.state.visible}
          onCancel={this.toggleQrCode.bind(this)}
          footer={null}
          bodyStyle={{ scrollBehavior: true }}
        >
          <Layout style={{ marginTop: "4vh" }}>
            <Row>
              <Col>
                <Input
                  id="wallet"
                  value={`${walletAddr}`}
                  style={{ marginBottom: "4vh" }}
                  addonAfter={
                    <CopyToClipboard text={`${walletAddr}`}>
                      <Popover content={"Copied!"} trigger="click">
                        <a>
                          <Icon type="copy" />
                        </a>
                      </Popover>
                    </CopyToClipboard>
                  }
                />
                <Layout
                  style={{
                    margin: "5vh 20vh 5vh 21.5vh"
                  }}
                  theme="dark"
                >
                  <QrCode value={`${walletAddr}`} size={200} />
                </Layout>
              </Col>
            </Row>
          </Layout>
        </Modal>

        <Row>
          <Col span={6} style={{ marginRight: "2vh" }}>
            <Card
              type="inner"
              title="Agricoin"
              extra={
                <a href="#" onClick={this.toggleQrCode.bind(this)}>
                  <Icon type="qrcode" />
                </a>
              }
              bordered={false}
              style={{ height: "80vh" }}
            >
              <Card
                style={{
                  height: "20vh",
                  fontSize: "4vh",
                  textAlign: "center"
                }}
              >
                {" "}
                {balance} AGC{" "}
              </Card>
            </Card>
          </Col>
          <Col span={16} style={{ marginLeft: "4vh", height: "80vh" }}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Current Loans" key="1">
                <Table dataSource={listOfUserLoan} columns={columns} />
              </TabPane>
              <TabPane tab="Loan History" key="2">
                {" "}
                Content of Tab 2{" "}
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default withRouter(inject("userStore")(observer(PayBillsForm)));

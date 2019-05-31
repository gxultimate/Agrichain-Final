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
  Popover
} from "antd";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import SendModal from "./modal/send";
import RequestModal from "./modal/request";
import { CopyToClipboard } from "react-copy-to-clipboard";
import TransactionTable from "./transactionTable";
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;
function callback(key) {
  console.log(key);
}

class WalletForm extends Component {
  state = {
    visible: false,
    visibleSend: false,
    visibleRequest: false,
    copy: false,
    value: ""
  };

  componentDidMount() {
    let {
      userStore: { getBalance, getTransaction }
    } = this.props;
    setInterval(() => {
      getTransaction();
      getBalance();
    }, 3000);
  }

  toggleQrCode = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  toggleSendModal = () => {
    this.setState({
      visibleSend: !this.state.visibleSend
    });
  };
  toggleRequestModal = () => {
    this.setState({
      visibleRequest: !this.state.visibleRequest
    });
  };

  render() {
    let {
      userStore: { currentUser, thing, cookies, balance }
    } = this.props;

    let newBalance = 0;

    if (balance === undefined || balance === null) {
      newBalance = 0;
    } else {
      newBalance = balance;
    }

    const cookieData = cookies.get("userData");
    const walletAddr = cookieData["walletAddress"];
    const React = require("react");
    const QrCode = require("qrcode.react");

    return (
      <Layout>
        <Modal
          title={`${thing} Wallet Address`}
          bodyStyle={{ height: "30vh" }}
          style={{ height: "40vh" }}
          visible={this.state.visible}
          onCancel={this.toggleQrCode.bind(this)}
          footer={null}
          bodyStyle={{ scrollBehavior: true }}
        >
          <Layout style={{ marginTop: "4vh", backgroundColor: "white" }}>
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
        <SendModal
          visible={this.state.visibleSend}
          onCancel={this.toggleSendModal.bind(this)}
        />
        <RequestModal
          visible={this.state.visibleRequest}
          onCancel={this.toggleRequestModal.bind(this)}
        />
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
                {newBalance} AGC{" "}
              </Card>
              <ButtonGroup size="large" style={{ marginTop: "4vh" }}>
                <Button
                  span={6}
                  style={{ width: "17.5vh" }}
                  onClick={this.toggleSendModal.bind(this)}
                >
                  Send
                </Button>
                <Button
                  span={6}
                  style={{ width: "17.5vh" }}
                  onClick={this.toggleRequestModal.bind(this)}
                >
                  Request
                </Button>
              </ButtonGroup>
            </Card>
          </Col>
          <Col span={16} style={{ marginLeft: "2vh", height: "50vh" }}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Transaction History" key="1">
                <TransactionTable />
              </TabPane>
              <TabPane tab="Request History" key="2">
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

export default withRouter(inject("userStore")(observer(WalletForm)));

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
// import ClipBoard from "clipboard";
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;
function callback(key) {
  console.log(key);
}

class PayBillForm extends Component {
  state = {
    visible: false,
    visibleSend: false,
    visibleRequest: false,
    copy: false,
    value: ""
  };

  toggleQrCode = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  render() {
    let {
      userStore: { currentUser, thing, cookies }
    } = this.props;
    const hellow = "hello";
    return (
      <Layout>
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
                  value={cookies.get("walletAddr")}
                  addonAfter={
                    <CopyToClipboard text={cookies.get("walletAddr")}>
                      <Popover content={"Copied!"} trigger="click">
                        <a>
                          <Icon type="copy" />
                        </a>
                      </Popover>
                    </CopyToClipboard>
                  }
                />
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
              <Card style={{ height: "20vh" }}> AGC </Card>
            </Card>
          </Col>
          <Col span={16} style={{ marginLeft: "4vh", height: "80vh" }}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Current Loans" key="1">
                {" "}
                Content of Tab 1{" "}
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

export default withRouter(inject("userStore")(observer(PayBillForm)));

import React, { Component, useCallback, useState } from "react";

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
  Icon
} from "antd";
import { inject, observer } from "mobx-react";

import "ant-design-draggable-modal/dist/index.css";
import "./modal.css";
const FormItem = Form.Item;
const InputGroup = Input.Group;
class SendModal extends Component {
  state = {
    click: false
  };

  render() {
    const data = ["Transfer Fee ", "Recipient will Receive"];

    let {
      userStore: { currentWallet, sendTransaction, cookies }
    } = this.props;
    const cookieData = cookies.get("userData");
    const walletAddr = cookieData["walletAddress"];
    const privateKey = cookieData["privateKey"];
    const publicKey = cookieData["publicKey"];
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        footer={null}
        width={600}
        title={"Send AGC"}
        //   style={{}}
      >
        <Form className="regForm ::-webkit-scrollbar ">
          <FormItem>
            <FormItem
              style={{ margin: "auto", textAlign: "center" }}
              hidden={this.state.form}
            >
              <Row gutter={4}>
                <Col span={12}>
                  <span style={{ marginRight: "20vh" }}>Wallet Balance</span>
                </Col>
                <Col span={12}>
                  <span style={{ marginRight: "31.5vh" }}>Amount</span>
                </Col>
              </Row>
              <InputGroup size="large" compact>
                <Row gutter={4}>
                  <Col span={12}>
                    <Input
                      disabled
                      style={{ width: "100%" }}
                      addonBefore={
                        <span>
                          <Icon type="wallet" />
                        </span>
                      }
                      readOnly
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="0.000000"
                      addonAfter={<span>AGC</span>}
                      onChange={amount => {
                        currentWallet.setProperty(
                          "amount",
                          amount.target.value
                        );
                      }}
                    />
                  </Col>
                </Row>
              </InputGroup>
            </FormItem>
            <FormItem style={{ textAlign: "center", marginTop: "4vh" }}>
              <span
                style={{
                  float: "left",
                  marginLeft: "8vh",
                  marginRight: "9vh"
                }}
              >
                To
              </span>
              <Input
                size="large"
                placeholder="Your recipient address goes here"
                style={{ width: "83%", textAlign: "left" }}
                onChange={recipientWalletAddress => {
                  currentWallet.setProperty(
                    "recipientWalletAddress",
                    recipientWalletAddress.target.value
                  );
                }}
              />
            </FormItem>
          </FormItem>
          <FormItem>
            <FormItem>
              <FormItem>
                <List
                  size="small"
                  style={{ marginLeft: "9vh", width: "80%" }}
                  dataSource={data}
                  renderItem={item => <List.Item>{item}</List.Item>}
                />
              </FormItem>
              <FormItem style={{ textAlign: "center", marginBottom: "0px" }}>
                <Button
                  size="large"
                  style={{ width: "60vh" }}
                  type="primary"
                  onClick={() => {
                    sendTransaction();
                    currentWallet.setProperty(
                      "senderWalletAddress",
                      walletAddr
                    );

                    currentWallet.setProperty("senderPrivateKey", privateKey);
                    currentWallet.setProperty("senderPublicKey", publicKey);
                  }}
                >
                  Continue
                </Button>
              </FormItem>
            </FormItem>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default inject("userStore")(observer(SendModal));

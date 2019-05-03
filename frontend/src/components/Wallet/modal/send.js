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

import "./modal.css";
const FormItem = Form.Item;
const InputGroup = Input.Group;
const { TextArea } = Input;
class SendModal extends Component {
  state = {
    click: false
  };

  render() {
    const data = ["Transfer Fee  0.3125 ", "Recipient will Receive "];

    let {
      userStore: {
        currentWallet,
        sendTransaction,
        cookies,
        balance,
        receiveTransactions
      }
    } = this.props;
    const cookieData = cookies.get("userData");
    const walletAddr = cookieData["walletAddress"];
    const privateKey = cookieData["privateKey"];
    const publicKey = cookieData["publicKey"];

    const myBalance = balance;
    const AGC = "AGC ";
    const balanceAGC = AGC.concat(myBalance);

    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        footer={null}
        width={600}
        title={"Send AGC"}
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
                  <span style={{ marginRight: "26vh" }}>Amount</span>
                </Col>
              </Row>
              <InputGroup size="large" compact>
                <Row gutter={4}>
                  <Col span={12}>
                    <Input
                      disabled
                      value={balanceAGC}
                      style={{
                        width: "100%",
                        textAlign: "center"
                      }}
                      addonBefore={
                        <span>
                          <Icon type="wallet" />
                        </span>
                      }
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
            <FormItem style={{ textAlign: "center" }}>
              <TextArea
                onChange={data => {
                  currentWallet.setProperty("data", data.target.value);
                }}
                placeholder="What is it for?"
                style={{ width: "83%" }}
              />
            </FormItem>
          </FormItem>
          <FormItem>
            <FormItem>
              <FormItem style={{ textAlign: "center", marginBottom: "0px" }}>
                <Button
                  size="large"
                  style={{ width: "60vh" }}
                  type="primary"
                  onClick={() => {
                    sendTransaction();
                    receiveTransactions();
                    currentWallet.setProperty(
                      "senderWalletAddress",
                      walletAddr
                    );

                    currentWallet.setProperty("senderPrivateKey", privateKey);
                    currentWallet.setProperty("senderPublicKey", publicKey);
                    currentWallet.setProperty("balance", balance);
                    // currentWallet.setProperty("balance",)
                  }}
                >
                  Confirm
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

import React, { Component, useCallback, useState } from "react";

import { Button, Layout, Modal, Input, Form, InputNumber, List } from "antd";

const FormItem = Form.Item;
class RequestModal extends Component {
  render() {
    const data = ["You will Receive"];
    return (
      <Layout>
        <Modal
          visible={this.props.visible}
          onCancel={this.props.onCancel}
          footer={null}
          width={600}
          title={"Request AGC"}
          //   style={{}}
        >
          <Form className="regForm">
            <FormItem>
              <FormItem style={{ margin: "auto", textAlign: "center" }}>
                <span>Available balance </span>
                <span>0.0</span>
              </FormItem>
              <FormItem style={{ textAlign: "center" }}>
                <span style={{ float: "left", marginLeft: "9vh" }}>
                  Enter AGC address
                </span>
                <Input
                  size="large"
                  placeholder="Your sender address goes here"
                  style={{ width: "80%" }}
                />
              </FormItem>
              <FormItem style={{ textAlign: "center" }}>
                <span
                  style={{
                    float: "left",
                    marginLeft: "9vh",
                    paddingRight: "10vh"
                  }}
                >
                  AGC
                </span>
                <InputNumber
                  size="large"
                  style={{ width: "70vh" }}
                  placeholder="0.000000"
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
                <FormItem style={{ textAlign: "center" }}>
                  <Button size="large" type="primary">
                    Confirm Request
                  </Button>
                </FormItem>
              </FormItem>
            </FormItem>
          </Form>
        </Modal>
      </Layout>
    );
  }
}

export default RequestModal;

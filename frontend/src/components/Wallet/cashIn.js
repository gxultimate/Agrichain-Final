import React, { Component } from "react";
import { Layout, Card, Button, Tabs, Input, List } from "antd";
import {
  withRouter,
  NavLink,
  BrowserRouter as Router,
  Route
} from "react-router-dom";

const ButtonGroup = Button.Group;
const { Content } = Layout;
function callback(key) {
  console.log(key);
}
const data = ["Cooperative Location", "Amount", "Fee", "Amount Due"];

class CashInForm extends Component {
  CashIn = () => {};

  render() {
    return (
      <Layout>
        <Card
          type="inner"
          title="Cash In"
          bordered={false}
          style={{ height: "80vh" }}
        >
          <Layout>
            <Input
              size="large"
              placeholder="Amount"
              style={{
                width: "40%",
                margin: "auto",
                height: "10vh",
                marginTop: "10vh"
              }}
              addonAfter={"AGC"}
            />

            <List
              size="small"
              footer={
                <div
                  style={{
                    textAlign: "right",
                    marginRight: "48vh",
                    paddingBottom: "10vh"
                  }}
                >
                  <ButtonGroup>
                    <Button type="primary">Cancel</Button>
                    <Button>Verification</Button>
                  </ButtonGroup>
                </div>
              }
              dataSource={data}
              renderItem={item => (
                <List.Item style={{ width: "40%", margin: "auto" }}>
                  {item}
                </List.Item>
              )}
            />
          </Layout>
        </Card>
      </Layout>
    );
  }
}

export default withRouter(CashInForm);

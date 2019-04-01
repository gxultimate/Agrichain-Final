import React, { Component } from "react";
import { Layout, Card, Button, Tabs, Input, List } from "antd";

const ButtonGroup = Button.Group;
function callback(key) {
  console.log(key);
}

class CashInForm extends Component {
  state = {};
  render() {
    const data = ["Cooperative Location", "Amount", "Fee", "Amount Due"];

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

export default CashInForm;

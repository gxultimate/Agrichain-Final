import React, { Component } from "react";
import { Layout, Card, Row, Col, Button, Tabs, Icon, Input, Modal } from "antd";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;
function callback(key) {
  console.log(key);
}

class WalletForm extends Component {
  state = {
    visible: false
  };

  toggleQrCode = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  render() {
    let {
      userStore: { currentUser }
    } = this.props;
    return (
      <Layout>
        <Modal
          bodyStyle={{ height: "15vh" }}
          style={{ height: "30vh" }}
          visible={this.state.visible}
          onCancel={this.toggleQrCode.bind(this)}
          footer={null}
        >
          <Layout style={{ marginTop: "4vh" }}>
            <Row>
              <Col>
                <Input
                  addonAfter={
                    <a>
                      <Icon type="copy" />
                    </a>
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
              <ButtonGroup size="large" style={{ marginTop: "4vh" }}>
                <Button span={6} style={{ width: "17.5vh" }}>
                  Send
                </Button>
                <Button span={6} style={{ width: "17.5vh" }}>
                  Request
                </Button>
              </ButtonGroup>
            </Card>
          </Col>
          <Col span={16} style={{ marginLeft: "4vh", height: "80vh" }}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Transaction History" key="1">
                {" "}
                Content of Tab 1{" "}
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

import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch
} from "react-router-dom";
import { inject, observer } from "mobx-react";
import Sidebar from "./common/Sidebar";
import Headerbar from "./common/Header";
import WalletForm from "./wallet";
import CashInForm from "./cashIn";
import CashOutForm from "./cashOut";
import PayBillsForm from "./pay";
import AgriculturalLoan from "./agriculturalLoan";
import EmergencyLoan from "./emergencyLoan";
import LivelihoodLoan from "./liveliHoodLoan";
import ShortTermLoan from "./shortTermLoan";

const { Content } = Layout;
const SubMenu = Menu.SubMenu;

class Wallet extends Component {
  render() {
    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar />
          <Layout>
            <Headerbar />

            <Content style={{ margin: "0 16px " }}>
              <div
                style={{
                  padding: 24,
                  background: "#fff",
                  marginTop: "5vh",
                  minHeight: 400,
                  height: "90%"
                }}
              >
                <Switch>
                  <Route exact path="/wallet" render={() => <WalletForm />} />
                  <Route path="/wallet/cashin" render={() => <CashInForm />} />
                  <Route
                    path="/wallet/paybill"
                    render={() => <PayBillsForm />}
                  />
                  <Route
                    path="/wallet/agricultural"
                    render={() => <AgriculturalLoan />}
                  />
                  <Route
                    path="/wallet/emergency"
                    render={() => <EmergencyLoan />}
                  />
                  <Route
                    path="/wallet/livelihood"
                    render={() => <LivelihoodLoan />}
                  />
                  <Route
                    path="/wallet/short-term"
                    render={() => <ShortTermLoan />}
                  />
                </Switch>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default withRouter(inject("userStore")(observer(Wallet)));

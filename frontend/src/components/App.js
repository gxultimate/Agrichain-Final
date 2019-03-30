import "antd/dist/antd.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "mobx-react";

// Pages init
// import Home from "./Home";
import Login from "./Login";
import Wallet from "./Wallet";

// Store Init

import { UserStore, Api, NavigateStore } from "../stores";
import { Layout } from "antd";

const api = new Api();
const nav = new NavigateStore();
const userStore = new UserStore(api, nav);

const stores = {
  userStore
};
// const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <Provider {...stores}>
          <Layout>
            <Route exact path="/" component={Login} />
            <Route path="/wallet" component={Wallet} />
          </Layout>

          {/* JUST ADD Additional Routes here */}
          {/* <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} /> */}
        </Provider>
      </Router>
    );
  }
}

export default App;

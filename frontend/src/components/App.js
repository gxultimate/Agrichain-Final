import "antd/dist/antd.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "mobx-react";

// Pages init
// import Home from "./Home";
import Login from "./Login";

// Store Init
// import { StartingStore } from "../stores";
import { UserStore, Api } from "../stores";
import { Layout } from "antd";

// const startingStore = new StartingStore();
const api = new Api();
const userStore = new UserStore(api);

// const stores = {
//   startingStore
// };

const stores = {
  userStore
};

class App extends Component {
  render() {
    return (
      <Router>
        <Provider {...stores}>
          <Layout>
            <Route exact path="/" component={Login} />
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

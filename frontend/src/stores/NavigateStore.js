import { observable, action, decorate } from "mobx";
import axios from "axios";
import { BrowserRouter as Route, Redirect, withRouter } from "react-router-dom";
import { observer } from "mobx-react";
import createBrowserHistory from "history/createBrowserHistory";

class NavigateStore {
  history = createBrowserHistory();

  loginNavigation = url => {
    this.history.push(url);
  };
}

decorate(NavigateStore, {
  history: observable,
  loginNavigation: action
});

export default NavigateStore;

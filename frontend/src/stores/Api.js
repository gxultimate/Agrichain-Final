import axios from "axios";
import { action, decorate, observable } from "mobx";

class Api {
  api = axios.create({
    baseURL: "http://localhost:5000/"
  });

  walletapi = axios.create({
    baseURL: "http://localhost:3001/"
  });

  register = async data => {
    return this.api.post("register", {
      mode: "cors",
      body: data
    });
  };

  login = async data => {
    return this.api.post("login", {
      mode: "cors",
      body: data
    });
  };
  forgotPass = data => {
    this.api
      .post("forgotPass", {
        mode: "cors",
        body: data
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  sendtransaction = data => {
    this.walletapi
      .post("sendTransaction", {
        mode: "cors",
        body: data
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  gettransaction = data => {
    return this.walletapi.post("getTransactions", {
      mode: "cors",
      body: data
    });
  };

  getbalance = data => {
    return this.walletapi.post("getBalance", {
      mode: "cors",
      body: data
    });
  };
}

decorate(Api, {
  login: action,
  forgotPass: action,
  register: action,
  user: observable,
  sendtransaction: action,
  gettransaction: action,
  getbalance: action
});

export default Api;

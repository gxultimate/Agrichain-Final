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
      .post("sendtransaction", {
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
}

decorate(Api, {
  login: action,
  forgotPass: action,
  register: action,
  user: observable,
  sendtransaction: action
});

export default Api;

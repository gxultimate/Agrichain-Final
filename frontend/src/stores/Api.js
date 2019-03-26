import axios from "axios";
import { action, decorate } from "mobx";
import User from "../models/User";
class Api {
  api = axios.create({
    baseURL: "http://localhost:5000/"
  });

  user = new User();

  register = data => {
    this.api
      .post("register", {
        mode: "cors",
        body: data
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  login = data => {
    this.api
      .post("login", {
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
}

decorate(Api, {
  getUsers: action,
  getRegister: action
});

export default Api;

import { observable, action, decorate } from "mobx";
import axios from "axios";
import User from "../models/User";

class UserStore {
  listOfUsers = [];
  currentUser = new User();
  user = new User();
  api = undefined;

  constructor(api) {
    this.api = api;
  }

  registerUser = () => {
    this.api.register(this.user);
  };

  loginUser = () => {
    this.api.login(this.currentUser);
  };

  forgotPasswordUser = () => {
    this.api.forgotPass(this.user);
  };

  getUser = () => {
    this.api.getUsers();
  };
}

decorate(UserStore, {
  users: observable,
  currentUser: observable,
  registerUser: action,
  getUser: action,
  loginUser: action,
  forgotPasswordUser: action
});

export default UserStore;

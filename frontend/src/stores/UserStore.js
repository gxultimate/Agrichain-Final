import { observable, action, decorate } from "mobx";
import User from "../models/User";

class UserStore {
  currentUser = new User();
  user = new User();
  api = undefined;
  nav = undefined;
  isLoading = false;
  wallet = "/wallet";
  isLoggedIn = false;

  constructor(api, nav) {
    this.api = api;
    this.nav = nav;
  }

  registerUser = () => {
    this.api.register(this.user);
  };

  loginUser = () => {
    this.isLoading = !this.isLoading;

    return new Promise((resolve, reject) => {
      this.api.login(this.currentUser).then(data => {
        this.currentUser.setProperty("response", data.data);
        this.isLoading = !this.isLoading;
        if (data.data === "Success") {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };

  // this.api.login(this.currentUser).then(data => {
  //   this.currentUser.setProperty("response", data.data);
  //   this.isLoading = !this.isLoading;
  //   if (data.data === "Success") {
  //     status = true;
  //     resolve("done");
  //   } else {
  //     status = false;
  //     resolve("done");
  //   }

  forgotPasswordUser = () => {
    this.api.forgotPass(this.user);
  };

  checkName = () => {
    this.api.checkUser(this.user);
  };
}

decorate(UserStore, {
  user: observable,
  currentUser: observable,
  isLoading: observable,
  registerUser: action,
  checkName: action,
  loginUser: action,
  forgotPasswordUser: action,
  resp: observable
});

export default UserStore;

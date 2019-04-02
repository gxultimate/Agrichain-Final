import { observable, action, decorate, computed } from "mobx";
import User from "../models/User";
import Cookie from "mobx-cookie";
import Cookies from "universal-cookie";
class UserStore {
  currentUser = new User();
  cookie = new Cookie("thing");
  cookies = new Cookies();
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
        this.currentUser.setProperty("fullName", data.data.fullName);
        this.currentUser.setProperty("coopName", data.data.coopName);
        this.currentUser.setProperty("userName", data.data.userName);
        this.currentUser.setProperty("passWord", data.data.passWord);
        this.currentUser.setProperty("currAddress", data.data.currAddress);
        this.currentUser.setProperty("contactNum", data.data.contactNum);
        this.currentUser.setProperty("walletAddress", data.data.walletAddress);
        this.cookies.set("walletAddr", data.data.walletAddress, {
          expires: new Date(Date.now() + 2592000)
        });
        // this.cookieData = data.data.walletAddr;
        // this.cookieData.push(data.data.walletAddr);
        // this.cookieData.push(data.data.fullName);

        this.setCookie(data.data.fullName);
        this.isLoading = !this.isLoading;
        if (data.data !== "Failed") {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };

  get thing() {
    return this.cookie.value;
  }

  setCookie = value => {
    this.cookie.set(value, { expires: 2 });
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
  cookies: observable,
  thing: computed,
  setCookie: action,
  cookie: observable,
  user: observable,
  currentUser: observable,
  isLoading: observable,
  registerUser: action,
  checkName: action,
  loginUser: action,
  forgotPasswordUser: action
});

export default UserStore;

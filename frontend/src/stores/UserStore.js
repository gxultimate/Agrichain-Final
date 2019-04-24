import { observable, action, decorate, computed } from "mobx";
import User from "../models/User";
import Wallet from "../models/Wallet";
import Cookie from "mobx-cookie";
import Cookies from "universal-cookie";

class UserStore {
  currentUser = new User();
  cookie = new Cookie("thing");
  cookies = new Cookies();

  user = new User();
  wallet = new Wallet();
  currentWallet = new Wallet();
  api = undefined;

  isLoading = false;
  isLoggedIn = false;
  walletAddress = this.cookies.get("walletAddress");
  isValid = false;
  listOfTransaction = undefined;

  constructor(api) {
    this.api = api;
    setInterval(() => {
      this.getTransaction();
    }, 3000);
  }

  registerUser = () => {
    return this.api.register(this.user).then(resp => {
      console.log(resp.data);
    });
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
        this.cookies.set("userData", data.data, {
          expires: new Date(Date.now() + 2592000)
        });
        console.log(data.data);
        console.log(this.cookies.get("userData"));

        this.setCookie(data.data.fullName);
        this.isLoading = !this.isLoading;
        if (data.data !== "Failed" && data.data !== "FailedAgain") {
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

  forgotPasswordUser = () => {
    this.api.forgotPass(this.user);
  };

  checkName = () => {
    this.api.checkUser(this.user);
  };

  sendTransaction = () => {
    this.api.sendtransaction(this.currentWallet);
  };

  getTransaction = () => {
    return new Promise((resolve, reject) => {
      this.api.gettransaction(this.cookies.get("userData")).then(resp => {
        this.listOfTransaction = resp.data;
        // console.log(resp.data);
        // console.log(this.listOfTransaction);

        if (resp.data !== "") {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };
}

decorate(UserStore, {
  cookies: observable,
  thing: computed,
  cookie: observable,
  user: observable,
  currentUser: observable,
  isLoading: observable,
  currentWallet: observable,
  isValid: observable,
  setCookie: action,
  registerUser: action,
  checkName: action,
  loginUser: action,
  forgotPasswordUser: action,
  sendTransaction: action,
  getTransaction: action,
  listOfTransaction: observable
});

export default UserStore;

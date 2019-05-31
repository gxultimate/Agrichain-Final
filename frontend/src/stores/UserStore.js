import { observable, action, decorate, computed } from "mobx";
import User from "../models/User";
import Wallet from "../models/Wallet";
import Loan from "../models/Loan";
import Cookie from "mobx-cookie";
import Cookies from "universal-cookie";
import Axios from "axios";

class UserStore {
  currentUser = new User();
  cookie = new Cookie("thing");
  cookies = new Cookies();
  cookiesRegister = new Cookies();
  currentLoan = new Loan();
  user = new User();
  wallet = new Wallet();
  currentWallet = new Wallet();
  api = undefined;

  isLoading = false;
  isLoggedIn = false;
  cookieBody = this.cookies.get("userData");
  walletAddress = false;
  isValid = false;
  listOfTransaction = undefined;
  listOfLoan = undefined;
  balance = undefined;
  registerResponse = undefined;
  uploadID = [];
  listOfUserLoan = undefined;
  listOfAllLoan = undefined;
  listOfAmortization = undefined;
  loanInterest = undefined;
  loanBalance = undefined;
  loanPrincipal = undefined;
  listOfAmortization = undefined;
  loanDueDate = undefined;
  constructor(api) {
    this.api = api;
  }

  registerUser = () => {
    return this.api.register(this.user).then(resp => {
      console.log(resp.data.status);

      console.log("true on if else", resp.data.status);
      this.cookiesRegister.set("registerResponse", resp.data.status, {
        expires: new Date(Date.now() + 565592000)
      });
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
        this.currentUser.setProperty(
          "senderWalletAddress",
          data.data.walletAddress
        );
        this.currentUser.setProperty("walletAddress", data.data.walletAddress);
        this.currentUser.setProperty("senderPrivateKey", data.data.privateKey);
        this.currentUser.setProperty("senderPublicKey", data.data.publicKey);
        this.currentUser.setProperty(
          "membershipType",
          data.data.membershipType
        );
        this.currentUser.setProperty("occupation", data.data.occupation);
        this.currentUser.setProperty(
          "placeOfAssignment",
          data.data.placeOfAssignment
        );
        this.currentUser.setProperty(
          "monthlyBasicSalary",
          data.data.monthlyBasicSalary
        );
        this.currentUser.setProperty(
          "avenueMonthlyTakeHomePay",
          data.data.avenueMonthlyTakeHomePay
        );
        this.currentUser.setProperty(
          "totalMonthlyStatutoryDeductions",
          data.data.totalMonthlyStatutoryDeductions
        );

        this.currentUser.setProperty(
          "totalMonthlyNonStatutoryDeductions",
          data.data.totalMonthlyNonStatutoryDeductions
        );

        this.currentUser.setProperty("cooperativeID", data.data.cooperativeID);

        this.currentUser.setProperty(
          "contactNoOffice",
          data.data.contactNoOffice
        );

        this.currentUser.setProperty("residence", data.data.residence);

        this.cookies.set("userData", data.data, {
          expires: new Date(Date.now() + 5592000)
        });
        console.log(data.data);
        console.log(this.cookies.get("userData"));
        const cookieData = this.cookies.get("userData");
        this.walletAddress = !this.walletAddress;

        this.setCookie(data.data.fullName);
        this.isLoading = !this.isLoading;

        if (data.data !== "Failed" && data.data !== "FailedAgain") {
          console.log("logindata", data.data["userRole"]);
          if (data.data["userRole"] === 1) {
            resolve(1);
          } else if (
            data.data["userRole"] === 2 ||
            data.data["userRole"] == undefined
          ) {
            resolve(2);
          } else {
            resolve(false);
          }
        }
        resolve(false);
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

  getBalance = () => {
    return new Promise((resolve, reject) => {
      this.api.getbalance(this.cookies.get("userData")).then(resp => {
        this.balance = resp.data.balance;
        console.log("balance", resp.data.balance);
        // console.log(this.listOfTransaction);

        if (resp.data !== "") {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };
  receiveTransactions = () => {
    return new Promise((resolve, reject) => {
      this.api.receivetransactions(this.cookies.get("userData")).then(resp => {
        // this.balance = resp.data.balance;
        console.log("recieve wallet", resp.data);
        // console.log(this.listOfTransaction);

        if (resp.data !== "") {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };

  uploadFiles = () => {
    const data = new FormData();
    data.append("file", this.currentLoan.uploadID);
    console.log(this.uploadID.target);
    this.api.uploadfiles(data).then(resp => {
      console.log(this.currentLoan.uploadID);
      console.log(this.currentLoan);
      console.log(resp.data);
    });
  };

  sendLoanRequest = () => {
    return new Promise((resolve, reject) => {
      this.api
        .sendloanrequest(this.cookies.get("userData"), this.currentLoan)
        .then(resp => {
          console.log(resp.data);
          if (resp.data !== "") {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  };

  getLoanRequest = () => {
    return new Promise((resolve, reject) => {
      this.api.getloanrequest(this.cookies.get("userData")).then(resp => {
        this.listOfUserLoan = resp.data;
        console.log(resp.data);
        if (resp.data !== "") {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };

  getAllLoanRequest = () => {
    return new Promise((resolve, reject) => {
      this.api.getallloanrequests(this.cookies.get("userData")).then(resp => {
        this.listOfAllLoan = resp.data;
        console.log("wow", resp.data);
        if (resp.data !== "") {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };

  sendLoanPayment = data => {
    return new Promise((resolve, reject) => {
      this.api.sendloanpayment(this.currentLoan).then(resp => {
        // this.listOfUserLoan = resp.data;
        console.log(resp.data);
        if (resp.data !== "") {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };

  getLoanAmortization = data => {
    return new Promise((resolve, reject) => {
      this.api.getloanamortization(this.cookies.get("userData")).then(resp => {
        // this.listOfUserLoan = resp.data;
        this.listOfAmortization = resp.data;

        let len = this.listOfAmortization.length;

        let balance = this.listOfAmortization[len - 1]["balance"];
        let principal = this.listOfAmortization[len - 1]["principal"];
        let interest = this.listOfAmortization[len - 1]["interest"];
        let date = this.listOfAmortization[len - 1]["dueDate"];

        this.loanPrincipal = principal;
        this.loanInterest = interest;
        this.loanBalance = balance;
        this.loanDueDate = date;

        console.log("amortization", this.listOfAmortization.length);
        if (resp.data !== "") {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };

  checkPort = () => {
    this.api.checkPort();
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
  listOfTransaction: observable,
  balance: observable,
  receiveTransactions: action,
  uploadFiles: action,
  currentLoan: observable,
  uploadID: observable,
  registerResponse: observable,
  cookiesRegister: observable,
  sendLoanRequest: action,
  getLoanRequest: action,
  listOfUserLoan: observable,
  sendLoanPayment: observable,
  getAllLoanRequest: action,
  listOfAllLoan: observable,
  getLoanAmortization: observable,
  listOfAmortization: observable,
  displayAmortization: observable,
  loanInterest: observable,
  loanBalance: observable,
  loanPrincipal: observable,
  loanDueDate: observable,
  checkPort: action
});

export default UserStore;

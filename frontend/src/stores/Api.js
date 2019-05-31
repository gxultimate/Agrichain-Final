import axios from "axios";
import { action, decorate, observable } from "mobx";
import { inject, observer } from "mobx-react";
// const ;
// const x = 0;
// for (x in nodes)

class Api {
  api = axios.create({
    baseURL: "http://localhost:5000/"
  });

  // nodes = [3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008];

  // connectTo = () => {
  //   let {
  //     userStore: { cookies }
  //   } = this.props;
  //   let cookieData = cookies["port"];
  //   return axios.create({
  //     baseURL: "http://localhost:" + cookieData + ""
  //   });
  // };

  port = "http://localhost:3001/";

  checkPort = () => {
    this.checkPort_one();
    this.checkPort_two();
    this.checkPort_three();
    this.checkPort_four();
    this.checkPort_five();
    this.checkPort_six();
    this.checkPort_seven();

    // console.log(this.walletapi);
    // console.log(this.port);
    // if (this.checkPort_one() != undefined) {
    //   this.port = "http://localhost:3001/";
    //   console.log(this.checkPort_one);
    // } else if (this.checkPort_two() != undefined) {
    //   this.port = "http://localhost:3002/";
    //   console.log(this.port);
    //   console.log(this.walletapi);
  };

  checkPort_one = () => {
    axios.get("http://localhost:3001/getPort").then(resp => {
      if (resp.data != undefined || resp.data != null) {
        this.port = "http://localhost:3001/";
      }
    });
  };

  checkPort_two = () => {
    axios.get("http://localhost:3002/getPort").then(resp => {
      if (resp.data != "" || resp.data != null) {
        console.log("3002");
        this.port = "http://localhost:3002/";
      }
    });
  };

  checkPort_three = () => {
    axios.get("http://localhost:3003/getPort").then(resp => {
      if (resp.data != "" || resp.data != null) {
        console.log("3003");
        this.port = "http://localhost:3003/";
      }
    });
  };

  checkPort_four = () => {
    axios.get("http://localhost:3004/getPort").then(resp => {
      if (resp.data != "" || resp.data != null) {
        console.log("3004");
        this.port = "http://localhost:3004/";
      }
    });
  };

  checkPort_five = () => {
    axios.get("http://localhost:3005/getPort").then(resp => {
      if (resp.data != "" || resp.data != null) {
        return "http://localhost:3005/";
      }
    });
  };

  checkPort_six = () => {
    axios.get("http://localhost:3006/getPort").then(resp => {
      if (resp.data != "" || resp.data != null) {
        this.port = "http://localhost:3006/";
      }
    });
  };

  checkPort_seven = () => {
    axios.get("http://localhost:3007/getPort").then(resp => {
      if (resp.data != "" || resp.data != null) {
        this.port = "http://localhost:3007/";
      }
    });
  };

  walletapi = axios.create({
    baseURL: this.port
  });

  register = async data => {
    return this.api.post("register", {
      mode: "cors",
      body: data
    });
  };

  login = async data => {
    console.log(this.port);
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

  sendtransaction = async data => {
    axios
      .post("" + this.port + "/sendTransaction", {
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

  gettransaction = async data => {
    return axios.post("" + this.port + "/getTransactions", {
      mode: "cors",
      body: data
    });
  };

  sendloanpayment = data => {
    return axios.post("" + this.port + "/sendLoanPayment", {
      mode: "cors",
      body: data
    });
  };

  getbalance = data => {
    return axios.post("" + this.port + "/getBalance", {
      mode: "cors",
      body: data
    });
  };

  // receivetransactions = data => {
  //   return this.walletapi.post("receiveTransaction", {
  //     mode: "cors",
  //     body: data
  //   });
  // };

  uploadfiles = file => {
    return axios.post("" + this.port + "/uploadFiles", {
      mode: "cors",
      body: file
    });
  };

  sendloanrequest = (data, loan) => {
    return axios.post("" + this.port + "/sendLoanRequest", {
      mode: "cors",
      body: { data: data, loan: loan }
    });
  };

  getallloanrequests = data => {
    return axios.post(" " + this.port + "/getAllLoanRequests", {
      mode: "cors",
      body: data
    });
  };

  getloanamortization = data => {
    return axios.post("" + this.port + "/getAmortization", {
      mode: "cors",
      body: data
    });
  };

  getloanrequest = data => {
    return axios.post("" + this.port + "/getLoanRequest", {
      mode: "cors",
      body: data
    });
  };

  // 2
  // sendtransaction = data => {
  //   axios1
  //     .post("sendTransaction", {
  //       mode: "cors",
  //       body: data
  //     })
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  // gettransaction = data => {
  //   return axios1.post("getTransactions", {
  //     mode: "cors",
  //     body: data
  //   });
  // };

  // sendloanpayment = data => {
  //   return this.walletapi1.post("sendLoanPayment", {
  //     mode: "cors",
  //     body: data
  //   });
  // };

  // getbalance = data => {
  //   return this.walletapi1.post("getBalance", {
  //     mode: "cors",
  //     body: data
  //   });
  // };

  // receivetransactions = data => {
  //   return this.walletapi1.post("receiveTransaction", {
  //     mode: "cors",
  //     body: data
  //   });
  // };

  // uploadfiles = file => {
  //   return this.walletapi1.post("uploadFiles", {
  //     mode: "cors",
  //     body: file
  //   });
  // };

  // sendloanrequest = (data, loan) => {
  //   return this.walletapi1.post("sendLoanRequest", {
  //     mode: "cors",
  //     body: { data: data, loan: loan }
  //   });
  // };

  // getallloanrequests = data => {
  //   return this.walletapi1.post("getAllLoanRequests", {
  //     mode: "cors",
  //     body: data
  //   });
  // };

  // getloanamortization = data => {
  //   return this.walletapi1.post("getAmortization", {
  //     mode: "cors",
  //     body: data
  //   });
  // };

  // getloanrequest = data => {
  //   return this.walletapi1.post("getLoanRequest", {
  //     mode: "cors",
  //     body: data
  //   });
  // };

  // 3

  // connectionLoop = data => {
  //   let index = 3001;
  //   const request = data => {
  //     return axios
  //       .post("http://localhost:" + index + "/getBalance", {
  //         mode: "cors",
  //         body: data
  //       })
  //       .then(() => {
  //         index++;
  //         if (index >= 3010) {
  //           return "done";
  //         }
  //         return request();
  //       });
  //   };
  // };
}

decorate(Api, {
  login: action,
  forgotPass: action,
  register: action,
  user: observable,
  sendtransaction: action,
  gettransaction: action,
  getbalance: action,
  receivetransactions: action,
  uploadfiles: action,
  sendloanrequest: action,
  getloanrequest: action,
  sendloanpayment: action,
  getallloanrequests: action,
  getloanamortization: action,
  checkPort: action
});

export default Api;

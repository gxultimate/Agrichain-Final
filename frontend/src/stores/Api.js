import axios from "axios";
import { action, decorate, observable } from "mobx";
// const ;
// const x = 0;
// for (x in nodes)
class Api {
  api = axios.create({
    baseURL: "http://localhost:5000/"
  });

  nodes = [3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008];

  connectTo = node => {
    return axios.create({
      baseURL: "http://localhost:" + node + ""
    });
  };

  // getbalance = data => {
  //   this.nodes.forEach(node => {
  //     return axios.post("http://localhost:" + node + "/getBalance", {
  //       mode: "cors",
  //       body: data
  //     });
  //   });
  // };

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

  receivetransactions = data => {
    return this.walletapi.post("receiveTransaction", {
      mode: "cors",
      body: data
    });
  };

  uploadfiles = file => {
    return this.walletapi.post("uploadFiles", {
      mode: "cors",
      body: file
    });
  };

  sendloanrequest = (data, loan) => {
    return this.walletapi.post("sendLoanRequest", {
      mode: "cors",
      body: { data: data, loan: loan }
    });
  };
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
  sendloanrequest: action
});

export default Api;

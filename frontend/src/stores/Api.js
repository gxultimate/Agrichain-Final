import axios from "axios";
import { action, decorate, observable } from "mobx";

class Api {
  api = axios.create({
    baseURL: "http://localhost:5000/"
  });

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

  login = async data => {
    return this.api.post("login", {
      mode: "cors",
      body: data
    });
    // .then(response => {
    // this.user.setProperty("response", response.data);
    // console.log(this.user);
    //   return response;
    // })
    // .catch(error => {
    //   return error;
    // });
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

  // checkUser = data => {
  //   this.api
  //     .post("checkname", {
  //       mode: "cors",
  //       body: data
  //     })
  //     .then(response => {
  //       console.log(response.data);
  //     })

  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
}

decorate(Api, {
  login: action,
  forgotPass: action,
  register: action,
  user: observable
});

export default Api;

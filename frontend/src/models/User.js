import { action, observable, decorate } from "mobx";
import { persist } from "mobx-persist";
import Model from "./Model";
import Cookie from "mobx-cookie";
class User extends Model {
  constructor(props) {
    const defaults = {
      _id: 0,
      fullName: "",
      coopName: "",
      userName: "",
      passWord: "",
      rpassWord: "",
      currAddress: "",
      contactNum: 0,
      response: ""
    };
    super({ ...defaults, ...props });
  }
}
decorate(User, {
  _id: observable,
  fullName: observable,
  coopName: observable,
  userName: observable,
  passWord: observable,
  rpassWord: observable,
  currAddress: observable,
  contactNum: observable,
  response: observable,
  reset: action
});

export default User;

// postData = () => {
//   axios
//     .post("http://127.0.0.1:5000/register", currentUser)

//     .then(function(response) {
//       console.log(response);
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// };

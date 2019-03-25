import { action, observable, decorate } from "mobx";
import Model from "./Model";

class User extends Model {
  constructor(props) {
    const defaults = {
      _id: 0,
      fullName: "",
      coopName: "",
      username: "",
      password: "",
      rpassword: "",
      currAddress: "",
      contactNum: 0
    };
    super({ ...defaults, ...props });
  }
}
decorate(User, {
  _id: observable,
  fullName: observable,
  coopName: observable,
  username: observable,
  password: observable,
  rpassword: observable,
  currAddress: observable,
  contactNum: observable,
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

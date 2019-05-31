import { action, observable, decorate } from "mobx";

import Model from "./Model";

class User extends Model {
  constructor(props) {
    const defaults = {
      cooperativeID: 0,
      fullName: "",
      coopName: "",
      userName: "",
      passWord: "",
      rpassWord: "",
      permanentsAddress: "",
      contactNum: 0,
      contactNoOffice: "",
      residence: "",
      walletAddress: "",
      isValid: "",
      senderWalletAddress: "",
      senderPrivateKey: "",
      senderPublicKey: "",
      membershipType: "",
      occupation: "",
      placeOfAssignment: "",
      position: "",
      monthlyBasicSalary: "",
      avenueMonthlyTakeHomePay: "",
      totalMonthlyStatutoryDeductions: "",
      totalMonthlyNonStatutoryDeductions: "",
      userRole: "",
      response: ""
    };
    super({ ...defaults, ...props });
  }
}
decorate(User, {
  cooperativeID: observable,
  fullName: observable,
  coopName: observable,
  userName: observable,
  passWord: observable,
  rpassWord: observable,
  currentAddress: observable,
  contactNum: observable,
  response: observable,
  walletAddress: observable,
  isValid: observable,
  senderWalletAddress: observable,
  senderPrivateKey: observable,
  senderPublicKey: observable,
  membershipType: observable,
  occupation: observable,
  placeOfAssignment: observable,
  position: observable,
  monthlyBasicSalary: observable,
  avenueMonthlyTakeHomePay: observable,
  totalMonthlyStatutoryDeductions: observable,
  totalMonthlyNonStatutoryDeductions: observable,
  response: observable,
  reset: action,
  userRole: observable
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

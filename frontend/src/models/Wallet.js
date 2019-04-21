import { action, observable, decorate } from "mobx";

import Model from "./Model";

class Wallet extends Model {
  constructor(props) {
    const defaults = {
      _id: 0,
      transactionID: "",
      amount: "",
      senderWalletAddress: "",
      senderPrivateKey: "",
      senderPublicKey: "",
      recipientWalletAddress: "",
      data: "",
      balance: ""
    };
    super({ ...defaults, ...props });
  }
}
decorate(Wallet, {
  transactionID: observable,
  amount: observable,
  senderWalletAddress: observable,
  recipientWalletAddress: observable,
  senderPrivateKey: observable,
  senderPublicKey: observable,
  data: observable,
  balance: observable
});

export default Wallet;

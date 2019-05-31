import { action, observable, decorate } from "mobx";

import Model from "./Model";

class Loan extends Model {
  constructor(props) {
    const defaults = {
      _id: 0,
      loanRequestID: "",
      typeOfLoan: "",
      amountOfLoan: "",
      initialAmountOfLoan: "",
      borrowerLoanBalance: 0,
      coMakerName: "",
      coMakercooperativeID: "",
      coMakermembershipType: "",
      coMakerpermanentAddress: "",
      coMakermembershipType: "",
      coMakerOccupation: "",
      coMakerplaceOfAssignment: "",
      coMakerposition: "",
      coMakermonthlyBasicSalary: "",
      coMakeravenueMonthlyTakeHomePay: "",
      coMakertotalMonthlyStatutoryDeductions: "",
      coMakertotalMonthlyNonStatutoryDeductions: "",
      coMakerContactNum: "",
      coMakerContactNoOffice: "",
      coMakerResidence: "",
      dateRequested: "",
      interest: "",
      termOfLoan: "",
      penaltyFee: "",
      serviceFee: "",
      uploadID: "",
      amountToPay: "",
      status: "Pending",
      data: ""
    };
    super({ ...defaults, ...props });
  }
}
decorate(Loan, {
  loanRequestID: observable,
  typeOfLoan: observable,
  amountOfLoan: observable,
  coMakerName: observable,
  coMakercooperativeID: observable,
  coMakermembershipType: observable,
  coMakerpermanentAddress: observable,
  coMakeroccupation: observable,
  coMakermembershipType: observable,
  coMakerplaceOfAssignment: observable,
  coMakerposition: observable,
  coMakermonthlyBasicSalary: observable,
  coMakeravenueMonthlyTakeHomePay: observable,
  coMakertotalMonthlyStatutoryDeductions: observable,
  coMakertotalMonthlyNonStatutoryDeductions: observable,
  coMakerContactNoOffice: observable,
  coMakerResidence: observable,
  cpNumber: observable,
  interest: observable,
  termOfLoan: observable,
  penaltyFee: observable,
  serviceFee: observable,
  uploadID: observable,
  dateRequested: observable,
  status: observable,
  borrowerLoanBalance: observable,
  amountToPay: observable,
  initialAmountOfLoan: observable,
  data: observable
});

export default Loan;

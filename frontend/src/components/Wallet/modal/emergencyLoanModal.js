import React, { Component } from "react";
import {
  Layout,
  Card,
  Row,
  Col,
  Button,
  Tabs,
  Icon,
  Input,
  Modal,
  Popover,
  Form,
  Upload,
  DatePicker,
  Cascader,
  message
} from "antd";
import { inject, observer } from "mobx-react";
import { withRouter, BrowserRouter } from "react-router-dom";
import axios from "axios";

const FormItem = Form.Item;

class EmergencyLoanModal extends Component {
  state = {
    visible: false,
    selectedFile: null
  };

  componentDidMount() {
    this.setInitialValues();
  }

  toggleLoanModal = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  fileSelectedHander = event => {
    this.setState({ selectedFile: event.target.files[0] });
    console.log(event.target.files[0]);
  };

  fileUploadHander = () => {
    let {
      userStore: { currentLoan, cookies }
    } = this.props;
    const fd = new FormData();
    fd.append("file", this.state.selectedFile);
    fd.append("filename", this.state.selectedFile.name);
    // const name = this.state.selectedFile.name;

    // console.log("name", this.state.selectedFile.name);

    axios.post(" http://127.0.0.1:5000/uploadFiles", fd).then(resp => {
      console.log("resp", resp.data.name.name);
      currentLoan.setProperty("uploadID", resp.data.name);
    });
  };

  handleSubmit = () => {
    const success = () => {
      message
        .loading("Sending Loan Request...", 2.5)
        .then(() => message.success("Loan Submitted Successfully!", 2.5));
    };

    setTimeout(success, 2000);
  };

  setInitialValues = () => {
    let {
      userStore: { currentLoan, currentUser, cookies }
    } = this.props;

    const cookieData = cookies.get("userData");

    const { form } = this.props;

    form.setFieldsValue({
      coopID: cookieData["cooperativeID"]
    });
    form.setFieldsValue({
      coopName: cookieData["coopName"]
    });
    form.setFieldsValue({
      fullName: cookieData["fullName"]
    });
    form.setFieldsValue({
      currentAddress: cookieData["currentAddress"]
    });
    form.setFieldsValue({
      contactNum: cookieData["contactNum"]
    });
    form.setFieldsValue({
      contactNoOffice: cookieData["contactNoOffice"]
    });
    form.setFieldsValue({
      residence: cookieData["residence"]
    });
    form.setFieldsValue({
      membershipType: cookieData["membershipType"]
    });
    form.setFieldsValue({
      occupation: cookieData["occupation"]
    });
    form.setFieldsValue({
      placeOfAssignment: cookieData["placeOfAssignment"]
    });
    form.setFieldsValue({
      position: cookieData["position"]
    });
    form.setFieldsValue({
      monthlyBasicSalary: cookieData["monthlyBasicSalary"]
    });
    form.setFieldsValue({
      avenueMonthlyTakeHomePay: cookieData["avenueMonthlyTakeHomePay"]
    });
    form.setFieldsValue({
      totalMonthlyStatutoryDeductions:
        cookieData["totalMonthlyStatutoryDeductions"]
    });
    form.setFieldsValue({
      totalMonthlyNonStatutoryDeductions:
        cookieData["totalMonthlyNonStatutoryDeductions"]
    });
    form.setFieldsValue({
      typeOfLoan: "Emergency Loan"
    });
    form.setFieldsValue({
      interest: "1%"
    });
    form.setFieldsValue({
      serviceFee: "0.00"
    });
    form.setFieldsValue({
      penalty: "0.00"
    });
  };

  getOnchange = value => {
    let {
      userStore: { currentLoan, cookies }
    } = this.props;

    const id =
      Math.floor(100000000 + Math.random() * 900000000) +
      Math.floor(100000 + Math.random() * 90000);
    console.log(id);
    currentLoan.setProperty("termOfLoan", value);
    currentLoan.setProperty("loanRequestID", id);
    currentLoan.setProperty("typeOfLoan", "Emergency Loan");
  };

  setServiceFee = amount => {
    let {
      userStore: { currentLoan, cookies }
    } = this.props;
    const { form } = this.props;

    const serviceFee = amount * 0.02;
    form.setFieldsValue({
      serviceFee: serviceFee
    });
    currentLoan.setProperty("interest", "2%");

    currentLoan.setProperty("serviceFee", serviceFee);

    console.log(amount);
  };

  setPenaltyFee = amount => {
    let {
      userStore: { currentLoan, cookies }
    } = this.props;

    const { form } = this.props;
    const penaltyFee = amount * 0.05;
    form.setFieldsValue({
      penalty: penaltyFee
    });
    currentLoan.setProperty("penaltyFee", penaltyFee);
  };

  setAmountToLoan = value => {
    let {
      userStore: { currentLoan }
    } = this.props;

    const { form } = this.props;
    let newValue = 0;
    newValue = currentLoan["amountOfLoan"] - value;
    console.log(value);
    console.log(currentLoan["amountOfLoan"]);
    form.setFieldsValue({
      amountOfLoan: newValue
    });
  };

  render() {
    let {
      userStore: {
        uploadFiles,
        currentLoan,
        uploadID,
        currentUser,
        cookies,
        sendLoanRequest
      }
    } = this.props;

    const { getFieldDecorator } = this.props.form;
    const cookieData = cookies.get("userData");
    const props = {
      action: "//jsonplaceholder.typicode.com/posts/",
      onChange({ file, fileList }) {
        if (file.status !== "uploading") {
          console.log(file, fileList);
          // currentLoan.setProperty("uploadID", file);
          const fd = new FormData();
          fd.append("file", file.originFileObj);
          fd.append("filename", file.name);
          currentUser.setProperty("uploadID", file.name);
          axios.post(" http://127.0.0.1:3001/uploadFiles", fd).then(resp => {
            console.log("resp", resp.data);
            currentLoan.setProperty("uploadID", resp.data.name);
          });
          // console.log("current", currentLoan.uploadID);
          // console.log("file", file.originFileObj);
        }
      }
    };

    const termLoan = [
      { value: "3 months", label: "3 months" },
      { value: "6 months", label: "6 months" }
    ];

    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        footer={null}
        width={1100}
        title={"Loan Application Form"}
      >
        <Form className="regForm ::-webkit-scrollbar ">
          <FormItem>
            <Row gutter={24} style={{ marginTop: "6.5vh" }}>
              <Col span={8} key={0}>
                <FormItem label="Cooperative ID">
                  {getFieldDecorator("coopID", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up cooperative ID"
                      }
                    ]
                  })(
                    <Input
                      onChange={cooperativeID =>
                        currentUser.setProperty(
                          "cooperativeID",
                          cooperativeID.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={1}>
                <FormItem label="Full Name">
                  {getFieldDecorator("fullName", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up full name"
                      }
                    ]
                  })(
                    <Input
                      onChange={fullName =>
                        currentUser.setProperty(
                          "fullName",
                          fullName.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={2}>
                <FormItem label="Cooperative Name">
                  {getFieldDecorator("coopName", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up cooperative name"
                      }
                    ]
                  })(
                    <Input
                      onChange={coopName =>
                        currentLoan.setProperty(
                          "coopName",
                          coopName.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>

              <Col span={8} key={4}>
                <FormItem label="Address">
                  {getFieldDecorator("currentAddress", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up address"
                      }
                    ]
                  })(
                    <Input
                      onChange={currentAddress =>
                        currentUser.setProperty(
                          "currentAddress",
                          currentAddress.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={5}>
                <FormItem label="Contact Number">
                  {getFieldDecorator("contactNum", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up contact number"
                      }
                    ]
                  })(
                    <Input
                      onChange={contactNum =>
                        currentLoan.setProperty(
                          "contactNum",
                          contactNum.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={6}>
                <FormItem label="Contact No. Office">
                  {getFieldDecorator("contactNoOffice", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up office contact number"
                      }
                    ]
                  })(
                    <Input
                      onChange={contactNoOffice =>
                        currentUser.setProperty(
                          "contactNoOffice",
                          contactNoOffice.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>

              <Col span={8} key={7}>
                <FormItem label="Residence Contact Number">
                  {getFieldDecorator("residence", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up residence"
                      }
                    ]
                  })(
                    <Input
                      onChange={residence =>
                        currentUser.setProperty(
                          "residence",
                          residence.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={8}>
                <FormItem label="Membership Type">
                  {getFieldDecorator("membershipType", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up contact number"
                      }
                    ]
                  })(
                    <Input
                      onChange={membershipType =>
                        currentLoan.setProperty(
                          "membershipType",
                          membershipType.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={9}>
                <FormItem label="Occupation">
                  {getFieldDecorator("occupation", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up occupation"
                      }
                    ]
                  })(
                    <Input
                      onChange={occupation =>
                        currentUser.setProperty(
                          "occupation",
                          occupation.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>

              <Col span={8} key={10}>
                <FormItem label="Place Of Assignment">
                  {getFieldDecorator("placeOfAssignment", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up place of assignment"
                      }
                    ]
                  })(
                    <Input
                      onChange={placeOfAssignment =>
                        currentUser.setProperty(
                          "placeOfAssignment",
                          placeOfAssignment.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={11}>
                <FormItem label="Company Position">
                  {getFieldDecorator("position", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up position"
                      }
                    ]
                  })(
                    <Input
                      onChange={position =>
                        currentUser.setProperty(
                          "position",
                          position.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>

              <Col span={8} key={13}>
                <FormItem label="Monthly Basic Salary">
                  {getFieldDecorator("monthlyBasicSalary", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up place of monthly basic salary"
                      }
                    ]
                  })(
                    <Input
                      prefix={<Icon type="credit-card" />}
                      onChange={monthlyBasicSalary =>
                        currentUser.setProperty(
                          "monthlyBasicSalary",
                          monthlyBasicSalary.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>

              <Col span={8} key={15}>
                <FormItem label="Total Monthly Statutory Deductions">
                  {getFieldDecorator("totalMonthlyStatutoryDeductions", {
                    rules: [
                      {
                        required: true,
                        message:
                          "please fill up total monthly statutory deductions"
                      }
                    ]
                  })(
                    <Input
                      prefix={<Icon type="credit-card" />}
                      onChange={totalMonthlyStatutoryDeductions =>
                        currentUser.setProperty(
                          "totalMonthlyStatutoryDeductions",
                          totalMonthlyStatutoryDeductions.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={16}>
                <FormItem label="Total Monthly Non-Statutory Deductions">
                  {getFieldDecorator("totalMonthlyNonStatutoryDeductions", {
                    rules: [
                      {
                        required: true,
                        message:
                          "please fill up total monthly non-statutory deductions"
                      }
                    ]
                  })(
                    <Input
                      prefix={<Icon type="credit-card" />}
                      onChange={totalMonthlyNonStatutoryDeductions =>
                        currentUser.setProperty(
                          "totalMonthlyNonStatutoryDeductions",
                          totalMonthlyNonStatutoryDeductions.target.value
                        )
                      }
                    />
                  )}
                </FormItem>{" "}
              </Col>
            </Row>

            <Row gutter={24} style={{ marginTop: "6.5vh" }}>
              <Col span={8} key={25}>
                <FormItem label="Co-Maker Cooperative ID">
                  {getFieldDecorator("coMakercooperativeID", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up co maker id"
                      }
                    ]
                  })(
                    <Input
                      onChange={coMakercooperativeID =>
                        currentLoan.setProperty(
                          "coMakercooperativeID",
                          coMakercooperativeID.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={20}>
                <FormItem label="Co-maker Name">
                  {getFieldDecorator("coMakerName", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up co maker name"
                      }
                    ]
                  })(
                    <Input
                      onChange={coMakerName =>
                        currentLoan.setProperty(
                          "coMakerName",
                          coMakerName.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={1}>
                <FormItem label="Co-Maker Membership Type">
                  {getFieldDecorator("coMakermembershipType", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up co-maker membership type"
                      }
                    ]
                  })(
                    <Input
                      onChange={coMakermembershipType =>
                        currentLoan.setProperty(
                          "coMakermembershipType",
                          coMakermembershipType.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>

              <Col span={8} key={4}>
                <FormItem label="Co-Maker Occupation">
                  {getFieldDecorator("coMakerOccupation", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up co-maker occupation"
                      }
                    ]
                  })(
                    <Input
                      onChange={coMakerOccupation =>
                        currentLoan.setProperty(
                          "coMakerOccupation",
                          coMakerOccupation.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={5}>
                <FormItem label="Co-Maker Contact Number">
                  {getFieldDecorator("coMakerContactNum", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up contact number"
                      }
                    ]
                  })(
                    <Input
                      onChange={coMakerContactNum =>
                        currentLoan.setProperty(
                          "coMakerContactNum",
                          coMakerContactNum.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={6}>
                <FormItem label="Co-Maker Contact No. Office">
                  {getFieldDecorator("coMakerContactNoOffice", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up office contact number"
                      }
                    ]
                  })(
                    <Input
                      onChange={coMakerContactNoOffice =>
                        currentLoan.setProperty(
                          "coMakerContactNoOffice",
                          coMakerContactNoOffice.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>

              <Col span={8} key={7}>
                <FormItem label="Co-Maker Residence Contact Number">
                  {getFieldDecorator("coMakeResidence", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up comaker residence number"
                      }
                    ]
                  })(
                    <Input
                      onChange={coMakerResidence =>
                        currentLoan.setProperty(
                          "coMakerResidence",
                          coMakerResidence.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={8}>
                <FormItem label="Co-Maker Permanent Address">
                  {getFieldDecorator("coMakerpermanentAddress", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up co-maker permanent address"
                      }
                    ]
                  })(
                    <Input
                      onChange={coMakerpermanentAddress =>
                        currentLoan.setProperty(
                          "coMakerpermanentAddress",
                          coMakerpermanentAddress.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={9}>
                <FormItem label="Co- Maker Place of Assignment">
                  {getFieldDecorator("coMakerplaceOfAssignment", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up co-maker place of assignment"
                      }
                    ]
                  })(
                    <Input
                      onChange={coMakerplaceOfAssignment =>
                        currentLoan.setProperty(
                          "coMakerplaceOfAssignment",
                          coMakerplaceOfAssignment.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>

              <Col span={8} key={10}>
                <FormItem label="Co-Maker Position">
                  {getFieldDecorator("coMakerposition", {
                    rules: [
                      {
                        required: true,
                        message: "please fill up place of co maker position"
                      }
                    ]
                  })(
                    <Input
                      onChange={coMakerposition =>
                        currentLoan.setProperty(
                          "coMakerposition",
                          coMakerposition.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>

              <Col span={8} key={23}>
                <FormItem label="Co-Maker Monthly Basic Salary">
                  {getFieldDecorator("coMakermonthlyBasicSalary", {
                    rules: [
                      {
                        required: true,
                        message:
                          "please fill up place of co-maker monthly basic salary"
                      }
                    ]
                  })(
                    <Input
                      prefix={<Icon type="credit-card" />}
                      onChange={coMakermonthlyBasicSalary =>
                        currentLoan.setProperty(
                          "coMakermonthlyBasicSalary",
                          coMakermonthlyBasicSalary.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={16}>
                <FormItem label="Co-Maker Avenue Monthly Take Home Pay">
                  {getFieldDecorator("coMakeravenueMonthlyTakeHomePay", {
                    rules: [
                      {
                        required: true,
                        message:
                          "please fill up co-maker avenue monthly take home pay"
                      }
                    ]
                  })(
                    <Input
                      prefix={<Icon type="credit-card" />}
                      onChange={coMakeravenueMonthlyTakeHomePay =>
                        currentLoan.setProperty(
                          "coMakeravenueMonthlyTakeHomePay",
                          coMakeravenueMonthlyTakeHomePay.target.value
                        )
                      }
                    />
                  )}
                </FormItem>{" "}
              </Col>

              <Col span={8} key={15}>
                <FormItem label="Co-Maker Total Monthly Statutory Deductions">
                  {getFieldDecorator("coMakertotalMonthlyStatutoryDeductions", {
                    rules: [
                      {
                        required: true,
                        message:
                          "please fill up co-maker total monthly statutory deductions"
                      }
                    ]
                  })(
                    <Input
                      prefix={<Icon type="credit-card" />}
                      onChange={coMakertotalMonthlyStatutoryDeductions =>
                        currentLoan.setProperty(
                          "coMakertotalMonthlyStatutoryDeductions",
                          coMakertotalMonthlyStatutoryDeductions.target.value
                        )
                      }
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={21}>
                <FormItem label="Total Monthly Non-Statutory Deductions">
                  {getFieldDecorator(
                    "coMakertotalMonthlyNonStatutoryDeductions",
                    {
                      rules: [
                        {
                          required: true,
                          message:
                            "please fill up total monthly non-statutory deductions"
                        }
                      ]
                    }
                  )(
                    <Input
                      prefix={<Icon type="credit-card" />}
                      onChange={coMakertotalMonthlyNonStatutoryDeductions =>
                        currentLoan.setProperty(
                          "coMakertotalMonthlyNonStatutoryDeductions",
                          coMakertotalMonthlyNonStatutoryDeductions.target.value
                        )
                      }
                    />
                  )}
                </FormItem>{" "}
              </Col>
            </Row>
            {/* <span style={{ float: "left", fontSize: "2.5vh" }}>Co-Maker</span>
            <Row gutter={22} style={{ marginTop: "5vh" }}>
              {this.getFieldsComaker()}
            </Row> */}
          </FormItem>
          <FormItem style={{ margin: "auto", textAlign: "center" }}>
            <FormItem>
              <Row gutter={24} style={{ marginTop: "6.5vh" }}>
                <Col span={8} key={26}>
                  <FormItem label="Type of Loan">
                    {getFieldDecorator("typeOfLoan", {
                      rules: [
                        {
                          required: true,
                          message: "please fill up type of loan"
                        }
                      ]
                    })(
                      <Input
                        onChange={typeOfLoan =>
                          currentLoan.setProperty(
                            "typeOfLoan",
                            "Emergency Loan"
                          )
                        }
                      />
                    )}
                  </FormItem>
                </Col>

                <Col span={8} key={27}>
                  <FormItem label="Amount to Loan">
                    {getFieldDecorator("amountOfLoan", {
                      rules: [
                        {
                          required: true,
                          message: "please fill up amount to loan"
                        }
                      ]
                    })(
                      <Input
                        prefix={<Icon type="credit-card" />}
                        onChange={amountOfLoan => {
                          currentLoan.setProperty(
                            "amountOfLoan",
                            amountOfLoan.target.value
                          );
                          this.setServiceFee(amountOfLoan.target.value);
                          this.setPenaltyFee(amountOfLoan.target.value);
                        }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={8} key={28}>
                  <FormItem label="Date Requested">
                    {getFieldDecorator("dateRequested", {
                      rules: [
                        {
                          required: true,
                          message: "please fill up date requested"
                        }
                      ]
                    })(
                      <DatePicker
                        onChange={date => {
                          currentLoan.setProperty("dateRequested", date);
                        }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={8} key={30}>
                  <FormItem label="Term of Loan">
                    {getFieldDecorator("termOfLoan", {
                      rules: [
                        {
                          required: true,
                          message: "please fill up term of loan"
                        }
                      ]
                    })(
                      // <Input
                      //   onChange={termOfLoan =>
                      //     currentLoan.setProperty(
                      //       "termOfLoan",
                      //       termOfLoan.target.value
                      //     )
                      //   }
                      // />
                      <Cascader
                        options={termLoan}
                        onChange={this.getOnchange}
                        popupPlacement="bottomRight"
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={8} key={29}>
                  <FormItem label="Interest (%)">
                    {getFieldDecorator("interest", {
                      rules: [
                        {
                          required: true,
                          message: "please fill up interest"
                        }
                      ]
                    })(
                      <Input
                        onChange={interest =>
                          currentLoan.setProperty(
                            "interest",
                            interest.target.value
                          )
                        }
                      />
                    )}
                  </FormItem>
                </Col>

                <Col span={8} key={32}>
                  <FormItem label="Penalty Fee">
                    {getFieldDecorator("penalty", {
                      rules: [
                        {
                          required: true,
                          message: "please fill up penalty fee"
                        }
                      ]
                    })(
                      <Input
                        prefix={<Icon type="credit-card" />}
                        onChange={penalty =>
                          currentLoan.setProperty(
                            "penalty",
                            penalty.target.value
                          )
                        }
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={8} key={31}>
                  <FormItem label="Service Fee">
                    {getFieldDecorator("serviceFee", {
                      rules: [
                        {
                          required: true,
                          message: "please fill up serviceFee fee"
                        }
                      ]
                    })(
                      <Input
                        prefix={<Icon type="credit-card" />}
                        onChange={serviceFee =>
                          currentLoan.setProperty(
                            "serviceFee",
                            serviceFee.target.value
                          )
                        }
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={8} key={27}>
                  <FormItem label=" Down Payment">
                    {getFieldDecorator("amountToPay", {
                      rules: [
                        {
                          required: true,
                          message: "please fill up amount to pay"
                        }
                      ]
                    })(
                      <Input
                        prefix={<Icon type="credit-card" />}
                        onChange={amountToPay => {
                          currentLoan.setProperty(
                            "amountToPay",
                            amountToPay.target.value
                          );
                          this.setAmountToLoan(amountToPay.target.value);
                        }}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </FormItem>
            <Card style={{ width: "50%", margin: "auto" }}>
              <h4 style={{ marginBottom: "5vh" }}>
                Please upload your Cooperative ID and the Co-Maker Cooperative
                ID
              </h4>

              <Upload {...props}>
                <Button
                  style={{ marginBottom: "12vh", marginTop: "4vh" }}
                  size="large"
                >
                  <span>
                    <span>
                      <Icon type="upload" />
                    </span>
                    Upload
                  </span>
                </Button>
              </Upload>
            </Card>
          </FormItem>
          <FormItem>
            <FormItem>
              <FormItem style={{ textAlign: "center", marginBottom: "10px" }}>
                <Button
                  size="large"
                  style={{ width: "60vh", marginTop: "4vh" }}
                  type="primary"
                  onClick={() => {
                    this.handleSubmit();
                    // uploadFiles();
                    // this.fileSelectedHander;
                    sendLoanRequest();
                  }}
                >
                  Submit
                </Button>
              </FormItem>
            </FormItem>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const WrapEmergencyLoanModal = Form.create()(EmergencyLoanModal);
export default withRouter(
  inject("userStore")(observer(WrapEmergencyLoanModal))
);

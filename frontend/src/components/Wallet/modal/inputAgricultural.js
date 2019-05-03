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
  Upload
} from "antd";
import { inject, observer } from "mobx-react";
import { withRouter, BrowserRouter } from "react-router-dom";
const { FormItem } = Form.Item;

class InputAgricultural extends Component {
  //   setInitialValues = () => {
  //     let {
  //       userStore: { currentLoan, currentUser, cookies }
  //     } = this.props;

  //     const cookieData = cookies.get("userData");

  //     const { form } = this.props;
  //     form.setFieldsValue({
  //       coopID: cookieData["cooperativeID"]
  //     });
  //     form.setFieldsValue({
  //       coopName: cookieData["coopName"]
  //     });
  //   };
  render() {
    let {
      userStore: { uploadFiles, currentLoan, uploadID, currentUser, cookies }
    } = this.props;

    const { getFieldDecorator } = this.props.form;

    const cookieData = cookies.get("userData");

    return (
      <Layout>
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
                    cooperativeID,
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
                  currentUser.setProperty("fullName", fullName.target.value)
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
                  currentLoan.setProperty("coopName", coopName.target.value)
                }
              />
            )}
          </FormItem>
        </Col>

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
                    cooperativeID,
                    cooperativeID.target.value
                  )
                }
              />
            )}
          </FormItem>
        </Col>

        <Col span={8} key={3}>
          <FormItem label="Address">
            {getFieldDecorator("permanentsAddress", {
              rules: [
                {
                  required: true,
                  message: "please fill up address"
                }
              ]
            })(
              <Input
                onChange={permanentsAddress =>
                  currentUser.setProperty(
                    "permanentsAddress",
                    permanentsAddress.target.value
                  )
                }
              />
            )}
          </FormItem>
        </Col>
        <Col span={8} key={4}>
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
                  currentLoan.setProperty("contactNum", contactNum.target.value)
                }
              />
            )}
          </FormItem>
        </Col>
        <Col span={8} key={5}>
          <FormItem label="contactNoOffice">
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
                    contactNoOffice,
                    contactNoOffice.target.value
                  )
                }
              />
            )}
          </FormItem>
        </Col>

        <Col span={8} key={6}>
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
                  currentUser.setProperty("residence", residence.target.value)
                }
              />
            )}
          </FormItem>
        </Col>
        <Col span={8} key={4}>
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
        <Col span={8} key={5}>
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
                  currentUser.setProperty(occupation, occupation.target.value)
                }
              />
            )}
          </FormItem>
        </Col>

        <Col span={8} key={6}>
          <FormItem label="placeOfAssignment">
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
        <Col span={8} key={4}>
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
                  currentLoan.setProperty("position", position.target.value)
                }
              />
            )}
          </FormItem>
        </Col>
        <Col span={8} key={5}>
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
                  currentUser.setProperty(occupation, occupation.target.value)
                }
              />
            )}
          </FormItem>
        </Col>

        <Col span={8} key={6}>
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
        <Col span={8} key={4}>
          <FormItem label="Company Position">
            {getFieldDecorator("avenueMonthlyTakeHomePay", {
              rules: [
                {
                  required: true,
                  message: "please fill up avenue monthly take home pay"
                }
              ]
            })(
              <Input
                prefix={<Icon type="credit-card" />}
                onChange={avenueMonthlyTakeHomePay =>
                  currentLoan.setProperty(
                    "avenueMonthlyTakeHomePay",
                    avenueMonthlyTakeHomePay.target.value
                  )
                }
              />
            )}
          </FormItem>
        </Col>
        <Col span={8} key={4}>
          <FormItem label="Total Monthly Statutory Deductions">
            {getFieldDecorator("totalMonthlyStatutoryDeductions", {
              rules: [
                {
                  required: true,
                  message: "please fill up total monthly statutory deductions"
                }
              ]
            })(
              <Input
                prefix={<Icon type="credit-card" />}
                onChange={totalMonthlyStatutoryDeductions =>
                  currentLoan.setProperty(
                    "totalMonthlyStatutoryDeductions",
                    totalMonthlyStatutoryDeductions.target.value
                  )
                }
              />
            )}
          </FormItem>
        </Col>
        <Col span={8} key={4}>
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
                  currentLoan.setProperty(
                    "totalMonthlyNonStatutoryDeductions",
                    totalMonthlyNonStatutoryDeductions.target.value
                  )
                }
              />
            )}
          </FormItem>{" "}
          */}{" "}
        </Col>
      </Layout>
    );
  }
}

const WrapInputAgricultural = Form.create()(InputAgricultural);
export default withRouter(inject("userStore")(observer(InputAgricultural)));

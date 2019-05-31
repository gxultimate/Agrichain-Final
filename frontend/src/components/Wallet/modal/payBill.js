import React, { Component } from "react";

import { Form, Input, Button, Layout, Modal, message, Icon } from "antd";
import { inject, observer } from "mobx-react";
class PayBillModal extends Component {
  state = { visible: false };
  toggleLoanModal = () => {
    this.setState({
      visible2: !this.state.visible2
    });
  };

  componentDidMount() {
    setInterval(() => {
      this.setInitialValue();
    }, 2000);
  }

  setInitialValue = () => {
    let {
      userStore: { cookies, currentLoan }
    } = this.props;

    console.log(currentLoan, "currentloan");
    let { form } = this.props;

    let data = currentLoan.data;
    // console.log(data, "data");
    // if (data !== undefined) {
    form.setFieldsValue({
      typeOfLoan: data["borrowerParsedTypeOfLoan"]
    });

    form.setFieldsValue({
      amountOfLoan: data["borrowerParsedAmountOfLoan"]
    });

    form.setFieldsValue({
      borrowerLoanBalance: data["borrowerParsedLoanBalance"]
    });

    currentLoan.setProperty("loanRequestID", data["loanRequestID"]);
  };
  setValue = value => {
    console.log(value);
  };

  render() {
    let { getFieldDecorator } = this.props.form;
    let {
      userStore: { currentLoan, sendLoanPayment }
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        title="Pay Loan Bills"
        footer={(null, null)}
        size="xs"
      >
        <Form {...formItemLayout}>
          <Form.Item label="Type of Loan">
            {getFieldDecorator("typeOfLoan", {
              rules: [{ required: true, message: "type of loan is required" }]
            })(
              <Input
                name="typeOfLoan"
                type="text"
                onChange={typeOfLoan =>
                  currentLoan.setProperty("typeOfLoan", typeOfLoan.target.value)
                }
              />
            )}
          </Form.Item>
          <Form.Item label="Total Amount">
            {getFieldDecorator("amountOfLoan", {
              rules: [{ required: true, message: "amount of loan is required" }]
            })(
              <Input
                prefix={<Icon type="credit-card" />}
                name="amountOfLoan"
                type="text"
                onChange={amountOfLoan =>
                  currentLoan.setProperty(
                    "amountOfLoan",
                    amountOfLoan.target.value
                  )
                }
              />
            )}
          </Form.Item>
          <Form.Item label="Loan Balance">
            {getFieldDecorator("borrowerLoanBalance", {
              rules: [{ required: true, message: " loan  balance is required" }]
            })(
              <Input
                prefix={<Icon type="credit-card" />}
                name="borrowerLoanBalance"
                type="text"
                onChange={borrowerLoanBalance =>
                  currentLoan.setProperty(
                    "borrowerLoanBalance",
                    borrowerLoanBalance.target.value
                  )
                }
              />
            )}
          </Form.Item>
          <Form.Item label="Amount to Pay">
            {getFieldDecorator("amountToPay", {
              rules: [{ required: true, message: " amount to pay is required" }]
            })(
              <Input
                prefix={<Icon type="credit-card" />}
                name="amountToPay"
                type="text"
                onChange={amountToPay => {
                  currentLoan.setProperty(
                    "amountToPay",
                    amountToPay.target.value
                  );
                  this.setValue(amountToPay.target.value);
                }}
              />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              size="large"
              style={{ width: "100%" }}
              type="primary"
              onClick={() => {
                sendLoanPayment();
              }}
            >
              Pay{" "}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrapPayBillModal = Form.create()(PayBillModal);
export default inject("userStore")(observer(WrapPayBillModal));

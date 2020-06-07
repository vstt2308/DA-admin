import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Form,
  Input,
  Row,
  Col,
  Modal,
  Radio,
  Button,
  Tabs,
  InputNumber,
  DatePicker,
  Icon,
  Tooltip
} from "antd";
import PropTypes from "prop-types";
import IntlMessages from "Util/IntlMessages";
import { updateCoupon } from "../../../actions/CouponAction";
import TextArea from "antd/lib/input/TextArea";
import BaseSelect from "Components/Elements/BaseSelect";
import moment from "moment";

const { TabPane } = Tabs;

class AddCoupon extends Component {
  static propTypes = {
    coupon: PropTypes.object,
    onSaveCoupon: PropTypes.func,
    open: PropTypes.bool,
    onCouponClose: PropTypes.func
  };

  static defaultProps = {
    coupon: {},
    edit: false,
    open: false
  };

  state = {
    coupon: null,
    value: 1,
    filter: { paging: 0 },
    couponcode: "",
    type: 2
  };

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.coupon && nextProps.coupon !== this.props.coupon) {
      this.setState({
        couponcode: nextProps.coupon.code,
        type: nextProps.coupon.type
      });
    }
  }

  onChangeData = e => {
    this.setState({
      type: e.target.value
    });
    console.log(this.state.type);
  };

  getRandomNum = () => {
    // between 0 - 1
    var rndNum = Math.random();
    // rndNum from 0 - 1000
    rndNum = parseInt(rndNum * 1000);
    // rndNum from 33 - 127
    rndNum = (rndNum % 94) + 33;
    return rndNum;
  };

  checkPunc(num) {
    if (num >= 33 && num <= 47) {
      return true;
    }
    if (num >= 58 && num <= 64) {
      return true;
    }
    if (num >= 91 && num <= 96) {
      return true;
    }
    if (num >= 123 && num <= 126) {
      return true;
    }

    return false;
  }

  generatecode = () => {
    var length = 8;
    var sCode = "";

    for (let i = 0; i < length; i++) {
      let numI = this.getRandomNum();
      while (this.checkPunc(numI)) {
        numI = this.getRandomNum();
      }
      sCode = sCode + String.fromCharCode(numI);
    }
    sCode = sCode.toUpperCase();

    this.setState(
      {
        couponcode: sCode
      },
      () => {
        console.log(this.state.couponcode);
      }
    );
    return true;
  };

  onHandleClose = () => {
    this.setState({
      ...this.state,
      open: !this.state.open,
      couponcode: "",
      type: 2
    });
    this.props.onCouponClose();
  };

  Update = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var coupon = {
          ...values,
          code: this.state.couponcode,
          type: this.state.type
        };
        this.props.onSaveCoupon(
          coupon,
          this.props.coupon ? this.props.coupon.id : null
        );
      }
      this.setState({
        coupon: null,
        couponcode: "",
        type: 2
      });
    });
  };

  onChange(event) {
    console.log(event);
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };

    const inputLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const {
      onCouponClose,
      open,
      edit,
      coupon,
      listAccount,
      listActivity
    } = this.props;

    const { type } = this.state;

    const accounts = listAccount.map(item => {
      return {
        id: item.id,
        title: (item.email
          ? `${item.email} - ${item.firstname} ${item.lastname}`
          : `${item.mobile}`
        )
          .split("null", 1)
          .toString()
      };
    });

    const activities = listActivity.map(item => {
      return {
        id: item.id,
        title: item.title
      };
    });

    const currencies = [
      { id: "USD", title: "USD" },
      { id: "AUD", title: "AUD" },
      { id: "EUR", title: "EUR" },
      { id: "CAD", title: "CAD" }
    ];

    const { getFieldDecorator } = this.props.form;

    return (
      <React.Fragment>
        {open ? (
          <Modal
            title={
              edit ? (
                <IntlMessages id="coupon.edit" />
              ) : (
                <IntlMessages id="coupon.create" />
              )
            }
            visible={open}
            toggle={onCouponClose}
            closable={true}
            onCancel={this.onHandleClose}
            footer={null}
            width="50%"
          >
            <Form
              onSubmit={this.Update}
              {...formItemLayout}
              style={{ width: "100%" }}
              name="adminForm"
            >
              <Tabs defaultActiveKey="1" type="card">
                <TabPane tab={<IntlMessages id="global.tabbasic" />} key="1">
                  <Form.Item label={<IntlMessages id="coupon.title" />}>
                    {getFieldDecorator("title", {
                      rules: [
                        { required: true, message: "Please input your title!" }
                      ],
                      initialValue: coupon ? coupon.title || "" : ""
                    })(<Input style={{ width: "100%" }} />)}
                  </Form.Item>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        label={<IntlMessages id="coupon.code" />}
                        {...inputLayout}
                      >
                        <Input
                          required
                          value={this.state.couponcode}
                          style={{ width: "100%" }}
                          name="couponcode"
                          suffix={
                            <Tooltip title="Random code">
                              <Icon
                                type="redo"
                                onClick={() => this.generatecode()}
                              />
                            </Tooltip>
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label={<IntlMessages id="order.passenger.expiry" />}
                        {...inputLayout}
                      >
                        {getFieldDecorator("expired", {
                          rules: [
                            {
                              required: true,
                              message: "Please pick a date !"
                            }
                          ],
                          initialValue: coupon
                            ? coupon.expired
                              ? moment(coupon.expired)
                              : moment().add(6, "months")
                            : moment().add(6, "months")
                        })(
                          <DatePicker
                            placeholder="Pick date"
                            style={{ width: "100%" }}
                            disabledDate={current => {
                              return (
                                current && current < moment().subtract(1, "day")
                              );
                            }}
                          />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        label={<IntlMessages id="coupon.min_order" />}
                        {...inputLayout}
                      >
                        {getFieldDecorator("min_order", {
                          initialValue: coupon ? +coupon.min_order : 0
                        })(<InputNumber min={0} style={{ width: "100%" }} />)}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label={<IntlMessages id="coupon.amount" />}
                        {...inputLayout}
                      >
                        {getFieldDecorator("amount", {
                          rules: [
                            {
                              required: true,
                              message: "Please input your amount!"
                            }
                          ],
                          initialValue: coupon ? +coupon.amount : 1
                        })(<InputNumber min={1} style={{ width: "100%" }} />)}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label={<IntlMessages id="sidebar.currency" />}>
                    {getFieldDecorator("currency", {
                      initialValue: coupon ? coupon.currency : ""
                    })(
                      <BaseSelect
                        showSearch
                        options={currencies}
                        defaultText="Select currency..."
                        selected={coupon ? coupon.currency : ""}
                      />
                    )}
                  </Form.Item>
                  <Form.Item label={<IntlMessages id="global.type" />}>
                    {getFieldDecorator("type", {
                      initialValue: coupon ? (coupon.type === 2 ? 2 : 1) : 2
                    })(
                      <Radio.Group
                        name="radiogroup"
                        onChange={this.onChangeData}
                      >
                        <Radio value={1}>
                          <IntlMessages id="coupon.assigned" />
                        </Radio>
                        <Radio value={2}>
                          <IntlMessages id="coupon.unassigned" />
                        </Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                  {this.state.type === 2 ? (
                    <Form.Item
                      label={<IntlMessages id="coupon.max_redemptions" />}
                    >
                      {getFieldDecorator("max_redemptions", {
                        initialValue: coupon ? +coupon.max_redemptions : 0
                      })(<InputNumber min={0} style={{ width: "100%" }} />)}
                    </Form.Item>
                  ) : null}
                  {this.state.type === 2 ? null : (
                    <React.Fragment>
                      <Form.Item label={<IntlMessages id="coupon.cid" />}>
                        {getFieldDecorator("cid", {
                          initialValue: coupon ? coupon.cid : 0
                        })(
                          <BaseSelect
                            options={accounts}
                            selected={coupon ? coupon.cid : 0}
                            defaultText="Select a customer"
                            showSearch={true}
                          />
                        )}
                      </Form.Item>
                      <Form.Item
                        label={<IntlMessages id="coupon.referral_id" />}
                      >
                        {getFieldDecorator("referral_id", {
                          initialValue: coupon ? +coupon.referral_id : 0
                        })(
                          <BaseSelect
                            options={accounts}
                            selected={coupon ? +coupon.referral_id : 0}
                            defaultText="Select a referral"
                            showSearch={true}
                          />
                        )}
                      </Form.Item>
                    </React.Fragment>
                  )}
                  <Form.Item label={<IntlMessages id="coupon.content" />}>
                    {getFieldDecorator("content", {
                      initialValue: coupon ? coupon.content || "" : ""
                    })(<TextArea style={{ width: "100%" }} />)}
                  </Form.Item>

                  <Form.Item label={<IntlMessages id="global.status" />}>
                    {getFieldDecorator("status", {
                      initialValue: coupon ? (coupon.status === 1 ? 1 : 2) : 1
                    })(
                      <Radio.Group name="radiogroup">
                        <Radio value={2}>
                          <IntlMessages id="coupon.used" />
                        </Radio>
                        <Radio value={1}>
                          <IntlMessages id="coupon.notyet" />
                        </Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </TabPane>
              </Tabs>
              <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                  <Button
                    style={{ marginLeft: 8 }}
                    type="default"
                    onClick={() => this.onHandleClose()}
                  >
                    <IntlMessages id="global.cancel" />
                  </Button>
                  <Button
                    type="primary"
                    style={{ marginLeft: 8 }}
                    htmlType="submit"
                  >
                    <IntlMessages id="global.submit" />
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal>
        ) : null}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    listCoupon: state.coupon.listCoupon
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateCoupon: data => dispatch(updateCoupon(data))
  };
}

const WrappedNormalLoginForm = Form.create({ name: "AddCoupon" })(AddCoupon);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);

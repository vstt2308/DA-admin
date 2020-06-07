import { Button, Col, Form, Input, InputNumber, Modal, Row } from "antd";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import IntlMessages from "Util/IntlMessages";
import { getAllGroups } from "../../../actions/GroupActions";
import InputChosseFile from "../../fileManager/InputChosseFile";

class AddSupplier extends Component {
  static propTypes = {
    account: PropTypes.object,
    onSaveAccount: PropTypes.func,
    open: PropTypes.bool,
    onAccountClose: PropTypes.func
  };

  static defaultProps = {
    account: {
      groupid: []
    },
    edit: false,
    open: false
  };

  state = {
    groupid: [],
    account: null,
    image: ""
  };

  getValueChosseFile = data => {
    this.setState({
      ...this.state,
      image: data[0] ? data[0].path_relative : ""
    });
  };
  async componentDidMount() {
    await this.props.getListGroup();
    let register = this.props.listGroup.filter(
      item => item.slug === "supplier"
    );
    this.setState({
      ...this.state,
      groupid: this.props.edit
        ? this.props.account.groupid
        : register.map(item => item.id),
      account: this.props.account
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.account !== state.account) {
      let register = props.listGroup.filter(item => item.slug === "supplier");
      return {
        ...state,
        groupid: props.edit
          ? props.account.groups.map(item => item.id)
          : register.length
          ? register.map(item => item.id)
          : [null],
        account: props.account
      };
    }
    return null;
  }

  // onSetGroup = (name, value) => {
  //     this.setState({
  //         groupid: value
  //     })
  // }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var account = {
          ...values,
          groupid: this.state.groupid,
          image: this.state.image
        };
        this.props.onSaveAccount(
          account,
          this.props.account ? this.props.account.id : null
        ).then(res => this.setState({
          image: ""
        }));
      }
    });
  };

  render() {
    const { onAccountClose, open, account, edit } = this.props;
    const { getFieldDecorator } = this.props.form;
    const dedfaultImage = account
      ? account.image
        ? [{ name: account.image, path_relative: account.image }]
        : []
      : [];

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };
    return (
      <React.Fragment>
        {open ? (
          <Modal
            title={
              edit ? (
                <IntlMessages id="account.saveSupplier" />
              ) : (
                <IntlMessages id="account.addSupplier" />
              )
            }
            toggle={onAccountClose}
            visible={open}
            closable={true}
            destroyOnClose={true}
            onCancel={() => this.props.onAccountClose()}
            footer={null}
            width="50%"
          >
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label={<IntlMessages id="global.firstname" />}>
                {getFieldDecorator("firstname", {
                  rules: [
                    { required: true, message: "Please input your firstname!" }
                  ],
                  initialValue: account ? account.firstname || "" : ""
                })(<Input style={{ width: "100%" }} />)}
              </Form.Item>

              <Form.Item label={<IntlMessages id="global.lastname" />}>
                {getFieldDecorator("lastname", {
                  rules: [
                    { required: true, message: "Please input your last name !" }
                  ],
                  initialValue: account ? account.lastname || "" : ""
                })(<Input style={{ width: "100%" }} />)}
              </Form.Item>

              {edit ? null : (
                <Form.Item
                  label={<IntlMessages id="global.password" />}
                  hasFeedback
                >
                  {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your password!"
                      },
                      {
                        validator: this.validateToNextPassword
                      }
                    ],
                    initialValue: account ? account.password || "" : ""
                  })(<Input.Password />)}
                </Form.Item>
              )}
              <Form.Item label={<IntlMessages id="global.email" />}>
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message: "The input is not valid E-mail!"
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!"
                    }
                  ],
                  initialValue: account ? account.email || "" : ""
                })(<Input />)}
              </Form.Item>
              <Form.Item label={<IntlMessages id="global.mobile" />}>
                {getFieldDecorator("mobile", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your phone number!"
                    }
                  ],
                  initialValue: account ? account.mobile || "" : ""
                })(<InputNumber style={{ width: "100%" }} />)}
              </Form.Item>
              <Form.Item label={<IntlMessages id="global.company" />}>
                {getFieldDecorator("company", {
                  rules: [{ required: true, message: "Please input Company!" }],
                  initialValue: account ? account.company || "" : ""
                })(<Input style={{ width: "100%" }} />)}
              </Form.Item>

              <Form.Item label={<IntlMessages id="global.avatar" />}>
                <InputChosseFile
                  onChange={this.getValueChosseFile}
                  limit={1}
                  defautValue={dedfaultImage}
                ></InputChosseFile>
              </Form.Item>

              {/* <Form.Item label="Group">
                                <BaseCheckBoxList data={this.props.listGroup} name="groupid" value={this.state.groupid} onChange={this.onSetGroup} />
                            </Form.Item> */}

              <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                  <Button
                    style={{ marginLeft: 8 }}
                    type='default'
                    onClick={() => this.props.onAccountClose()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    style={{ marginLeft: 8 }}
                    htmlType="submit"
                    loading={this.props.loading}
                  >
                    Submit
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
const mapStateToProps = state => {
  return {
    listGroup: state.group.listGroup
  };
};
function mapDispatchToProps(dispatch) {
  return {
    getListGroup: () => dispatch(getAllGroups())
  };
}

export default Form.create({ name: "supplier" })(
  connect(mapStateToProps, mapDispatchToProps)(AddSupplier)
);

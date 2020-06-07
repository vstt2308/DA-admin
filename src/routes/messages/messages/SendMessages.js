import React, { Component } from "react";
import { Form, Row, Col, Modal, Button } from "antd";
import PropTypes from "prop-types";
import IntlMessages from "Util/IntlMessages";
import BaseSelect from "Components/Elements/BaseSelect";
import { connect } from "react-redux";
import { getAllACCOUNT } from "../../../actions/AccountAction";

class SendMessages extends Component {
  static propTypes = {
    messages: PropTypes.object,
    onSaveMessages: PropTypes.func,
    openSend: PropTypes.bool,
    onMessagesClose: PropTypes.func
  };

  static defaultProps = {
    edit: false,
    openSend: false
  };

  state = {
    openSend: false,
    filterAll: { paging: 0 }
  };

  componentDidMount() {
    this.props.getAllCustomer(this.state.filterAll, "registered");
  }

  onHandleClose = () => {
    this.props.onMessagesClose();
    this.setState({
      ...this.state,
      openSend: !this.state.openSend
    });
  };

  Update = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var customers = {
          ...values,
          message_id: this.props.messages.id
        };
        console.log(customers);

        this.props.onSendMessages(customers);
      }
      this.setState({
        customers: null
      });
    });
  };

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

    const { openSend, listCustomer } = this.props;

    const customers = listCustomer.map(item => {
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

    const { getFieldDecorator } = this.props.form;

    return (
      <React.Fragment>
        {openSend ? (
          <Modal
            title="Send"
            visible={openSend}
            closable={true}
            onCancel={this.onHandleClose}
            footer={null}
            width="50%"
          >
            <Form
              onSubmit={this.Update}
              {...formItemLayout}
              style={{ width: "100%" }}
            >
              <Form.Item label={<IntlMessages id="messages.customer" />}>
                {getFieldDecorator("target_ids", {
                  rules: [
                    {
                      required: true,
                      message: "Please input customer!"
                    }
                  ],
                  initialValue: []
                })(<BaseSelect mode="multiple" options={customers} />)}
              </Form.Item>
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
                    loading={this.props.loading}
                  >
                    <IntlMessages id="global.send" />
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
    listMessages: state.messages.listMessages,
    listCustomer: state.account.listAccount,
    paging: state.messages.paging
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllCustomer: (filter, type) => dispatch(getAllACCOUNT(filter, type))
  };
}

const WrappedNormalLoginForm = Form.create({ name: "SendMessages" })(
  SendMessages
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import IntlMessages from "Util/IntlMessages";
import { Form, Input, Row, Col, Button, Modal, Radio, Tabs, Rate } from "antd";
import { getAllEmail } from "../../../actions/Email_templatesActions";
import { NotificationManager } from "react-notifications";
import SunEditor, { buttonList } from "suneditor-react";

class AddEmail extends Component {
  static propTypes = {
    email_template: PropTypes.object,
    onSaveEmail: PropTypes.func,
    open: PropTypes.bool,
    onEmailClose: PropTypes.func,
    edit: PropTypes.bool
  };

  state = {
    currentEmail: null,
    filter: {
      paging: {
        page: 1
      }
    },
    images: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var email_template = { ...values };
        this.props.onSaveEmail(
          email_template,
          this.props.email_template ? this.props.email_template.id : null
        );
      } else {
        NotificationManager.error("Please fill out all inputs and try again!");
      }
      this.setState({
        ...this.state,
        email_template: null
      });
    });
  };

  onClose() {
    this.setState({
      email_template: null
    });
    this.props.onEmailClose();
  }

  render() {
    const { open, onEmailClose, edit, email_template } = this.props;

    const desc = ["terrible", "bad", "normal", "good", "wonderful"];

    const { getFieldDecorator } = this.props.form;

    const { TabPane } = Tabs;
    const { TextArea } = Input;
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
    const formDesc = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 0 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 }
      }
    };
    return (
      <React.Fragment>
        {open ? (
          <Modal
            title={
              edit ? (
                <IntlMessages id="email_template.editEmail" />
              ) : (
                <IntlMessages id="email_template.addEmail" />
              )
            }
            onCancel={onEmailClose}
            visible={open}
            closable={true}
            destroyOnClose={true}
            footer={null}
            width="60%"
          >
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Tabs defaultActiveKey="1" >
                <TabPane tab={<IntlMessages id="global.tabbasic" />} key="1">
                  <Form.Item label={<IntlMessages id="email_template.code" />}>
                    {getFieldDecorator("code", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your code !"
                        }
                      ],
                      initialValue: email_template
                        ? email_template.code || ""
                        : ""
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label={<IntlMessages id="email_template.title" />}>
                    {getFieldDecorator("title", {
                      rules: [
                        {
                          required: true,
                          message: "Please select tour title!"
                        }
                      ],
                      initialValue: email_template ? email_template.title : ""
                    })(<Input />)}
                  </Form.Item>
                </TabPane>
                <TabPane
                  tab={<IntlMessages id="email_template.customer" />}
                  key="2"
                >
                  <Form.Item
                    label={<IntlMessages id="email_template.customer_sms" />}
                  >
                    {getFieldDecorator("customer_sms", {
                      initialValue: email_template
                        ? email_template.customer_sms
                        : ""
                    })(<TextArea />)}
                  </Form.Item>
                  <Form.Item
                    label={<IntlMessages id="email_template.push_customer" />}
                  >
                    {getFieldDecorator("push_customer", {
                      initialValue: email_template
                        ? email_template.push_customer
                        : ""
                    })(<TextArea />)}
                  </Form.Item>
                  <Form.Item
                    label={
                      <IntlMessages id="email_template.customer_subject" />
                    }
                  >
                    {getFieldDecorator("customer_subject", {
                      initialValue: email_template
                        ? email_template.customer_subject
                        : ""
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item
                    label={<IntlMessages id="email_template.customer_body" />}
                  >
                    {getFieldDecorator("customer_body", {
                      initialValue: email_template
                        ? email_template.customer_body
                        : ""
                    })(
                      <SunEditor
                        setContents={
                          email_template ? email_template.customer_body : ""
                        }
                        placeholder="Please type here..."
                        setOptions={{
                          buttonList: buttonList.complex
                        }}
                      />
                    )}
                  </Form.Item>
                  <Form.Item
                    label={<IntlMessages id="email_template.secondary_body" />}
                  >
                    {getFieldDecorator("secondary_body", {
                      initialValue: email_template
                        ? email_template.secondary_body
                        : ""
                    })(
                      <SunEditor
                        setContents={
                          email_template ? email_template.secondary_body : ""
                        }
                        placeholder="Please type here..."
                        setOptions={{
                          buttonList: buttonList.complex
                        }}
                      />
                    )}
                  </Form.Item>
                </TabPane>
                <TabPane
                  tab={<IntlMessages id="email_template.admin" />}
                  key="3"
                >
                  <Form.Item
                    label={<IntlMessages id="email_template.push_admin" />}
                  >
                    {getFieldDecorator("push_admin", {
                      initialValue: email_template
                        ? email_template.push_admin
                        : ""
                    })(<TextArea />)}
                  </Form.Item>
                  <Form.Item
                    label={<IntlMessages id="email_template.admin_subject" />}
                  >
                    {getFieldDecorator("admin_subject", {
                      initialValue: email_template
                        ? email_template.admin_subject
                        : ""
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item
                    label={<IntlMessages id="email_template.admin_body" />}
                  >
                    {getFieldDecorator("admin_body", {
                      initialValue: email_template
                        ? email_template.admin_body || ""
                        : ""
                    })(
                      <SunEditor
                        setContents={
                          email_template ? email_template.admin_body || "" : ""
                        }
                        placeholder="Please type here..."
                        setOptions={{
                          buttonList: buttonList.complex
                        }}
                      />
                    )}
                  </Form.Item>
                </TabPane>
              </Tabs>
              <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                  <Button type="default" onClick={() => this.onClose()}>
                    <IntlMessages id="global.cancel" />
                  </Button>
                  <Button
                    type="primary"
                    style={{ marginLeft: 8 }}
                    htmlType="submit"
                    loading={this.props.loading}
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

function mapDispatchToProps(dispatch) {
  return {
    getAllEmail: (filter, paginate) => dispatch(getAllEmail(filter, paginate))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Form.create({ name: "message_template" })(AddEmail));

import { Button, Col, Form, Input, Modal, Row } from "antd";
import BaseSelect from "Components/Elements/BaseSelect";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import IntlMessages from "Util/IntlMessages";

class AddAsset extends Component {
  static propTypes = {
    asset: PropTypes.object,
    onSaveAsset: PropTypes.func,
    open: PropTypes.bool,
    onAssetClose: PropTypes.func
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var asset = { ...values };

        this.props.onSaveAsset(
          asset,
          this.props.asset ? this.props.asset.id : null
        );
      }
    });
  };

  render() {
    const { onAssetClose, open, asset, edit, assetParent } = this.props;
    if (assetParent.length > 0 && assetParent[0].id !== 0) {
      assetParent.unshift({
        id: 0,
        parent_id: 0,
        title: "No parent"
      });
    }
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
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
                <IntlMessages id="global.edit" />
              ) : (
                <IntlMessages id="global.create" />
              )
            }
            onCancel={onAssetClose}
            visible={open}
            closable={true}
            footer={null}
            width="50%"
          >
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="Title">
                {getFieldDecorator("title", {
                  rules: [{ required: true, message: "Please input title!" }],
                  initialValue: asset ? asset.title || "" : ""
                })(<Input style={{ width: "100%" }} />)}
              </Form.Item>

              <Form.Item label="Type">
                {getFieldDecorator("type", {
                  rules: [{ required: true, message: "Please input Type!" }],
                  initialValue: asset ? asset.type || "" : ""
                })(<Input style={{ width: "100%" }} />)}
              </Form.Item>
              <Form.Item label="Alias">
                {getFieldDecorator("alias", {
                  rules: [{ required: true, message: "Please input alias!" }],
                  initialValue: asset ? asset.alias || "" : ""
                })(<Input style={{ width: "100%" }} />)}
              </Form.Item>
              <Form.Item label="Icon">
                {getFieldDecorator("icon", {
                  rules: [{ required: true, message: "Please input icon!" }],
                  initialValue: asset ? asset.icon || "" : ""
                })(<Input style={{ width: "100%" }} />)}
              </Form.Item>
              <Form.Item label="Path">
                {getFieldDecorator("path", {
                  rules: [{ required: true, message: "Please input path!" }],
                  initialValue: asset ? asset.path || "" : ""
                })(<Input style={{ width: "100%" }} />)}
              </Form.Item>
              <Form.Item label={<IntlMessages id="global.parent" />}>
                {getFieldDecorator("parent_id", {
                  initialValue: asset ? asset.parent_id : ""
                })(
                  <BaseSelect
                    options={assetParent}
                    selected={asset ? asset.parent_id : ""}
                    defaultText="Select asset parent..."
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    showSearch={true}
                  />
                )}
              </Form.Item>

              <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                  <Button
                    style={{ marginLeft: 8 }}
                    type="danger"
                    ghost
                    onClick={() => this.props.onAssetClose()}
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

export default Form.create({ name: "asset" })(connect(null, null)(AddAsset));

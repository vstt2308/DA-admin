import { Button, Col, Form, Input, Modal, Row } from "antd";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import IntlMessages from "Util/IntlMessages";
import { getAllAsset } from "../../../actions/AssetActions";
import BaseCheckBoxList from "../../../Components/Elements/BaseCheckboxes";

class AddGroup extends Component {
  static propTypes = {
    group: PropTypes.object,
    onSaveGroup: PropTypes.func,
    open: PropTypes.bool,
    onGroupClose: PropTypes.func
  };

  static defaultProps = {
    group: {
      assetid: []
    },
    edit: false,
    open: false
  };

  state = {
    assetid: [],
    group: null
  };

  async componentDidMount() {
    await this.props.getListAssets({
      parent_id: {
        type: "=",
        value: 0
      }
    });
    this.setState({
      ...this.state,
      assetid: this.props.edit
        ? this.props.group.assets.map(item => item.id)
        : null,
      group: this.props.group
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.group !== state.group) {
      let list = props.listAssets;
      return {
        ...state,
        assetid: props.edit
          ? props.group.assets.map(item => item.id)
          : list.length
          ? list.map(item => item.id)
          : [null],
        group: props.group
      };
    }
    return null;
  }

  onSetAsset = (name, value) => {
    this.setState({
      assetid: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var group = {
          ...values,
          assetid: this.state.assetid
        };
        this.props.onSaveGroup(
          group,
          this.props.group ? this.props.group.id : null
        );
      }
    });
  };

  render() {
    const { onGroupClose, open, group, edit } = this.props;
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
            onCancel={onGroupClose}
            visible={open}
            closable={true}
            footer={null}
            width="50%"
          >
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="Title">
                {getFieldDecorator("title", {
                  rules: [{ required: true, message: "Please input title" }],
                  initialValue: group ? group.title || "" : ""
                })(<Input style={{ width: "100%" }} />)}
              </Form.Item>

              <Form.Item label="Slug">
                {getFieldDecorator("slug", {
                  rules: [{ required: true, message: "Please input slug !" }],
                  initialValue: group ? group.slug || "" : ""
                })(<Input style={{ width: "100%" }} />)}
              </Form.Item>
              <Form.Item label="Assets">
                <BaseCheckBoxList
                  data={this.props.listAssets}
                  name="assetid"
                  value={this.state.assetid}
                  onChange={this.onSetAsset}
                />
              </Form.Item>

              <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                  <Button
                    style={{ marginLeft: 8 }}
                    type="default"
                    onClick={() => this.props.onGroupClose()}
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
    listAssets: state.asset.listAssets
  };
};
function mapDispatchToProps(dispatch) {
  return {
    getListAssets: data => dispatch(getAllAsset(data))
  };
}

export default Form.create({ name: "group" })(
  connect(mapStateToProps, mapDispatchToProps)(AddGroup)
);

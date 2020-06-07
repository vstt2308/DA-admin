import React, { Component } from "react";
import { connect } from "react-redux";
import IntlMessages from "Util/IntlMessages";
import { Button, Col, Form, Input, Modal, Radio, Row } from "antd";
import PropTypes from "prop-types";
import BaseSelect from "../../components/Elements/BaseSelect";
import { getAllDestination } from "../../actions/DestinationActions";
import { getAllTour } from "../../actions/TourActions";
import { getAllPages } from "../../actions/PagesAction";
import { getAllReview } from "../../actions/ReviewAction";
import SunEditor, { buttonList } from "suneditor-react";

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

const typeOptions = [
  { id: 1, title: "Destination" },
  { id: 2, title: "Tour" },
  { id: 3, title: "Custom" },
  { id: 4, title: "Content" },
  { id: 5, title: "Review" }
];

class AddWidget extends Component {
  static propTypes = {
    widget: PropTypes.object,
    onSave: PropTypes.func,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    edit: PropTypes.bool
  };

  state = {
    type: null,
    tourFilter: {
      sort: {
        type: "desc",
        attr: "title"
      },
      paging: {
        page: 1
      }
    },
    destinationFilter: {
      sort: {
        type: "desc",
        attr: "title"
      },
      paging: {
        page: 1
      }
    }
  };

  componentDidMount() {
    this.props.getAllTour({ paging: 0 });
    this.props.getAllDestination({ paging: 0 });
    this.props.getAllPages({ paging: 0 });
    this.props.getAllReview({ paging: 0 });
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (this.props.widget && nextProps.widget) {
      if (this.props.widget.id != nextProps.widget.id) {
        this.setState({ type: nextProps.widget.type });
      }
    } else {
      if (this.props.widget != nextProps.widget) {
        if (nextProps.widget) {
          this.setState({ type: nextProps.widget.type });
        } else {
          this.setState({ type: null });
        }
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var widget = { ...values };
        if (widget.type == 1) {
          widget.ids = widget.destination;
        } else {
          if (widget.type == 2) {
            widget.ids = widget.tour;
          } else if (widget.type == 4) {
            widget.ids = widget.pages;
          } else if (widget.type == 5) {
            widget.ids = widget.review;
          }
        }

        delete widget.destination;
        delete widget.tour;
        delete widget.pages;
        delete widget.review;
        widget.ids = JSON.stringify(widget.ids);
        this.props.onSave(widget);
      }
    });
  };

  handleScrollTour() {
    this.setState(
      {
        tourFilter: {
          ...this.state.tourFilter,
          paging: {
            page: this.state.tourFilter.paging.page + 1
          }
        }
      },
      () => {
        this.props.getAllTour(this.state.tourFilter, false);
      }
    );
  }

  handleScrollDestination() {
    this.setState(
      {
        destinationFilter: {
          ...this.state.destinationFilter,
          paging: {
            page: this.state.destinationFilter.paging.page + 1
          }
        }
      },
      () => {
        this.props.getAllDestination(this.state.destinationFilter, false);
      }
    );
  }

  render() {
    const {
      widget,
      open,
      onClose,
      loading,
      destinations,
      tours,
      pages,
      reviews
    } = this.props;
    var { type } = this.state;

    const { getFieldDecorator } = this.props.form;

    return (
      <React.Fragment>
        {open ? (
          <Modal
            title={
              widget ? (
                <IntlMessages id="widget.edit" />
              ) : (
                <IntlMessages id="widget.add" />
              )
            }
            toggle={onClose}
            visible={open}
            closable={false}
            footer={null}
            width="50%"
          >
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="Title">
                {getFieldDecorator("title", {
                  rules: [
                    {
                      required: true,
                      message: "Please input widget name !"
                    }
                  ],
                  initialValue: widget ? widget.title : ""
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Code">
                {getFieldDecorator("code", {
                  rules: [
                    {
                      required: true,
                      message: "Please input widget code!"
                    }
                  ],
                  initialValue: widget ? widget.code : ""
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Type">
                {getFieldDecorator("type", {
                  rules: [
                    {
                      required: true,
                      message: "Please choose widget type!"
                    }
                  ],
                  initialValue: widget ? widget.type : ""
                })(
                  <BaseSelect
                    options={typeOptions}
                    defaultText="Select one"
                    onChange={value => this.setState({ type: value })}
                  />
                )}
              </Form.Item>
              {type == 1 ? (
                <Form.Item label="Destination">
                  {getFieldDecorator("destination", {
                    rules: [
                      {
                        required: true,
                        message: "Please choose destination!"
                      }
                    ],
                    initialValue: widget
                      ? widget.ids
                        ? JSON.parse(widget.ids)
                        : []
                      : []
                  })(
                    <BaseSelect
                      mode="multiple"
                      showSearch
                      options={destinations}
                      defaultText="Select one..."
                      // onScrollEnd={() => this.handleScrollDestination()}
                    />
                  )}
                </Form.Item>
              ) : (
                <React.Fragment>
                  {type == 2 ? (
                    <Form.Item label="Tour">
                      {getFieldDecorator("tour", {
                        rules: [
                          {
                            required: true,
                            message: "Please choose tour!"
                          }
                        ],
                        initialValue: widget
                          ? widget.ids
                            ? JSON.parse(widget.ids)
                            : []
                          : []
                      })(
                        <BaseSelect
                          mode="multiple"
                          showSearch
                          options={tours}
                          defaultText="Select one..."
                          // onScrollEnd={() => this.handleScrollTour()}
                        />
                      )}
                    </Form.Item>
                  ) : (
                    <React.Fragment>
                      {type == 4 ? (
                        <Form.Item label="Pages">
                          {getFieldDecorator("pages", {
                            rules: [
                              {
                                required: true,
                                message: "Please choose page!"
                              }
                            ],
                            initialValue: widget
                              ? widget.ids
                                ? JSON.parse(widget.ids)
                                : []
                              : []
                          })(
                            <BaseSelect
                              mode="multiple"
                              showSearch
                              options={pages}
                              defaultText="Select one..."
                              // onScrollEnd={() => this.handleScrollTour()}
                            />
                          )}
                        </Form.Item>
                      ) : (
                        <React.Fragment>
                          {type == 5 ? (
                            <Form.Item label="Review">
                              {getFieldDecorator("review", {
                                rules: [
                                  {
                                    required: true,
                                    message: "Please choose review!"
                                  }
                                ],
                                initialValue: widget
                                  ? widget.ids
                                    ? JSON.parse(widget.ids)
                                    : []
                                  : []
                              })(
                                <BaseSelect
                                  mode="multiple"
                                  showSearch
                                  options={reviews}
                                  defaultText="Select one..."
                                  // onScrollEnd={() => this.handleScrollTour()}
                                />
                              )}
                            </Form.Item>
                          ) : null}
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
              <Form.Item label={<IntlMessages id="global.status" />}>
                {getFieldDecorator("status", {
                  initialValue: widget ? (widget.status ? 1 : 0) : 1
                })(
                  <Radio.Group name="radiogroup">
                    <Radio value={1}>
                      <IntlMessages id="global.active" />
                    </Radio>
                    <Radio value={0}>
                      <IntlMessages id="global.deactivate" />
                    </Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label={<IntlMessages id="global.content" />}>
                {getFieldDecorator("content", {
                  rules: [
                    {
                      required: false
                    }
                  ],
                  initialValue: widget ? widget.content : ""
                })(
                  <SunEditor
                    setContents={widget ? widget.content : ""}
                    placeholder="Please type here..."
                    setOptions={{
                      buttonList: buttonList.complex
                    }}
                  />
                )}
              </Form.Item>

              <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                  <Button
                    type="danger"
                    ghost
                    onClick={() => this.props.onClose()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    style={{ marginLeft: 8 }}
                    htmlType="submit"
                    loading={loading}
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

function mapStateToProps(state) {
  return {
    destinations: state.destination.listDestination,
    tours: state.tour.listTour,
    pages: state.pages.listPages,
    reviews: state.review.listReview
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllTour: (filter, paginate) => dispatch(getAllTour(filter, paginate)),
    getAllDestination: (filter, paginate) =>
      dispatch(getAllDestination(filter, paginate)),
    getAllPages: filter => dispatch(getAllPages(filter)),
    getAllReview: filter => dispatch(getAllReview(filter))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: "widget" })(AddWidget));

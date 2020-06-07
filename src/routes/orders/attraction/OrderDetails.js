import { Button, Col, Form, Modal, Row, Tabs, Tag } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import IntlMessages from "Util/IntlMessages";
import { getDetailOrderTour } from "../../../actions/OrderTourActions";

class OrderDetails extends Component {
  state = {
    openPassenger: false,
    current_passenger: null,
    edit: false,
    fileList: [],
    uploading: false,
    openVoucher: false,
    current_voucher: null,
  };
  static propTypes = {
    orderTour: PropTypes.object,
    open: PropTypes.bool,
    current_passenger: PropTypes.object,
    current_voucher: PropTypes.object,
  };

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.orderTour) {
      if (nextProps.orderTour != this.props.orderTour) {
        this.props.getDetailOrderTour(nextState.filter, nextProps.orderTour.id);
      }
    }
  }

  cssRow = () => {
    return {
      borderBottom: "1px solid #e8e8e8",
      padding: "0 !important",
      marginBottom: "1em ",
    };
  };

  render() {
    const { onOrderClose, open, orderTour } = this.props;

    const { TabPane } = Tabs;

    return (
      <React.Fragment>
        <Modal
          toggle={onOrderClose}
          visible={open}
          closable={false}
          onCancel={this.props.onOrderClose}
          footer={null}
          width="65%"
          centered={true}
        >
          <Row>
            <Col span={24} style={{ textAlign: "right", marginBottom: "20px" }}>
              <Button
                type="primary"
                style={{ marginLeft: 8 }}
                htmlType="submit"
                loading={this.props.loading}
              >
                <IntlMessages id="order.send" />
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: 8 }}
                htmlType="submit"
                loading={this.props.loading}
              >
                <IntlMessages id="order.print" />
              </Button>
              <Button type="default" onClick={() => this.props.onOrderClose()}>
                <IntlMessages id="global.cancel" />
              </Button>
            </Col>
          </Row>
          <Tabs defaultActiveKey="1">
            <TabPane tab={<IntlMessages id="global.tabbasic" />} key="1">
              <Row>
                <Col span={12}>
                  <Row style={this.cssRow()}>
                    <Col span={7}>
                      <p>
                        <IntlMessages id="order.number" />:
                      </p>
                    </Col>
                    <Col span={17}>
                      <p>{orderTour ? orderTour.order_number : ""}</p>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row style={this.cssRow()}>
                    <Col span={7}>
                      <p>
                        <IntlMessages id="order.tour" />:
                      </p>
                    </Col>
                    <Col span={17}>
                      <p>{orderTour ? orderTour.tour_title : ""}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Row style={this.cssRow()}>
                    <Col span={7}>
                      <p>
                        <IntlMessages id="order.customer" />:
                      </p>
                    </Col>
                    <Col span={17}>
                      <p>
                        {orderTour
                          ? `${orderTour.firstname} ${orderTour.lastname}`
                          : ""}
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row style={this.cssRow()}>
                    <Col span={7}>
                      <p>
                        <IntlMessages id="order.unit_price" />:
                      </p>
                    </Col>
                    <Col span={17}>
                      <p>{orderTour ? orderTour.unit_price : ""}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Row style={this.cssRow()}>
                    <Col span={7}>
                      <p>
                        <IntlMessages id="order.depart" />:
                      </p>
                    </Col>
                    <Col span={17}>
                      <p>
                        {orderTour
                          ? moment(orderTour.depart).format("DD/MM/YYYY")
                          : ""}
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row style={this.cssRow()}>
                    <Col span={7}>
                      <p>
                        <IntlMessages id="order.qty" />:
                      </p>
                    </Col>
                    <Col span={17}>
                      <p>{orderTour ? orderTour.qty : ""}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Row style={this.cssRow()}>
                    <Col span={7}>
                      <p>
                        <IntlMessages id="order.created_at" />:
                      </p>
                    </Col>
                    <Col span={17}>
                      <p>
                        {orderTour
                          ? moment(orderTour.created_at).format(
                              "DD/MM/YYYY HH:mm"
                            )
                          : ""}
                      </p>
                    </Col>
                  </Row>
                </Col>

                <Col span={12}>
                  <Row style={this.cssRow()}>
                    <Col span={7}>
                      <p>
                        <IntlMessages id="order.total" />:
                      </p>
                    </Col>
                    <Col span={17}>
                      <p>{orderTour ? orderTour.total : ""}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Row style={this.cssRow()}>
                    <Col span={7}>
                      <p>
                        <IntlMessages id="global.status" />:
                      </p>
                    </Col>
                    <Col span={17}>
                      {orderTour ? (
                        orderTour.status === "PENDING" ? (
                          <Tag style={{ marginTop: "0" }} color="red">
                            {orderTour.status}
                          </Tag>
                        ) : (
                          <Tag style={{ marginTop: "0" }} color="green">
                            {orderTour.status}
                          </Tag>
                        )
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row style={this.cssRow()}>
                    <Col span={7}>
                      <p>
                        <IntlMessages id="order.currency" />:
                      </p>
                    </Col>
                    <Col span={17}>
                      <p>{orderTour ? orderTour.currency : ""}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Modal>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    detailOrderTour: state.orderTour.currentOrderTour,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    getDetailOrderTour: (filter, id) =>
      dispatch(getDetailOrderTour(filter, id)),
  };
}

export default Form.create({ name: "orders" })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OrderDetails)
);

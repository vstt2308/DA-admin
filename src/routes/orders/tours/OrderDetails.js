import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Tabs,
  Tag,
  Table,
  Upload,
  Icon,
} from "antd";
import PropTypes from "prop-types";
import React, { Component } from "react";
import IntlMessages from "Util/IntlMessages";
import { connect } from "react-redux";
import moment from "moment";
import PassengerForm from "./PassengerForm";
import {
  convertFileToBase64,
  getFileExtension,
} from "../../../helpers/helpers";
// actions
import { upload } from "../../../actions/FileManagerActions";
import {
  getAllOrderTour,
  updateOrderTour,
  updatePassenger,
  getDetailOrderTour,
} from "../../../actions/OrderTourActions";
import config from "../../../../config";

const BASE_URL = config.URL_ASSET;

const { Search } = Input;

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

  onEditOrderPassenger = (passenger) => {
    this.setState({
      openPassenger: true,
      edit: true,
      current_passenger: passenger,
    });
  };

  onCloseOrderPassenger = () => {
    this.setState({
      openPassenger: false,
      current_passenger: null,
      edit: false,
    });
  };

  cssRow = () => {
    return {
      borderBottom: "1px solid #e8e8e8",
      padding: "0 !important",
      marginBottom: "1em ",
    };
  };

  onSavePassenger = async (data, id) => {
    await this.setState({
      ...this.state,
    });
    if (this.state.edit) {
      var dataSubmit = { ...data, id: id };
      await this.props
        .updatePassenger({
          ...dataSubmit,
          expired: moment(dataSubmit.expired).format("YYYY-MM-DD HH:mm:ss"),
        })
        .then((res) => {
          this.setState({
            ...this.state,
            isSubmiting: false,
            openPassenger: false,
            current_passenger: null,
            edit: false,
            loading: false,
          });
        })
        .catch((err) => {
          this.setState({
            ...this.state,
            isSubmiting: false,
            loading: false,
          });
        });
    }
  };

  async handleUpload() {
    this.setState({ uploading: true });
    var file = this.state.fileList[0];
    var base64Data = await convertFileToBase64(file);
    var extension = getFileExtension(file.name);

    this.props
      .upload({
        file: base64Data,
        path: "/tickets",
        name: file.name,
      })
      .then((result) => {
        this.props.updateOrderTour({
          ticket: result.data,
          id: this.props.orderTour.id,
        });
        this.setState({ uploading: false });
      });
  }

  render() {
    const { onOrderClose, open, orderTour, detailOrderTour } = this.props;

    var { uploading, fileList } = this.state;

    const { TabPane } = Tabs;

    const uploadProps = {
      multiple: false,
      onRemove: (file) => {
        this.setState({
          fileList: [],
        });
      },
      beforeUpload: (file) => {
        this.setState({
          fileList: [file],
        });
        return false;
      },
      fileList: fileList,
    };

    const columnsPassenger = [
      {
        title: <IntlMessages id="order.passenger.firstname" />,
        key: "firstname",
        render: (record) => {
          return record.firstname;
        },
      },
      {
        title: <IntlMessages id="order.passenger.lastname" />,
        key: "lastname",
        render: (record) => {
          return record.lastname;
        },
      },
      {
        title: <IntlMessages id="order.passenger.country" />,
        key: "country",
        render: (record) => {
          return record.country_txt;
        },
      },
      {
        title: <IntlMessages id="order.passenger.age" />,
        key: "age",
        render: (record) => {
          return moment().diff(moment(record.birthday), "year");
        },
      },
      {
        render: (record) => {
          return (
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => this.onEditOrderPassenger(record)}
            >
              <IntlMessages id="global.edit" />
            </span>
          );
        },
      },
    ];

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
                        <IntlMessages id="order.depart_city" />:
                      </p>
                    </Col>
                    <Col span={17}>
                      <p>{orderTour ? orderTour.depart_txt : ""}</p>
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
                        <IntlMessages id="order.currency" />:
                      </p>
                    </Col>
                    <Col span={17}>
                      <p>{orderTour ? orderTour.currency : ""}</p>
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
                        <IntlMessages id="order.airline" />:
                      </p>
                    </Col>
                    <Col span={17}>
                      <p>
                        {orderTour
                          ? orderTour.airline_code +
                            "-" +
                            orderTour.airline_class
                          : ""}
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab={<IntlMessages id="order.passenger" />} key="2">
              <Row>
                <Col span={24}>
                  <h4 style={{ padding: "10px 0" }}>
                    {orderTour ? orderTour.tour_title.toUpperCase() : ""}{" "}
                    <IntlMessages id="order.passenger_manifest" />
                  </h4>
                </Col>
                <Col span={24}>
                  <Table
                    columns={columnsPassenger}
                    dataSource={detailOrderTour.passenger}
                    rowKey="id"
                    pagination={false}
                  />
                </Col>
              </Row>
            </TabPane>
            <TabPane tab={<IntlMessages id="order.flight" />} key="3">
              <div>
                <b>Current Ticket: </b> {orderTour ? orderTour.ticket : ""}
              </div>
              <br />
              <Search
                placeholder="Enter PNR"
                enterButton={<IntlMessages id="widgets.search" />}
                onSearch={(value) => console.log(value)}
              />
              {/* <Divider orientation="left">or</Divider> */}
              <Upload {...uploadProps}>
                <Button>
                  <Icon type="upload" />{" "}
                  <IntlMessages id="fileManager.selectfile" />
                </Button>
              </Upload>
              <Button
                type="primary"
                onClick={() => this.handleUpload()}
                // disabled={fileList}
                loading={uploading}
                style={{ marginTop: 16 }}
              >
                {uploading ? (
                  "Uploading"
                ) : (
                  <IntlMessages id="fileManager.uploadfile" />
                )}
              </Button>
            </TabPane>
          </Tabs>
        </Modal>
        <PassengerForm
          onSavePassenger={this.onSavePassenger}
          current_passenger={this.state.current_passenger}
          onCloseOrderPassenger={this.onCloseOrderPassenger}
          edit={this.state.edit}
          openPassenger={this.state.openPassenger}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    orderTours: state.orderTour.listOrderTour,
    detailOrderTour: state.orderTour.currentOrderTour,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    getAllOrderTour: (filter) => dispatch(getAllOrderTour(filter)),
    getDetailOrderTour: (filter, id) =>
      dispatch(getDetailOrderTour(filter, id)),
    updatePassenger: (data) => dispatch(updatePassenger(data)),
    updateOrderTour: (data) => dispatch(updateOrderTour(data)),
    upload: (data) => dispatch(upload(data)),
  };
}

export default Form.create({ name: "orders" })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OrderDetails)
);

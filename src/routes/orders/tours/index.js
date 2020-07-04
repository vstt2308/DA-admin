import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import IntlMessages from "Util/IntlMessages";
import { Table, Avatar, Form, DatePicker, Tag, Button } from "antd";
import moment from "moment";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import config from "../../../../config";
import { getAllOrderTour } from "../../../actions/OrderTourActions";
import { getAllDestination } from "../../../actions/DestinationActions";
import BaseSelect from "Components/Elements/BaseSelect";
import { getAllTour } from "../../../actions/TourActions";
import OrderDetails from "./OrderDetails";
import AssignOrder from "./AssignOrder";

class TourOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        sort: {
          type: "desc",
          attr: "",
        },
        paging: {
          perpage: 10,
          page: 1,
        },
        type: {
          type: "=",
          value: 0,
        },
      },
      selectedRowKeys: [],
      open: false,
      openAssign: false,
      current_assign: null,
      tourFilter: {
        paging: 0,
      },
      destinationFilter: {
        paging: 0,
      },
      order_current: null,
    };
  }

  componentDidMount() {
    this.props.getAllOrderTour(this.state.filter);
    this.props.getAllTour(this.state.tourFilter);
    this.props.getAllDestination(this.state.destinationFilter);
  }

  onEditOrderNumber = (order) => {
    this.setState({
      open: true,
      order_current: order,
    });
  };

  onOrderClose = () => {
    this.setState({
      open: false,
      order_current: null,
    });
  };

  onShowAssign = (data) => {
    this.setState({
      openAssign: true,
      current_assign: data,
    });
  };

  onCloseAssign = () => {
    this.setState({
      openAssign: false,
      current_assign: null,
    });
  };

  onFilter(name, value) {
    if (name == "depart") {
      if (value) {
        value = value.toISOString().substr(0, 10);

        this.setState({
          filter: {
            ...this.state.filter,
            [name]: {
              type: "=",
              value: value,
            },
          },
        });
      } else {
        this.setState(
          {
            filter: {
              ...this.state.filter,
              [name]: {},
            },
          },
          () => this.props.getAllOrderTour(this.state.filter)
        );
      }
    } else {
      this.setState({
        filter: {
          ...this.state.filter,
          [name]: {
            type: "=",
            value: value,
          },
        },
      });
    }
    setTimeout(() => {
      this.props.getAllOrderTour(this.state.filter);
    }, 300);
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  getOrder(order) {
    if (order === "ascend") return "asc";
    if (order === "descend") return "desc";
    return "desc";
  }

  onChangTable = (
    pagination,
    filters,
    sorter,
    extra = { currentDataSource: [] }
  ) => {
    this.setState(
      {
        ...this.state,
        filter: {
          ...this.state.filter,
          sort: {
            type: this.getOrder(sorter.order),
            attr: sorter.columnKey,
          },
          paging: {
            perpage: pagination.pageSize,
            page: pagination.current,
          },
        },
      },
      () => {
        this.props.getAllOrderTour(this.state.filter);
      }
    );
  };

  render() {
    const { selectedRowKeys } = this.state;

    const { listOrderTour, tours, paging, destinations } = this.props;

    const hasSelected = selectedRowKeys.length > 0;

    const columns = [
      {
        title: <IntlMessages id="order.number" />,
        key: "order_number",
        render: (record) => (
          <React.Fragment>
            <div>
              <p
                style={{ color: "blue", cursor: "pointer", margin: 0 }}
                onClick={() => this.onEditOrderNumber(record)}
              >
                {record.order_number}
              </p>
            </div>
              
              </React.Fragment>
        ),
        sorter: true,
      },
      {
        title: <IntlMessages id="order.tour" />,
        dataIndex: "tour_title",
        key: "tour_title",
      },
      {
        title: <IntlMessages id="order.depart" />,
        // dataIndex: "depart",
        key: "depart",
        render: (record) => {
          return moment(record.depart).format("YYYY/MM/DD");
        },
        sorter: true,
      },
      {
        title: <IntlMessages id="order.customer" />,
        key: "lastname",
        render: (record) => record.firstname + " " + record.lastname,
      },
      {
        title: <IntlMessages id="order.unit_price" />,
        dataIndex: "unit_price",
        key: "unit_price",
        sorter: true,
      },
    
      {
        title: <IntlMessages id="order.total" />,
        render: (record) => {
          let checkDot = record.total.lastIndexOf(".");
          return record.total.slice(0, checkDot + 3);
        },
        key: "total",
        sorter: true,
      },
      {
        title: <IntlMessages id="order.currency" />,
        dataIndex: "currency",
        key: "currency",
      },
      {
        title: <IntlMessages id="global.status" />,
        key: "status",
        render: (record) => {
          return record.status === "PENDING" ? (
            <Tag color="red">{record.status}</Tag>
          ) : (
            <Tag color="green">{record.status}</Tag>
          );
        },
      },

    ];

    let tourName = tours.map((item) => {
      if (item.title) {
        return {
          ...item,
          id: item.id,
          title: item.title,
        };
      }
    });

    let desName = destinations.map((item) => {
      if (item.title) {
        return {
          id: item.id,
          title: item.title,
        };
      }
    });

    return (
      <React.Fragment>
        <div className="formelements-wrapper">
          <PageTitleBar
            title={<IntlMessages id="sidebar.orders" />}
            match={this.props.match}
          />
          <div className="row">
            <RctCollapsibleCard colClasses="col-12">
       
              <Table
                rowSelection={{
                  selectedRowKeys,
                  onChange: this.onSelectChange,
                }}
                columns={columns}
                dataSource={listOrderTour}
                onChange={this.onChangTable}
                rowKey="id"
                pagination={{
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "30"],
                  total: paging.count,
                  defaultCurrent: +paging.page,
                  pageSize: +paging.perpage,
                }}
                size="middle"
            
              />
            </RctCollapsibleCard>
          </div>
        </div>
        <OrderDetails
          onEditOrderNumber={this.onEditOrderNumber}
          open={this.state.open}
          onOrderClose={this.onOrderClose}
          orderTour={this.state.order_current}
        />
        <AssignOrder
          openAssign={this.state.openAssign}
          onCloseAssign={this.onCloseAssign}
          current_assign={this.state.current_assign}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listOrderTour: state.orderTour.listOrderTour,
    tours: state.tour.listTour,
    destinations: state.destination.listDestination,
    paging: state.orderTour.paging,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllOrderTour: (filter) => dispatch(getAllOrderTour(filter)),
    getAllTour: (filter, paginate) => dispatch(getAllTour(filter, paginate)),
    getAllDestination: (filter, paginate) =>
      dispatch(getAllDestination(filter, paginate)),
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TourOrder)
);

import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { publish, unpublish } from "../../../actions/CommonActions";
import {
  getAllCoupon,
  updateCoupon,
  createCoupon,
  batchDelete
} from "../../../actions/CouponAction";
import { getAllACCOUNT } from "../../../actions/AccountAction";
import { getAllActivity } from "../../../actions/ActivityAction";
import IntlMessages from "Util/IntlMessages";
import { Table, Input, Tag } from "antd";
import "antd/dist/antd.css";
import TableActionBar from "../../../components/TableActionBar";
import StatusButton from "../../../components/StatusButton";
import ImageInTable from "../../../components/ImageInTable";
import config from "../../../../config";
import AddCoupon from "./AddCoupon";
import moment from "moment";
import AvatarInTable from "../../../components/AvatarInTable";
const ACCOUNT_IMAGE_URL = config.URL_ASSET;
const DEFAULT_IMAGE_URL = ACCOUNT_IMAGE_URL + "/backup.png";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCoupon: [],
      filter: {
        sort: {
          type: "desc",
          attr: ""
        },
        title: {
          type: "like",
          value: ""
        },
        paging: {
          perpage: 10,
          page: 1
        }
      },
      edit: false,
      isSubmiting: false,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      open: false,
      getCoupon: null,
      filterAccount: { paging: 0 }
    };
  }

  componentDidMount() {
    this.props.getAllCoupon(this.state.filter);
    this.props.getAllRegistered(this.state.filterAccount, "registered");
    this.props.getAllActivity(this.state.filterAccount);
  }

  onCancel() {
    this.setState({
      ...this.state,
      open: false
    });
  }

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  onChangeSearch(event) {
    this.setState(
      {
        ...this.state,
        filter: {
          ...this.state.filter,
          search: event.target.value
        }
      },
      () => this.props.getAllCoupon(this.state.filter)
    );
  }

  onRefresh() {
    this.props.getAllCoupon(this.state.filter, "coupon");
    this.setState({
      selectedRowKeys: []
    });
  }

  onDelete() {
    this.props.delete({ id: this.state.selectedRowKeys }).then(() => {
      this.setState({
        selectedRowKeys: []
      });
    });
  }

  onCreateCoupon = () => {
    this.setState({
      open: true,
      getCoupon: null
    });
  };

  onEditCoupon = coupon => {
    this.setState({
      open: true,
      getCoupon: coupon,
      edit: true
    });
  };

  onCouponClose = () => {
    this.setState({
      open: false,
      getCoupon: null,
      edit: false,
      isSubmiting: false
    });
  };

  filter = (value, name, type) => {
    if (type === "search") {
      this.setState(
        {
          ...this.state,
          filter: {
            ...this.state.filter,
            search: value
          }
        },
        () => this.props.getAllCoupon(this.state.filter)
      );
    } else {
      this.setState(
        {
          ...this.state,
          filter: {
            ...this.state.filter,
            [name]: {
              type: "like",
              value: value
            }
          }
        },
        () => this.props.getAllCoupon(this.state.filter)
      );
    }
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
            attr: sorter.columnKey
          },
          paging: {
            perpage: pagination.pageSize,
            page: pagination.current
          }
        }
      },
      () => {
        console.log(this.state.filter);
        this.props.getAllCoupon(this.state.filter);
      }
    );
  };

  handleChangePage(page, pageSize) {
    if (
      page != this.state.filter.paging.page ||
      (pageSize != this.state.filter.paging.perpage && pageSize)
    ) {
      this.setState(
        {
          ...this.state,
          filter: {
            ...this.state.filter,
            paging: {
              ...this.state.filter.paging,
              page: page,
              perpage: pageSize
            }
          }
        },
        () => {
          this.props.getAllCoupon(this.state.filter);
        }
      );
    }
  }

  isStyledHighlightRow = record => {
    if (new Date(record.expired).getTime() < new Date().getTime()) {
      return "highlight";
    }
  };

  onSaveCoupon = async (data, id) => {
    await this.setState({
      ...this.state,
      isSubmiting: true
    });
    if (this.state.edit) {
      var dataSubmit = { ...data, id: id };
      await this.props
        .updateCoupon({
          ...dataSubmit,
          expired: moment(dataSubmit.expired).format("YYYY-MM-DD HH:mm:ss")
        })
        .then(res => {
          this.setState({
            ...this.state,
            isSubmiting: false,
            open: false,
            getCoupon: null,
            edit: false
          });
        })
        .catch(err => {
          this.setState({
            ...this.state,
            isSubmiting: false
          });
        });
    } else {
      await this.props
        .createCoupon({
          ...data,
          expired: moment(data.expired).format("YYYY-MM-DD HH:mm:ss")
        })
        .then(res => {
          this.setState({
            ...this.state,
            isSubmiting: false,
            open: false,
            getCoupon: null,
            coupon: null,
            edit: false
          });
        })
        .catch(err => {
          this.setState({
            ...this.state,
            isSubmiting: false
          });
        });
    }
  };

  render() {
    const { loading, selectedRowKeys } = this.state;

    const style = {
      color: "blue",
      cursor: "pointer"
    };

    const { listCoupon, paging, listAccount, listActivity } = this.props;

    const columns = [
      {
        title: <IntlMessages id="coupon.code" />,
        dataIndex: "code",
        key: "code"
      },
      {
        title: <IntlMessages id="coupon.title" />,
        key: "title",
        render: record => {
          return (
            <span style={style} onClick={() => this.onEditCoupon(record)}>
              {record.title}
            </span>
          );
        }
      },
      {
        title: <IntlMessages id="global.status" />,
        key: "status",
        render: record => {
          return (
            <React.Fragment>
              {record ? (
                record.status === 1 ? (
                  <Tag color="green">
                    <IntlMessages id="coupon.notyet" />
                  </Tag>
                ) : (
                  <Tag color="red">
                    <IntlMessages id="coupon.used" />
                  </Tag>
                )
              ) : null}
            </React.Fragment>
          );
        }
      },
      {
        title: <IntlMessages id="coupon.cid" />,
        key: "cid",
        render: record => {
          return record.cid_email
            ? `${record.cid_email} - ${record.cid_firstname} ${record.cid_lastname}`
            : record.cid_phone;
        }
      },
      {
        title: <IntlMessages id="coupon.expired" />,
        key: "expired",
        render: record => {
          return (
            <React.Fragment>
              {moment(record.expired).format("23:59:59") <
              moment().format("23:59:59") ? (
                <Tag color="red">
                  {moment(record.expired).format("YYYY-MM-DD")}
                </Tag>
              ) : (
                <Tag color="green">
                  {moment(record.expired).format("YYYY-MM-DD")}
                </Tag>
              )}
            </React.Fragment>
          );
        },
        sorter: true
      },
      {
        title: <IntlMessages id="coupon.min_order" />,
        key: "min_order",
        render: record => {
          return +record.min_order === 0 || record.min_order === null
            ? 0
            : +record.min_order;
        },
        sorter: true
      },
      {
        title: <IntlMessages id="coupon.amount" />,
        dataIndex: "amount",
        key: "amount",
        sorter: true
      },
      {
        title: <IntlMessages id="coupon.created" />,
        key: "created_at",
        render: record => {
          return moment(record.created_at).format("YYYY/MM/DD");
        },
        sorter: true
      },
      {
        title: <IntlMessages id="global.id" />,
        dataIndex: "id",
        key: "id",
        sorter: true
      }
    ];

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
      <React.Fragment>
        <div className="formelements-wrapper">
          <PageTitleBar
            title={<IntlMessages id="sidebar.coupon" />}
            match={this.props.match}
          />
          <div className="row">
            <RctCollapsibleCard colClasses="col-12">
              <TableActionBar
                onAdd={() => this.onCreateCoupon()}
                onDelete={() => this.onDelete()}
                onRefresh={() => this.onRefresh()}
                isDisabled={!hasSelected}
                isShowPublishButtons={false}
                rows={this.state.selectedRowKeys}
                table="coupon"
                onChange={this.onChangTable}
                onFilter={this.filter}
              >
                {hasSelected ? (
                  <p className="ml-10" style={{ display: "inline-block" }}>
                    Selected {selectedRowKeys.length}{" "}
                    {selectedRowKeys.length === 1 ? "item" : "items"}{" "}
                  </p>
                ) : (
                  ""
                )}
              </TableActionBar>
              <Table
                tableLayout="auto"
                rowSelection={rowSelection}
                columns={columns}
                dataSource={listCoupon}
                onChange={this.onChangTable}
                rowKey="id"
                size="middle"
                rowClassName={this.isStyledHighlightRow}
                pagination={{
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "30"],
                  total: paging.count,
                  defaultCurrent: parseInt(paging.page),
                  pageSize: parseInt(paging.perpage)
                }}
              />
            </RctCollapsibleCard>
          </div>
        </div>
        <AddCoupon
          open={this.state.open}
          edit={this.state.edit}
          coupon={this.state.getCoupon}
          onSaveCoupon={this.onSaveCoupon}
          onCouponClose={() => this.onCouponClose()}
          listAccount={listAccount}
          listActivity={listActivity}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    listCoupon: state.coupon.listCoupon,
    listAccount: state.account.listAccount,
    listActivity: state.activity.listActivity,
    paging: state.coupon.paging
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllCoupon: filter => dispatch(getAllCoupon(filter)),
    getAllRegistered: (filter, data) => dispatch(getAllACCOUNT(filter, data)),
    getAllActivity: filter => dispatch(getAllActivity(filter)),
    createCoupon: data => dispatch(createCoupon(data)),
    updateCoupon: id => dispatch(updateCoupon(id)),
    delete: data => dispatch(batchDelete(data)),
    publish: data => dispatch(publish(data)),
    unpublish: data => dispatch(unpublish(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(index);

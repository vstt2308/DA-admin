import StarsIcon from "@material-ui/icons/Stars";
import { Table, Tag } from "antd";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import renderHTML from "react-render-html";
import { withRouter } from "react-router-dom";
import IntlMessages from "Util/IntlMessages";
import {
  addRules,
  deleteRules,
  getAllRules,
  updateRules
} from "../../../actions/RulesAction";
import StatusButton from "../../../components/StatusButton";
import TableActionBar from "../../../components/TableActionBar";
import AddRules from "./AddRules";

const expired_date = [
  {
    id: 0,
    title: "Default"
  },
  {
    id: 1,
    title: "1 day"
  },
  {
    id: 2,
    title: "2 days"
  },
  {
    id: 3,
    title: "3 days"
  },
  {
    id: 4,
    title: "4 days"
  },
  {
    id: 5,
    title: "5 days"
  },
  {
    id: 6,
    title: "6 days"
  },
  {
    id: 7,
    title: "7 days"
  },
  {
    id: 8,
    title: "8 days"
  },
  {
    id: 9,
    title: "9 days"
  },
  {
    id: 10,
    title: "10 days"
  },
  {
    id: 11,
    title: "11 days"
  },
  {
    id: 12,
    title: "12 days"
  },
  {
    id: 13,
    title: "13 days"
  },
  {
    id: 14,
    title: "14 days"
  },
  {
    id: 15,
    title: "15 days"
  },
  {
    id: 16,
    title: "16 days"
  },
  {
    id: 17,
    title: "17 days"
  },
  {
    id: 18,
    title: "18 days"
  },
  {
    id: 19,
    title: "19 days"
  },
  {
    id: 20,
    title: "20 days"
  },
  {
    id: 21,
    title: "21 days"
  },
  {
    id: 22,
    title: "22 days"
  },
  {
    id: 23,
    title: "23 days"
  },
  {
    id: 24,
    title: "24 days"
  },
  {
    id: 25,
    title: "25 days"
  },
  {
    id: 26,
    title: "26 days"
  },
  {
    id: 27,
    title: "27 days"
  },
  {
    id: 28,
    title: "28 days"
  },
  {
    id: 29,
    title: "29 days"
  },
  {
    id: 30,
    title: "1 month"
  },
  {
    id: 60,
    title: "2 months"
  },
  {
    id: 90,
    title: "3 months"
  },
  {
    id: 180,
    title: "6 months"
  },
  {
    id: 360,
    title: "1 year"
  },
  {
    id: 720,
    title: "2 years"
  },
  {
    id: 1080,
    title: "3 years"
  },
  {
    id: 1440,
    title: "4 years"
  },
  {
    id: 1800,
    title: "5 years"
  },
  {
    id: 3600,
    title: "10 years"
  }
];

class ListRules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        sort: {
          type: "desc",
          attr: ""
        },
        search: "",
        paging: {
          perpage: 10,
          page: 1
        }
      },
      addRuleState: false,
      selectedRowKeys: [],
      isSubmiting: false,
      current_rule: null,
      edit: false
    };
  }
  componentDidMount() {
    this.props.getAllRules(this.state.filter);
  }
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  onAddRules = () => {
    this.setState({
      addRuleState: true
    });
  };
  onEditRules(rule) {
    this.setState({
      addRuleState: true,
      current_rule: rule,
      edit: true
    });
  }
  onRulesClose = () => {
    this.setState({
      addRuleState: false,
      current_rule: null,
      isSubmiting: false,
      edit: false
    });
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
      () => this.props.getAllRules(this.state.filter)
    );
  }
  onRefresh() {
    this.props.getAllRules(this.state.filter);
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
  onChangPage(page, pageSize) {
    this.setState(
      {
        ...this.state,
        filter: {
          ...this.state.filter,
          paging: {
            perpage: pageSize,
            page: page
          }
        }
      },
      () => {
        this.props.getAllRules(this.state.filter);
      }
    );
  }
  onChangePerpage(current, size) {
    this.setState(
      {
        ...this.state,
        filter: {
          ...this.state.filter,
          paging: {
            perpage: size,
            page: current
          }
        }
      },
      () => {
        this.props.getAllRules(this.state.filter);
      }
    );
  }
  onSaveRules = async (data, id) => {
    await this.setState({
      ...this.state,
      isSubmiting: true
    });
    if (this.state.edit) {
      var dataSubmit = { ...data, id: id };
      await this.props
        .updateRules(dataSubmit)
        .then(res => {
          this.setState({
            ...this.state,
            isSubmiting: false,
            addRuleState: false,
            current_rule: null,
            edit: false
          });
        })
        .catch(err => {
          this.setState({
            ...this.state,
            isSubmiting: false
          });
        });
    } else
      await this.props
        .createRules(data)
        .then(res => {
          this.setState({
            ...this.state,
            isSubmiting: false,
            addRuleState: false,
            current_rule: null,
            edit: false
          });
        })
        .catch(err => {
          this.setState({
            ...this.state,
            isSubmiting: false
          });
        });
  };
  getOrder(order) {
    if (order === "ascend") return "asc";
    if (order === "descend") return "desc";
    return "desc";
  }

  onChangeTable = (
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
          paging: {
            page: pagination.current,
            perpage: pagination.pageSize
          },
          sort: {
            type: this.getOrder(sorter.order),
            attr: sorter.columnKey
          }
        }
      },
      () => this.props.getAllRules(this.state.filter)
    );
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
        () => this.props.getAllRules(this.state.filter)
      );
    } else
      this.setState(
        {
          ...this.state,
          filter: {
            ...this.state.filter,
            [name]: {
              type: "=",
              value: value
            }
          }
        },
        () => this.props.getAllRules(this.state.filter)
      );
  };

  render() {
    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;

    const columns = [
      {
        title: <IntlMessages id="global.status" />,
        dataIndex: "status",
        key: "status",
        render: (text, record) => (
          <StatusButton
            data_id={record.id}
            status={record.status}
            table="point_rule"
          />
        )
      },
      {
        title: <IntlMessages id="global.name" />,
        dataIndex: "rule_name",
        key: "rule_name",
        render: (text, record) => (
          <span
            style={{ cursor: "pointer", color: "#1890ff" }}
            onClick={() => this.onEditRules(record)}
          >
            {record.rule_name}
          </span>
        )
      },
      {
        title: <IntlMessages id="global.title" />,
        dataIndex: "title",
        key: "title"
      },
      {
        title: <IntlMessages id="global.code" />,
        dataIndex: "code",
        key: "code",
        sorter: true
      },
      {
        title: <IntlMessages id="global.point" />,
        dataIndex: "points",
        key: "points",
        sorter: true
      },
      {
        title: <IntlMessages id="global.expired" />,
        key: "expired",
        render: record => {
          return (
            <React.Fragment>
              {moment(record.expired).format('23:59:59') < moment().format('23:59:59') ? (
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
        title: <IntlMessages id="rule.expired_day" />,
        key: "expired_day",
        render: record => {
          let a = expired_date.find(item => {
            return item.id === record.expired_day;
          });
          return <span>{a.title}</span>;
        },
        sorter: true
      },
      {
        title: <IntlMessages id="global.autoapproved" />,
        dataIndex: "autoapproved",
        key: "autoapproved",
        className: "center-column",
        render: (text, record) => (
          <div>
            {record.autoapproved === 1 ? (
              <StarsIcon style={{ color: "#1890ff", fontSize: "18px" }} />
            ) : (
              <StarsIcon style={{ color: "#cccccc", fontSize: "18px" }} />
            )}
          </div>
        )
      },
      {
        title: <IntlMessages id="global.id" />,
        dataIndex: "id",
        key: "id",
        sorter: true
      }
    ];
    const { listRules, paging } = this.props;

    return (
      <React.Fragment>
        <div className="formelements-wrapper">
          <PageTitleBar
            title={<IntlMessages id="sidebar.rules" />}
            match={this.props.match}
          />
          <div className="row">
            <RctCollapsibleCard colClasses="col-12">
              <TableActionBar
                onAdd={() => this.onAddRules()}
                onDelete={() => this.onDelete()}
                onRefresh={() => this.onRefresh()}
                isDisabled={!hasSelected}
                rows={this.state.selectedRowKeys}
                isShowPublishButtons={true}
                table="point_rule"
                showFilter={false}
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
                rowSelection={rowSelection}
                columns={columns}
                dataSource={listRules}
                tableLayout="auto"
                rowKey="id"
                size="middle"
                pagination={{
                  pageSizeOptions: ["10", "20", "30"],
                  total: paging.count,
                  showSizeChanger: true
                }}
                onChange={this.onChangeTable}
              />
            </RctCollapsibleCard>
          </div>
        </div>
        <AddRules
          open={this.state.addRuleState}
          onSaveRules={this.onSaveRules}
          onRulesClose={this.onRulesClose}
          loading={this.state.isSubmiting}
          edit={this.state.edit}
          expired_date={expired_date}
          rule={this.state.current_rule}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    listRules: state.rules.listRules,
    paging: state.rules.paging
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllRules: filter => dispatch(getAllRules(filter)),
    delete: data => dispatch(deleteRules(data)),
    createRules: data => dispatch(addRules(data)),
    updateRules: data => dispatch(updateRules(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListRules)
);

import { Table } from "antd";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import IntlMessages from "Util/IntlMessages";
import config from "../../../../config";
import {
  batchDelete,
  createACCOUNT,
  getAllACCOUNT,
  updateACCOUNT
} from "../../../actions/AccountAction";
import AvatarInTable from "../../../components/AvatarInTable";
import StatusButton from "../../../components/StatusButton";
import TableActionBar from "../../../components/TableActionBar";
import AddAdmin from "./AddAdmin";
const ACCOUNT_IMAGE_URL = config.URL_ASSET;
const DEFAULT_IMAGE_URL = ACCOUNT_IMAGE_URL + "/backup.png";
class ListAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        sort: {
          type: "desc",
          attr: ""
        },
        created_at: {
          type: "compare",
          value: {
            from: "",
            to: ""
          }
        },
        title: {
          type: "like",
          value: ""
        },
        alias: {
          type: "=",
          value: []
        },
        search: "",
        paging: {
          perpage: 10,
          page: 1
        }
      },
      addAccountState: false,
      current_account: null,
      selectedRowKeys: [],
      isSubmiting: false,
      edit: false
    };
  }

  componentDidMount() {
    this.props.getAllAdmin(this.state.filter, "admin");
  }

  filter = (value, name, type) => {
    console.log("yt", type);

    if (type === "search") {
      this.setState(
        {
          ...this.state,
          filter: {
            ...this.state.filter,
            search: value
          }
        },
        () => this.props.getAllAdmin(this.state.filter, "admin")
      );
    } else {
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
        () => this.props.getAllAdmin(this.state.filter, "admin")
      );
    }
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  onAddAccount = () => {
    this.setState({ addAccountState: true });
  };
  onEditAccount(account) {
    this.setState({
      addAccountState: true,
      current_account: account,
      edit: true
    });
  }
  onAccountClose = () => {
    this.setState({
      addAccountState: false,
      current_account: null,
      isSubmiting: false,
      edit: false
    });
  };

  onSaveAccount = async (data, id) => {
    await this.setState({
      ...this.state,
      isSubmiting: true
    });
    if (this.state.edit) {
      var dataSubmit = { ...data, id: id };
      await this.props
        .updateAccount(dataSubmit)
        .then(res => {
          this.setState({
            ...this.state,
            isSubmiting: false,
            addAccountState: false,
            current_account: null,
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
        .createAdmin(data)
        .then(res => {
          this.setState({
            ...this.state,
            isSubmiting: false,
            addAccountState: false,
            current_account: null,
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

  onDelete() {
    this.props.deleteAccount({ id: this.state.selectedRowKeys }).then(res => {
      this.setState({
        ...this.state,
        selectedRowKeys: []
      });
    });
  }

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
      () => this.props.getAllAdmin(this.state.filter, "admin")
    );
  };

  onRefresh = () => {
    this.props.getAllAdmin(this.state.filter, "admin");
    this.setState({
      selectedRowKeys: []
    });
  }

  render() {
    const columns = [
      {
        key: "image",
        title: <IntlMessages id="global.avatar" />,
        dataIndex: "image",
        render: (text, record) =>
          record.image ? (
            <AvatarInTable
              src={ACCOUNT_IMAGE_URL + record.image}
              defaul={record.image === "//logo3.png" ? 1 : 0}
              title={
                record.firstname
                  ? `${record.firstname}${record.lastname}`
                  : `panda user`
              }
              alt={`${record.firstname} ${record.lastname}`}
            ></AvatarInTable>
          ) : (
            <AvatarInTable
              src={DEFAULT_IMAGE_URL}
              alt={`panda user`}
              title={
                record.firstname
                  ? `${record.firstname}${record.lastname}`
                  : `panda user`
              }
            ></AvatarInTable>
          )
      },
      {
        title: <IntlMessages id="global.status" />,
        dataIndex: "status",
        render: (text, record) => (
          <StatusButton
            data_id={record.id}
            status={record.status}
            table="customer"
          />
        )
      },
      {
        title: <IntlMessages id="global.email" />,
        dataIndex: "email",
        key: "email",
        sorter: true,
        render: (text, record) => (
          <b
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => this.onEditAccount(record)}
          >
            {record.email}
          </b>
        )
      },
      {
        title: <IntlMessages id="global.mobile" />,
        dataIndex: "mobile",
        key: "mobile",
        sorter: true
      },
      {
        title: <IntlMessages id="global.firstname" />,
        dataIndex: "firstname",
        key: "firstname"
      },
      {
        title: <IntlMessages id="global.lastname" />,
        dataIndex: "lastname",
        key: "lastname"
      },
      {
        title: <IntlMessages id="global.company" />,
        dataIndex: "company",
        key: "company"
      },
      
 
    ];

    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const { listAdmin, paging } = this.props;

    const hasSelected = selectedRowKeys.length > 0;

    return (
      <React.Fragment>
        <div className="formelements-wrapper">
          <PageTitleBar
            title={<IntlMessages id="sidebar.admin" />}
            match={this.props.match}
          />
          <div className="row">
            <RctCollapsibleCard colClasses="col-12">
              <TableActionBar
                onAdd={() => this.onAddAccount()}
                onDelete={() => this.onDelete()}
                onRefresh={() => this.onRefresh()}
                isDisabled={!hasSelected}
                rows={this.state.selectedRowKeys}
                table="customer"
                isShowPublishButtons={false}
                onFilter={this.filter}
              >
                <span style={{ marginLeft: 8 }}>
                  {hasSelected
                    ? `Selected ${selectedRowKeys.length} items`
                    : ""}
                </span>
              </TableActionBar>

              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={listAdmin}
                rowKey="id"
                size="middle"
                pagination={{
                  pageSizeOptions: ["10", "20", "30"],
                  total: paging.count,
                  showSizeChanger: true
                }}
                tableLayout="auto"
                onChange={this.onChangTable}
               
              />
            </RctCollapsibleCard>
          </div>
        </div>
        <AddAdmin
          open={this.state.addAccountState}
          onSaveAccount={this.onSaveAccount}
          onAccountClose={this.onAccountClose}
          loading={this.state.isSubmiting}
          edit={this.state.edit}
          account={this.state.current_account}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    listAdmin: state.account.listAccount,
    paging: state.account.paging
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllAdmin: (filter, data) => dispatch(getAllACCOUNT(filter, data)),
    createAdmin: account => dispatch(createACCOUNT(account)),
    updateAccount: account => dispatch(updateACCOUNT(account)),
    deleteAccount: account => dispatch(batchDelete(account))
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListAdmin)
);

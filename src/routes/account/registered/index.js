import AndroidIcon from "@material-ui/icons/Android";
import AppleIcon from "@material-ui/icons/Apple";
import LanguageIcon from "@material-ui/icons/Language";
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
import { getAllCountry } from "../../../actions/CountryActions";
import AvatarInTable from "../../../components/AvatarInTable";
import StatusButton from "../../../components/StatusButton";
import TableActionBar from "../../../components/TableActionBar";
import AddRegistered from "./AddRegistered";
const ACCOUNT_IMAGE_URL = config.URL_ASSET;
const DEFAULT_IMAGE_URL = ACCOUNT_IMAGE_URL + "/backup.png";
class ListRegistered extends Component {
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
      addRegisteredState: false,
      selectedRowKeys: [],
      isSubmiting: false,
      current_account: null,
      edit: false
    };
  }
  componentDidMount() {
    this.props.getAllRegistered(this.state.filter, "registered");
    this.props.getAllConuntry();
    console.log(this.props);
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
      () => this.props.getAllRegistered(this.state.filter, "registered")
    );
  }
  onChangePage(page, pageSize) {
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
      () => this.props.getAllRegistered(this.state.filter, "registered")
    );
  }
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
  onAddAccount = () => {
    this.setState({ addRegisteredState: true });
  };
  onEditAccount(account) {
    this.setState({
      addRegisteredState: true,
      current_account: account,
      edit: true
    });
  }
  onAccountClose = () => {
    this.setState({
      addRegisteredState: false,
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
            addRegisteredState: false,
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
        .createRegister(data)
        .then(res => {
          this.setState({
            ...this.state,
            isSubmiting: false,
            addRegisteredState: false,
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
  onRefresh() {
    this.props.getAllRegistered(this.state.filter, "registered");
    this.setState({
      selectedRowKeys: []
    });
  }
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
      () => this.props.getAllRegistered(this.state.filter, "registered")
    );
  };

  onDelete() {
    this.props.delete({ id: this.state.selectedRowKeys }).then(() => {
      this.setState({
        selectedRowKeys: []
      });
    });
  }
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
        () => this.props.getAllRegistered(this.state.filter, "registered")
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
        () => this.props.getAllRegistered(this.state.filter, "registered")
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
                  ? `${record.firstname} ${record.lastname}`
                  : `panda user`
              }
              alt={`${record.firstname}${record.lastname}`}
            ></AvatarInTable>
          ) : (
            <AvatarInTable
              src={DEFAULT_IMAGE_URL}
              alt={`panda user`}
              title={
                record.firstname
                  ? `${record.firstname} ${record.lastname}`
                  : `panda user`
              }
            ></AvatarInTable>
          )
      },
      {
        key: "status",
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
        render: (text, record) =>
          record.email ? (
            <b
              style={record.email_verified === 1 ? { color: "blue", cursor: "pointer" } : {color: '#333', cursor: "pointer" }}
              onClick={() => this.onEditAccount(record)}
            >
              {record.email}
            </b>
          ) : (
            <b
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => this.onEditAccount(record)}
            >
              {record.social}
            </b>
          )
      },
      {
        title: <IntlMessages id="global.mobile" />,
        dataIndex: "mobile",
        key: "mobile",
        render: (text, record) => (
          <b
            style={record.phone_verified === 1 ? { color: "blue", cursor: "pointer" } : {color: '#333', cursor: "pointer" }}
            onClick={() => this.onEditAccount(record)}
          >
            {record.mobile}
          </b>
        ),
        sorter: true
      },
      {
        title: <IntlMessages id="global.firstname" />,
        dataIndex: "firstname",
        key: "firstname",
        sorter: true
      },
      {
        title: <IntlMessages id="global.lastname" />,
        dataIndex: "lastname",
        key: "lastname",
        sorter: true
      },

  
    
    
    ];

    const { listRegistered, paging, country } = this.props;
    return (
      <React.Fragment>
        <div className="formelements-wrapper">
          <PageTitleBar
            title={<IntlMessages id="sidebar.registered" />}
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
                dataSource={listRegistered}
                tableLayout="auto"
                rowKey="id"
                size="middle"
                pagination={{
                  pageSizeOptions: ["1", "5", "10", "20", "50"],
                  total: paging.count,
                  showSizeChanger: true
                }}
                onChange={this.onChangeTable}
             
              />
            </RctCollapsibleCard>
          </div>
        </div>

        <AddRegistered
          open={this.state.addRegisteredState}
          onSaveAccount={this.onSaveAccount}
          onAccountClose={this.onAccountClose}
          loading={this.state.isSubmiting}
          edit={this.state.edit}
          account={this.state.current_account}
          country={country}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    listRegistered: state.account.listAccount,
    paging: state.account.paging,
    country: state.country.listCountry
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllRegistered: (filter, data) => dispatch(getAllACCOUNT(filter, data)),
    createRegister: account => dispatch(createACCOUNT(account)),
    updateAccount: account => dispatch(updateACCOUNT(account)),
    delete: data => dispatch(batchDelete(data)),
    getAllConuntry: () => dispatch(getAllCountry({ paging: 0 }))
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListRegistered)
);

import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllMessages,
  updateMessages,
  createMessages,
  batchDelete,
  changeStatus,
  sendMessages
} from "../../../actions/MessagesAction";
import { publish, unpublish } from "../../../actions/CommonActions";
import IntlMessages from "Util/IntlMessages";
import AddMessages from "./AddMessages";
import SendMessages from "./SendMessages";
import { Table, Input, Button } from "antd";
import "antd/dist/antd.css";
import TableActionBar from "../../../components/TableActionBar";
import moment from "moment";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMessages: [],
      filter: {
        search: "",
        sort: {
          type: "desc",
          attr: ""
        },
        paging: {
          perpage: 10,
          page: 1
        }
      },
      filterAll: {
        paging: 0
      },
      edit: false,
      isSubmiting: false,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      open: false,
      openSend: false,
      getMessages: null
    };
  }

  componentDidMount() {
    this.props.getAllMessages(this.state.filter);
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
      () => this.props.getAllMessages(this.state.filter)
    );
  }

  onRefresh() {
    this.props.getAllMessages(this.state.filter, "messages");
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

  onCreateMessages = () => {
    this.setState({
      open: true,
      getMessages: null
    });
  };

  onEditMessages = messages => {
    this.setState({
      open: true,
      getMessages: messages,
      edit: true
    });
  };

  onMessagesClose = () => {
    this.setState({
      open: false,
      openSend: false,
      getMessages: null,
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
        () => this.props.getAllMessages(this.state.filter)
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
        () => this.props.getAllMessages(this.state.filter)
      );
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
        this.props.getAllMessages(this.state.filter);
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
          this.props.getAllMessages(this.state.filter);
        }
      );
    }
  }

  onSaveMessages = async (data, id) => {
    await this.setState({
      ...this.state,
      isSubmiting: true
    });
    if (this.state.edit) {
      var dataSubmit = { ...data, id: id };
      await this.props
        .updateMessages(dataSubmit)
        .then(res => {
          this.setState({
            ...this.state,
            isSubmiting: false,
            open: false,
            getMessages: null,
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
        .createMessages(data)
        .then(res => {
          this.setState({
            ...this.state,
            isSubmiting: false,
            open: false,
            getMessages: null,
            messages: null,
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

  onSendMessages = async data => {
    await this.props
      .sendMessages(data)
      .then(res => {
        this.setState({
          openSend: false,
          isSubmiting: false
        });
      })
      .catch(err => {
        this.setState({
          ...this.state,
          isSubmiting: false
        });
      });
  };

  onSend = data => {
    this.setState({
      openSend: true,
      messages: data
    });
  };

  columns = [
    {
      title: <IntlMessages id="global.title" />,
      key: "title",
      render: record => {
        return (
          <b
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => this.onEditMessages(record)}
          >
            {record.title}
          </b>
        );
      }
    },
    {
      title: <IntlMessages id="messages.content" />,
      dataIndex: "content",
      key: "content"
    },
    {
      title: <IntlMessages id="messages.created_at" />,
      key: "created_at",
      render: record => {
        return <span>{moment(record.created_at).format("YYYY/MM/DD")}</span>;
      }
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true
    },
    {
      key: "action",
      render: record => {
        return (
          <Button
            type="primary"
            onClick={() => this.onSend(record)}
            style={{ marginBottom: "0px" }}
          >
            Send
          </Button>
        );
      }
    }
  ];

  render() {
    const { selectedRowKeys } = this.state;

    const { listMessages, listCustomer, paging } = this.props;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
      <React.Fragment>
        <div className="formelements-wrapper">
          <PageTitleBar
            title={<IntlMessages id="sidebar.messages" />}
            match={this.props.match}
          />
          <div className="row">
            <RctCollapsibleCard colClasses="col-12">
              <TableActionBar
                onAdd={() => this.onCreateMessages()}
                onDelete={() => this.onDelete()}
                onRefresh={() => this.onRefresh()}
                isDisabled={!hasSelected}
                rows={this.state.selectedRowKeys}
                isShowPublishButtons={false}
                table="messages"
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
                columns={this.columns}
                dataSource={listMessages}
                onChange={this.onChangTable}
                rowKey="id"
                size="middle"
                pagination={{
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "30"],
                  total: paging.count,
                  defaultCurrent: +paging.page,
                  pageSize: +paging.perpage
                }}
              />
            </RctCollapsibleCard>
          </div>
        </div>

        <AddMessages
          open={this.state.open}
          onSaveMessages={this.onSaveMessages}
          edit={this.state.edit}
          loading={this.state.isSubmiting}
          messages={this.state.getMessages}
          onMessagesClose={this.onMessagesClose}
        />

        <SendMessages
          openSend={this.state.openSend}
          onSendMessages={this.onSendMessages}
          loading={this.state.isSubmiting}
          messages={this.state.messages}
          onMessagesClose={this.onMessagesClose}
        />

      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    listMessages: state.messages.listMessages,
    listCustomer: state.account.listAccount,
    paging: state.messages.paging
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllMessages: listMessages => dispatch(getAllMessages(listMessages)),
    sendMessages: (filter, type) => dispatch(sendMessages(filter, type)),
    updateMessages: id => dispatch(updateMessages(id)),
    createMessages: data => dispatch(createMessages(data)),
    changeStatus: data => dispatch(changeStatus(data)),
    publish: data => dispatch(publish(data)),
    unpublish: data => dispatch(unpublish(data)),
    delete: data => dispatch(batchDelete(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(index);

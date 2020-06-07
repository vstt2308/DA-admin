import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getAllSubcribers,
} from "../../../actions/SubcribersActions";
import { publish, unpublish } from "../../../actions/CommonActions";
import config from '../../../../config';
import IntlMessages from "Util/IntlMessages";
import {
  Table,
  Input,
  Tag,
} from "antd";
import "antd/dist/antd.css";
import TableActionBar from "../../../components/TableActionBar";
import StatusButton from "../../../components/StatusButton";
import ImageInTable from "../../../components/ImageInTable";
import moment from "moment";
import AvatarInTable from '../../../components/AvatarInTable';
const ACCOUNT_IMAGE_URL = config.URL_ASSET;
const DEFAULT_IMAGE_URL = ACCOUNT_IMAGE_URL + "/logo2.png";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSubcribers: [],
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
      edit: false,
      isSubmiting: false,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      open: false,
      getSubcriber: null
    };
  }

  componentDidMount() {
    this.props.getAllSubcribers(this.state.filter);
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
      () => this.props.getAllSubcribers(this.state.filter)
    );
  }

  onRefresh() {
    this.props.getAllSubcribers(this.state.filter, "subscriber");
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
        () => this.props.getAllSubcribers(this.state.filter)
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
        () => this.props.getAllSubcribers(this.state.filter)
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
        this.props.getAllSubcribers(this.state.filter);
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
          this.props.getAllSubcribers(this.state.filter);
        }
      );
    }
  }

  columns = [
    {
        key: 'image',
        title: <IntlMessages id="global.avatar" />,
        dataIndex: 'image',
        render: (text, record) => (
            record.image ?
                <AvatarInTable  src={ACCOUNT_IMAGE_URL + record.image} alt={`${record.title}_logo`}></AvatarInTable>
                :
                <AvatarInTable  src={DEFAULT_IMAGE_URL} alt={`avatar_logo`}></AvatarInTable>
        )
    },
    {
      title: <IntlMessages id="subscriber.first_name" />,
      dataIndex: "firstname",
      key: "first_name"
    },
    {
        title: <IntlMessages id="subscriber.last_name" />,
        dataIndex: "lastname",
        key: "last_name"
    },
    {
      title: <IntlMessages id="subscriber.created_at" />,
      key: "created_at",
      render: record => {
        return (
        <span>{moment(record.created_at).format('YYYY/MM/DD')}</span>
        )
      }
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true
    }
  ];

  render() {
    const { loading, selectedRowKeys } = this.state;
    const { Search } = Input;

    const { listSubcribers, paging } = this.props;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const hasSelected = selectedRowKeys.length > 0;


    return (
      <React.Fragment>
        <div className="formelements-wrapper">
          <PageTitleBar
            title={<IntlMessages id="sidebar.subcriber" />}
            match={this.props.match}
          />
          <div className="row">
            <RctCollapsibleCard colClasses="col-12">
              <Table
                tableLayout="auto"
                rowSelection={rowSelection}
                columns={this.columns}
                dataSource={listSubcribers}
                onChange={this.onChangTable}
                rowKey="id"
                size="middle"
                pagination={{
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "30"],
                  total: paging.count,
                  defaultCurrent: +paging.page,
                  pageSize: +paging.perpage,
                }}
              />
            </RctCollapsibleCard>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    listSubcribers: state.subcribers.listSubcribers,
    paging: state.subcribers.paging
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllSubcribers: filter => dispatch(getAllSubcribers(filter)),
    publish: data => dispatch(publish(data)),
    unpublish: data => dispatch(unpublish(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);

import config from "../../../../config";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import IntlMessages from "Util/IntlMessages";
import { getAllTour, deleteTour } from "../../../actions/TourActions";
import { getAllDestination } from "../../../actions/DestinationActions";
import {
  Table,
  Button,
  Pagination,
  Icon,
  Row,
  Form,
  DatePicker,
  Input,
  Divider,
} from "antd";
import StatusButton from "../../../components/StatusButton";
import DepartureModal from "./DepartureModal";
import BaseSelect from "Components/Elements/BaseSelect";
import TableActionBar from "../../../components/TableActionBar";
import AddTour from "./AddTour";
import ImageInTable from "../../../components/ImageInTable";
import FlightSearch from "./FlightSearch";
import TourAirlines from "./TourAirlines";
import TourFlight from "./TourFlight";
const {URL_ASSET} = config;

class ListTour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        sort: {
          type: "desc",
          attr: "",
        },
        created_at: {
          type: "compare",
          value: {
            from: "",
            to: "",
          },
        },
        title: {
          type: "like",
          value: "",
        },
        alias: {
          type: "=",
          value: [],
        },
        search: "",
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
      isOpenSetupDepartureModal: false,
      isOpenCreateModal: false,
      loading: false,
      currentTour: null,
      isEdit: false,
      isOpenFilter: false,
      isOpenFlightSearch: false,
      isOpenTourAirline: false,
      isOpenFlightList: false,
      airlineType: "1", // airline type '1' is onward, '2' is return
    };
  }
  componentDidMount() {
    this.props.getAllTour(this.state.filter).then((res) => {
      let daysOfTour = [];
      let tours = res.data.list;
      for (let i = 0; i < tours.length; i++) {
        if (this.checkDuration(daysOfTour, tours[i].days + " days")) {
          daysOfTour.push({
            id: tours[i].id,
            title: tours[i].days + " days",
          });
        }
      }
      this.setState({
        ...this.state,
        daysOfTour: daysOfTour.sort((item1, item2) => {
          return item1 - item2;
        }),
      });
    });
    this.props.getAllDestination({ paging: 0 }).then((res) => {
      // console.log(res.data.list);
      let desNameTour = res.data.list.map((item) => {
        if (item.title) {
          return {
            id: item.id,
            title: item.title,
          };
        }
      });
      this.setState({
        ...this.state,
        desNameTour: desNameTour,
      });
    });
  }

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
              perpage: pageSize,
            },
          },
        },
        () => {
          this.props.getAllTour(this.state.filter);
        }
      );
    }
  }

  handleChangeRowsPerPage(event) {
    this.setState(
      {
        ...this.state,
        filter: {
          ...this.state.filter,
          paging: {
            perpage: +event.target.value,
            page: 1,
          },
        },
      },
      () => {
        this.props.getAllTour(this.state.filter);
      }
    );
  }

  openCreateTourModal = () => {
    this.setState({
      isOpenCreateModal: true,
    });
  };

  onChangeSearch(event) {
    this.setState(
      {
        ...this.state,
        filter: {
          ...this.state.filter,
          search: event.target.value,
        },
      },
      () => this.props.getAllTour(this.state.filter)
    );
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  onCloseModal() {
    this.setState({
      isOpenSetupDepartureModal: false,
      isOpenCreateModal: false,
      isOpenFlightSearch: false,
      currentTour: null,
      isEdit: false,
      isOpenTourAirline: false,
      isOpenFlightList: false,
    });
  }

  onRefresh() {
    this.props.getAllTour(this.state.filter);
    this.setState({
      selectedRowKeys: [],
    });
  }

  onDelete() {
    this.props.deleteTour({ id: this.state.selectedRowKeys });
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
      () => this.props.getAllTour(this.state.filter)
    );
  };

  onFilter(name, value) {
    this.setState({
      filter: {
        ...this.state.filter,
        [name]: {
          type: "=",
          value: value,
        },
      },
    });
    setTimeout(() => {
      this.props.getAllTour(this.state.filter);
    }, 300);
  }

  toggleFilter = () => {
    this.setState({
      isOpenFilter: !this.state.isOpenFilter,
    });
  };

  filterDestination = (id) => {
    this.setState({
      filter: {
        ...this.state.filter,
        destination_id: id,
      },
    });
  };

  filter = (value, name, type) => {
    if (type === "search") {
      this.setState(
        {
          ...this.state,
          filter: {
            ...this.state.filter,
            search: value,
          },
        },
        () => this.props.getAllTour(this.state.filter)
      );
    } else
      this.setState(
        {
          ...this.state,
          filter: {
            ...this.state.filter,
            [name]: {
              type: "=",
              value: value,
            },
          },
        },
        () => this.props.getAllTour(this.state.filter)
      );
  };

  checkDuration(arr, str) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].title.toString() === str.toString()) return 0;
    }
    return 1;
  }

  openTourAirlineModal() {
    this.setState({
      isOpenFlightSearch: false,
      isOpenTourAirline: true,
    });
  }

  goBackToFlightSearch() {
    this.setState({
      isOpenFlightSearch: true,
      isOpenTourAirline: false,
    });
  }

  setAirlineType(key) {
    this.setState({ airlineType: key });
  }

  render() {
    const columns = [
      {
        title: "Image",
        dataIndex: "image",
        render: (text, record) => (
          <div className="image_logo">
            <ImageInTable
              src={URL_ASSET + record.image}
              alt={`${record.flag}_logo`}
            ></ImageInTable>
          </div>
        ),
      },
      {
        key: 2,
        title: <IntlMessages id="global.status" />,
        dataIndex: "status",
        render: (text, record) => {
          return (
            <React.Fragment>
              {record ? (
                <StatusButton
                  data_id={record.id}
                  status={record.status}
                  table="tour"
                />
              ) : null}
            </React.Fragment>
          );
        },
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        sorter: true,
        render: (text, record) => (
          <b
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() =>
              this.setState({
                currentTour: record,
                isOpenCreateModal: true,
                isEdit: true,
              })
            }
          >
            {record.title}
          </b>
        ),
      },
     
      {
        title: "Duration",
        dataIndex: "duration_txt",
        key: "days",
        sorter: true,
      },
   
    
      {
        title: "Departure",
        dataIndex: "",
        render: (text, record) => {
          return (
            <b
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => {
                this.setState({
                  currentTour: record,
                  isOpenSetupDepartureModal: true,
                });
              }}
            >
              Setup Departure
            </b>
          );
        },
      },
      {
        title: "Itinerary",
        dataIndex: "",
        render: (text, record) => (
          <b>
            <Link
              to={`/app/itineraries/${record.id}`}
              style={{ color: "blue" }}
            >
              Setup Itineraries
            </Link>
          </b>
        ),
      },
      // {
      //   title: "Flight",
      //   dataIndex: "",
      //   render: (text, record) => (
      //     <React.Fragment>
      //       <Button
      //         type="link"
      //         style={{ color: "blue", margin: 0, padding: 0 }}
      //         onClick={() =>
      //           this.setState({ currentTour: record, isOpenFlightSearch: true })
      //         }
      //       >
      //         Setup Flight
      //       </Button>
      //       <Divider type="vertical" />
      //       <Button
      //         type="link"
      //         style={{ color: "blue", margin: 0, padding: 0 }}
      //         onClick={() =>
      //           this.setState({ currentTour: record, isOpenFlightList: true })
      //         }
      //       >
      //         View Flights
      //       </Button>
      //     </React.Fragment>
      //   ),
      // },
      {
        title: "Calendar",
        dataIndex: "",
        render: (text, record) => (
          <b>
            <Link to={`/app/calendar/${record.id}`} style={{ color: "blue" }}>
              Setup Availablity
            </Link>
          </b>
        ),
      },
    ];

    const {
      loading,
      selectedRowKeys,
      isOpenFilter,
      daysOfTour,
      desNameTour,
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    const { tours, destinationTour, paging } = this.props;

    const listCountry = [
      { title: "Austrailia", id: 15 },
      { title: "Canada", id: 2 },
      { title: "China", id: 45 },
      { title: "United States", id: 1 },
    ];

    // let desNameTour = destinationTour.map(item => {
    //   if (item.title) {
    //     return {
    //       id: item.id,
    //       title: item.title
    //     };
    //   }
    // });

    return (
      <React.Fragment>
        <div className="formelements-wrapper">
          <PageTitleBar
            title={<IntlMessages id="sidebar.tours" />}
            match={this.props.match}
          />
          <div className="row">
            <RctCollapsibleCard colClasses="col-sm-12 col-md-12 col-xl-12">
              <div style={{ display: "inline-block", width: "98%" }}>
                <TableActionBar
                  onAdd={this.openCreateTourModal}
                  onDelete={() => this.onDelete()}
                  onRefresh={() => this.onRefresh()}
                  isDisabled={!hasSelected}
                  rows={this.state.selectedRowKeys}
                  table="tour"
                  isShowPublishButtons={false}
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
              </div>
              <div style={{ float: "right", lineHeight: "60px" }}>
                <Icon
                  type="filter"
                  style={
                    isOpenFilter
                      ? { color: "blue", fontSize: 20 }
                      : { color: "rgba(0,0,0,.25)", fontSize: 20 }
                  }
                  onClick={() => this.toggleFilter()}
                />
              </div>
              {isOpenFilter ? (
                <Form
                  layout="inline"
                  onSubmit={this.handleSubmit}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Form.Item>
                    <BaseSelect
                      showSearch
                      options={desNameTour}
                      defaultText="Select destination"
                      optionValue="id"
                      onChange={(value) =>
                        this.onFilter("destination_id", value)
                      }
                      style={{ width: "200px" }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <BaseSelect
                      showSearch
                      options={daysOfTour}
                      defaultText="Select duration"
                      optionValue="title"
                      onChange={(value) => this.onFilter("days", value)}
                      style={{ width: "200px" }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <BaseSelect
                      showSearch
                      options={listCountry}
                      defaultText="Select market"
                      optionValue="id"
                      onChange={(value) => this.onFilter("country_id", value)}
                      style={{ width: "200px" }}
                    />
                  </Form.Item>
                </Form>
              ) : (
                ""
              )}
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={tours}
                rowKey="id"
                onChange={this.onChangeTable}
                pagination={{
                  total: paging.count,
                  defaultCurrent: +paging.page,
                  pageSize: +paging.perpage,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "30"],
                }}
                size="middle"
              />
            </RctCollapsibleCard>
          </div>
        </div>

        <DepartureModal
          isVisible={this.state.isOpenSetupDepartureModal}
          onCloseModal={() => this.onCloseModal()}
          tour={this.state.currentTour ? this.state.currentTour.id : null}
        />

        <AddTour
          open={this.state.isOpenCreateModal}
          edit={this.state.isEdit}
          item={this.state.currentTour ? this.state.currentTour.id : null}
          onClose={() => this.onCloseModal()}
        />

        <FlightSearch
          visible={this.state.isOpenFlightSearch}
          tour_id={this.state.currentTour ? this.state.currentTour.id : null}
          onClose={() => this.onCloseModal()}
          onOk={() => this.openTourAirlineModal()}
          onChangeType={(key) => this.setAirlineType(key)}
        />

        <TourAirlines
          visible={this.state.isOpenTourAirline}
          tour_id={this.state.currentTour ? this.state.currentTour.id : null}
          onClose={() => this.onCloseModal()}
          onBack={() => this.goBackToFlightSearch()}
          defaultTab={this.state.airlineType}
        />

        <TourFlight
          visible={this.state.isOpenFlightList}
          tour_id={this.state.currentTour ? this.state.currentTour.id : null}
          onClose={() => this.onCloseModal()}
          // onBack={() => this.goBackToFlightSearch()}
          // defaultTab={this.state.airlineType}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    tours: state.tour.listTour,
    targetTour: state.tour.currentTour,
    destinationTour: state.destination.listDestination,
    paging: state.tour.paging,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllTour: (filter) => dispatch(getAllTour(filter)),
    getAllDestination: (filter) => dispatch(getAllDestination(filter)),
    deleteTour: (ids) => dispatch(deleteTour(ids)),
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListTour)
);

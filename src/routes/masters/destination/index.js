import { Icon, Table } from "antd";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IntlMessages from 'Util/IntlMessages';
import config from '../../../../config';
import { getAllCountry } from '../../../actions/CountryActions';
import { batchDelete, createDestination, getAllDestination, updateDestination } from '../../../actions/DestinationActions';
import ImageInTable from '../../../components/ImageInTable';
import StatusButton from '../../../components/StatusButton';
import TableActionBar from '../../../components/TableActionBar';
import AddDestination from "./AddDestination";
import { getAllCurrency } from "../../../actions/CurrencyAction";
const DESTINATION_IMAGE_URL = config.URL_ASSET;

class ListDestination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                sort: {
                    type: "desc",
                    attr: ""
                },
                country_id: {
                    type: "=",
                    value: ""
                },
                search: "",
                paging: {
                    perpage: 10,
                    page: 1
                }
            },
            addDestinationState: false,
            selectedRowKeys: [],
            isSubmiting: false,
            current_destination: null,
            edit: false,
            re_render: false
        }

    }
    componentDidMount() {
        this.props.getAllDestination(this.state.filter);
        this.props.getAllConuntry();
        this.props.getAllCurrency(this.state.filter)
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };
    onAddDestination = () => {
        this.setState({
            addDestinationState: true
        })
    }
    onEditDestination(destination) {



        this.setState({
            addDestinationState: true,
            current_destination: destination,
            edit: true
        })
    }
    onDestinationClose = () => {
        this.setState({
            addDestinationState: false,
            current_destination: null,
            isSubmiting: false,
            edit: false
        })
    }
    onRefresh() {
        this.props.getAllDestination(this.state.filter);
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
    getOrder(order) {
        if (order === "ascend") return "asc";
        if (order === "descend") return "desc";
        return "desc";
    }

    onChangTable = (pagination, filters, sorter, extra = { currentDataSource: [] }) => {
        this.setState({
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
        }, () => this.props.getAllDestination(this.state.filter))

    }
    onSaveDestination = async (data, id) => {
        await this.setState({
            ...this.state,
            isSubmiting: true
        })
        if (this.state.edit) {
            var dataSubmit = { ...data, id: id }
            await this.props.updateDestination(dataSubmit).then(res => {
                if (res.data.parent_id !== 0) {
                    this.setState({
                        ...this.state,
                        isSubmiting: false,
                        addDestinationState: false,
                        current_destination: null,
                        edit: false
                    }, () => window.location.reload());
                }
                else {
                    this.setState({
                        ...this.state,
                        isSubmiting: false,
                        addDestinationState: false,
                        current_destination: null,
                        edit: false
                    });
                }
            }).catch(err => {
                this.setState({
                    ...this.state,
                    isSubmiting: false
                })
            })
        }
        else await this.props.createDestination(data).then(res => {
            if (res.data.parent_id !== 0) {
                this.setState({
                    ...this.state,
                    isSubmiting: false,
                    addDestinationState: false,
                    current_destination: null,
                    edit: false
                }, () => window.location.reload()
                )
            }
            else {
                this.setState({
                    ...this.state,
                    isSubmiting: false,
                    addDestinationState: false,
                    current_destination: null,
                    edit: false
                });
            }

        }).catch(err => {
            this.setState({
                ...this.state,
                isSubmiting: false
            })
        })
    }
    filter = (value, name, type) => {
        if (type === "search") {
            this.setState({
                ...this.state,
                filter: {
                    ...this.state.filter,
                    search: value
                }
            }, () => this.props.getAllDestination(this.state.filter))
        }
        else
            this.setState({
                ...this.state,
                filter: {
                    ...this.state.filter,
                    [name]: {
                        type: "=",
                        value: value
                    }
                }
            }, () => this.props.getAllDestination(this.state.filter))
    }


    render() {


        const columns = [
            {
                title: <IntlMessages id='global.status' />,
                dataIndex: "status",
                render: (text, record) => (
                    <StatusButton data_id={record.id} status={record.status} table='destination' />
                )
            },
            {
                title: <IntlMessages id='destination.title' />,
                dataIndex: "title",
                key: "title",
                render: (text, record) => (
                    <span style={{ cursor: "pointer", color: "blue" }}
                        onClick={() => this.onEditDestination(record)}>
                        {record.parent_id !== 0 ? (
                            <div style={{ paddingLeft: "10px" }}>
                                <Icon type="enter" style={{ paddingRight: "5px", transform: 'scaleX(-1)' }} />
                                <span>{record.title}</span>
                            </div>
                        ) : (
                                record.title
                            )}
                    </span>
                )

            },
            {
                title: <IntlMessages id='global.image' />,
                dataIndex: "image",
                render: (text, record) => (
                    <ImageInTable src={DESTINATION_IMAGE_URL + record.image} alt={`${record.title}_logo`}></ImageInTable>
                )
            },

            {
                title: <IntlMessages id='global.country' />,
                dataIndex: "country_title",
                key: "country_title",

            },
            {
                title: <IntlMessages id='global.timezone' />,
                dataIndex: "timezone",
                key: "timezone",
            },
            {
                title: <IntlMessages id='sidebar.currency' />,
                dataIndex: "currency_name",
                key: "currency_name",
            },
            {
                title: <IntlMessages id='global.code' />,
                dataIndex: "code",
            },
            {
                title: <IntlMessages id="global.id" />,
                dataIndex: 'id',
                key: 'id',
                sorter: true

            },

        ];
        var listDestinationParent = this.props.listDestination.filter(item => {
            return (
                item.parent_id === 0
            )
        })


        const { selectedRowKeys } = this.state;
        const hasSelected = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        const { country, listDestination, currency } = this.props;

        return (
            <React.Fragment>
                <div className="formelements-wrapper">
                    <PageTitleBar
                        title={<IntlMessages id="sidebar.destination" />}
                        match={this.props.match}
                    />
                    <div className="row">
                        <RctCollapsibleCard colClasses="col-12">
                            <TableActionBar
                                onAdd={() => this.onAddDestination()}
                                onDelete={() => this.onDelete()}
                                onRefresh={() => this.onRefresh()}
                                isDisabled={!hasSelected}
                                rows={this.state.selectedRowKeys}
                                isShowPublishButtons={true}
                                table="destination"
                                onFilter={this.filter}
                                data={[
                                    {
                                        name: "country_id",
                                        data: country,
                                        placeholder: "Select country..."
                                    },
                                ]}
                                justify="end"
                            >
                                {hasSelected ? (
                                    <p
                                        className="ml-10"
                                        style={{ display: "inline-block" }}
                                    >
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
                                dataSource={listDestination}
                                rowKey="id"
                                onChange={this.onChangTable}
                                size='middle'
                                pagination={{
                                    defaultPageSize: 10,
                                    showSizeChanger: true,
                                    pageSizeOptions: ['5', '10', '20', '30'],
                                    total: this.props.paging.count
                                }}
                            />
                        </RctCollapsibleCard>
                    </div>
                </div>
                <AddDestination
                    open={this.state.addDestinationState}
                    onSaveDestination={this.onSaveDestination}
                    loading={this.state.isSubmiting}
                    edit={this.state.edit}
                    destination={this.state.current_destination}
                    onDestinationClose={this.onDestinationClose}
                    DestinationParent={listDestinationParent}
                    country={country}
                    currency={currency}
                />
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        listDestination: state.destination.listDestination,
        paging: state.destination.paging,
        country: state.country.listCountry,
        currency: state.currency.listCurrency,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllDestination: (filter) => dispatch(getAllDestination(filter)),
        updateDestination: (data) => dispatch(updateDestination(data)),
        createDestination: (data) => dispatch(createDestination(data)),
        delete: (data) => dispatch(batchDelete(data)),
        getAllConuntry: () => dispatch(getAllCountry({ paging: 0 })),
        getAllCurrency: () => dispatch(getAllCurrency({ paging: 0 })),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListDestination));

import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IntlMessages from 'Util/IntlMessages';
import { changeStatus, publish, unpublish } from '../../actions/CommonActions';
import StatusButton from '../../components/StatusButton';
import TableActionBar from '../../components/TableActionBar';
import config from '../../../config';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import { Table, Tag, Button } from 'antd';
import AddWidget from './AddWidget';
// actions
import { getAllWidgets, getWidgetDetail, addWidget, deleteWidget, updateWidget } from '../../actions/WidgetActions';

class Widgets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                // sort: {
                //     type: "asc",
                //     attr: ""
                // },
                // search: "",
                paging: {
                    perpage: 10,
                    page: 1
                }
            },
            selectedRowKeys: [],
            addWidget: false,
            isLoadingSubmit: false,
            currentWidget: null,
            edit: false
        }
    }

    componentDidMount() {
        this.props.getAllWidgets(this.state.filter);
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    onRefresh() {
        this.props.getAllWidgets(this.state.filter);
        this.setState({
            selectedRowKeys: []
        })
    }

    onDelete() {
        this.props.deleteWidget({ id: this.state.selectedRowKeys }).then(() => {
            this.setState({
                selectedRowKeys: []
            })
        })
    }

    onChangPage(page, pageSize) {
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                paging: {
                    perpage: pageSize,
                    page: page
                }
            }
        }, () => {
            this.props.getAllWidgets(this.state.filter);
        });
    }

    onChangePerpage(current, size) {
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                paging: {
                    perpage: size,
                    page: current
                }
            }
        }, () => {
            this.props.getAllWidgets(this.state.filter);
        });
    }

    filter = (value, name, type) => {
        if (type === "search") {
            this.setState({
                ...this.state,
                filter: {
                    ...this.state.filter,
                    search: value
                }
            }, () => this.props.getAllWidgets(this.state.filter))

        } else {
            this.setState({
                ...this.state,
                filter: {
                    ...this.state.filter,
                    [name]: {
                        type: "=",
                        value: value
                    }
                }
            }, () => this.props.getAllWidgets(this.state.filter))
        }
    }

    onAddWidget = (item = null) => {
        if (item) {
            this.setState({
                currentWidget: item,
                addWidget: true
            })
        } else {
            this.setState({
                addWidget: true
            })
        }

    }

    onClose = () => {
        this.setState({
            addWidget: false,
            currentWidget: null
        })
    }

    onSubmit(data) {
        this.setState({ isLoadingSubmit: true });
        if (this.state.currentWidget) {
            this.props.updateWidget({
                ...data,
                id: this.state.currentWidget.id
            }).then(() => {
                setTimeout(() => {
                    this.setState({ isLoadingSubmit: false, addWidget: false, currentWidget: null });
                }, 500);
            })
        } else {
            this.props.addWidget(data).then(() => {
                setTimeout(() => {
                    this.setState({ isLoadingSubmit: false, addWidget: false, currentWidget: null });
                }, 500);
            })
        }
    }

    render() {
        var { widgets, paging } = this.props;
        const { selectedRowKeys } = this.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

        const columns = [
            {
                title: <IntlMessages id='global.status' />,
                dataIndex: 'status',
                render: (text, record) => (
                    <StatusButton data_id={record.id} status={record.status} table='widgets' />
                )
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                render: (text, record) => (
                    <Button type="link" onClick={() => this.onAddWidget(record)}>{record.title}</Button>
                )
            },
            {
                title: 'Code',
                dataIndex: 'code',
                key: 'code',
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'address',
                render: type => {
                    if (type == 1) return <Tag color='magenta'>destination</Tag>
                    if (type == 2) return <Tag color='green'>tour</Tag>
                    if (type == 4) return <Tag color='#2db7f5'>pages</Tag>
                    return <Tag color='blue'>custom</Tag>
                }
            },
        ];

        return (
            <React.Fragment>
                <div className="formelements-wrapper">
                    <PageTitleBar
                        title={<IntlMessages id="sidebar.widgets" />}
                        match={this.props.match}
                    />
                    <div className="row">
                        <RctCollapsibleCard colClasses='col-12'>
                            <TableActionBar
                                onAdd={() => this.onAddWidget()}
                                onDelete={() => this.onDelete()}
                                onRefresh={() => this.onRefresh()}
                                isDisabled={!hasSelected}
                                rows={this.state.selectedRowKeys}
                                isShowPublishButtons={true}
                                table='widgets'
                                showFilter={false}
                                onFilter={this.filter}
                            >
                                {hasSelected ? <p className='ml-10' style={{ display: 'inline-block' }}>Selected {selectedRowKeys.length} {selectedRowKeys.length === 1 ? 'item' : 'items'} </p> : ''}
                            </TableActionBar>
                            <Table
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={widgets}
                                tableLayout="auto"
                                rowKey="id"
                                pagination={{
                                    pageSizeOptions: ['10', '15', '20', '50'],
                                    total: paging.count,
                                    onChange: (page, pageSize) => this.onChangPage(page, pageSize),
                                    showSizeChanger: true,
                                    onShowSizeChange: (current, size) => this.onChangePerpage(current, size)

                                }}
                            // onChange={this.onChangeTable}
                            />

                        </RctCollapsibleCard>
                    </div>
                </div>
                <AddWidget
                    open={this.state.addWidget}
                    onSave={(data) => this.onSubmit(data)}
                    loading={this.state.isLoadingSubmit}
                    widget={this.state.currentWidget}
                    onClose={this.onClose}
                // destinations={destinations}
                // tours={tours}
                />
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        widgets: state.widget.widgets,
        paging: state.widget.paging,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllWidgets: (query) => dispatch(getAllWidgets(query)),
        getWidgetDetail: (id) => dispatch(getWidgetDetail(id)),
        addWidget: (data) => dispatch(addWidget(data)),
        updateWidget: (data) => dispatch(updateWidget(data)),
        deleteWidget: (data) => dispatch(deleteWidget(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Widgets));

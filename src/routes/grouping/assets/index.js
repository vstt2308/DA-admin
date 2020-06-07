import { Table, Button, Icon } from 'antd';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IntlMessages from 'Util/IntlMessages';
import { addAsset, deleteAsset, getAllAsset, updateAsset } from '../../../actions/AssetActions';
import TableActionBar from '../../../components/TableActionBar';
import AddAsset from './AddAsset';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";


class ListAsset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                sort: {
                    type: "desc",
                    attr: ""
                },
                parent_id: {
                    type: "=",
                    value: null
                },
                search: "",
                paging: {
                    perpage: 10,
                    page: 1
                }
            },
            addAssetState: false,
            selectedRowKeys: [],
            isSubmiting: false,
            current_asset: null,
            edit: false
        }
    }
    componentDidMount() {
        this.props.getListAssets(this.state.filter)
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
        }, () => this.props.getListAssets(this.state.filter))
    }
    onChangePage(page, pageSize) {
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                paging: {
                    perpage: pageSize,
                    page: page
                }
            }
        }, () => this.props.getListAssets(this.state.filter))
    }
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };
    onAddAsset = () => {
        this.setState({ addAssetState: true });
    };
    onEditAsset(asset) {
        this.setState({ addAssetState: true, current_asset: asset, edit: true });
    };
    onAssetClose = () => {
        this.setState({ addAssetState: false, current_asset: null, isSubmiting: false, edit: false });
    };
    onSaveAsset = async (data, id) => {
        await this.setState({
            ...this.state,
            isSubmiting: true
        })
        if (this.state.edit) {
            var dataSubmit = { ...data, id: id }
            await this.props.updateAsset(dataSubmit).then(res => {
                this.setState({
                    ...this.state,
                    isSubmiting: false,
                    addAssetState: false,
                    current_asset: null,
                    edit: false
                },() => window.location.reload())
            }).catch(err => {
                this.setState({
                    ...this.state,
                    isSubmiting: false,
                })
            });
        }
        else await this.props.addAsset(data).then(res => {
            this.setState({
                ...this.state,
                isSubmiting: false,
                addAssetState: false,
                current_asset: null,
                edit: false
            },() => window.location.reload())
        }).catch(err => {
            this.setState({
                ...this.state,
                isSubmiting: false,

            })
        });
    };
    onRefresh() {
        this.props.getListAssets(this.state.filter);
        this.setState({
            selectedRowKeys: []
        })
    }
    getOrder(order) {
        if (order === "ascend") return "asc";
        if (order === "descend") return "desc";
        return "desc";
    }

    onChangeTable = (pagination, filters, sorter, extra = { currentDataSource: [] }) => {
        this.setState({
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
        }, () => this.props.getListAssets(this.state.filter))

    }

    onDelete() {
        this.props.delete({ id: this.state.selectedRowKeys }).then(() => {
            this.setState({
                selectedRowKeys: []
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
            }, () => this.props.getListAssets(this.state.filter))

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
            }, () => this.props.getListAssets(this.state.filter))
    }
    render() {
        const columns = [
            {
                title: <IntlMessages id="global.title" />,
                dataIndex: 'title',
                key: 'title',
                sorter: true,
                render: (text, record)=>(
                    
                    <span style={{ cursor: "pointer", color: "blue" }}
                        onClick={() => this.onEditAsset(record)}>
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
                title: <IntlMessages id="global.type" />,
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: <IntlMessages id="global.alias" />,
                dataIndex: 'alias',
                key: 'alias',
                sorter: true

            },
            {
                title: <IntlMessages id="global.created" />,
                dataIndex: 'created_at',
                key: 'created_at',
                render:(text, record)=>(
                    <span>
                        {moment(record.created_at).format('DD/MM/YYYY')}
                    </span>
                )
            },
            {
                title: <IntlMessages id='global.id' />,
                dataIndex: 'id',
                key: 'id',
                sorter: true
            },
        ];
        var listAssetParent = this.props.listAssets.filter(item => {
            return (
                item.parent_id === 0
            )
        })
        const { listAssets, paging } = this.props;
  
        return (
            <React.Fragment>
                <div className="formelements-wrapper">
                    <PageTitleBar
                        title={<IntlMessages id="sidebar.assets" />}
                        match={this.props.match}
                    />
                    <div className="row">
                        <RctCollapsibleCard colClasses='col-12'>
                            <TableActionBar
                                onAdd={() => this.onAddAsset()}
                                onDelete={false}
                                onRefresh={() => this.onRefresh()}
                                isDisabled={null}
                                rows={null}
                                table='asset'
                                isShowPublishButtons={false}
                                isShowDeleteButton={false}
                                showFilter={false}
                                onFilter={this.filter}
                            >

                            </TableActionBar>


                            <Table
                                rowSelection={null}
                                columns={columns}
                                dataSource={listAssets}
                                tableLayout="auto"
                                rowKey="id"
                                pagination={{
                                    pageSizeOptions: ['1', '5', '10', '20', '50'],
                                    total: paging.count,
                                    onChange: (page, pageSize) => this.onChangePage(page, pageSize),
                                    showSizeChanger: true,
                                    onShowSizeChange: (current, size) => this.onChangePerpage(current, size)

                                }}
                                onChange={this.onChangeTable}
                            />

                        </RctCollapsibleCard>
                    </div>
                </div>

                <AddAsset
                    open={this.state.addAssetState}
                    onSaveAsset={this.onSaveAsset}
                    onAssetClose={this.onAssetClose}
                    loading={this.state.isSubmiting}
                    edit={this.state.edit}
                    asset={this.state.current_asset}
                    assetParent={listAssetParent}
                />
            </React.Fragment >

        );
    }
}
const mapStateToProps = (state) => {
    return {
        listAssets: state.asset.listAssets,
        paging: state.asset.paging
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListAssets: (filter) => dispatch(getAllAsset(filter)),
        addAsset: (data) => dispatch(addAsset(data)),
        updateAsset: (data) => dispatch(updateAsset(data)),
        delete: (data) => dispatch(deleteAsset(data))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListAsset));
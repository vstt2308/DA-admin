import { Table } from 'antd';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IntlMessages from 'Util/IntlMessages';
import config from '../../../../config';
import { batchDelete, createACCOUNT, getAllACCOUNT, updateACCOUNT } from '../../../actions/AccountAction';
import AvatarInTable from '../../../components/AvatarInTable';
import StatusButton from '../../../components/StatusButton';
import TableActionBar from '../../../components/TableActionBar';
import AddAgent from './AddAgent';
const ACCOUNT_IMAGE_URL = config.URL_ASSET;
const DEFAULT_IMAGE_URL = ACCOUNT_IMAGE_URL + "/backup.png";
class ListAgent extends Component {
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
            addAgentState: false,
            selectedRowKeys: [],
            isSubmiting: false,
            current_account: null,
            edit: false
        }
    }
    componentDidMount() {
        this.props.getAllAgent(this.state.filter, 'agent')
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
        }, () => this.props.getAllAgent(this.state.filter, 'agent'))
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
        }, () => this.props.getAllAgent(this.state.filter, 'agent'))
    }
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };
    onAddAccount = () => {
        this.setState({ addAgentState: true });
    };
    onEditAccount(account) {
        this.setState({ addAgentState: true, current_account: account, edit: true });
    };
    onAccountClose = () => {
        this.setState({ addAgentState: false, current_account: null, isSubmiting: false, edit: false });
    };
    onSaveAccount = async (data, id) => {
        await this.setState({
            ...this.state,
            isSubmiting: true
        })
        if (this.state.edit) {
            var dataSubmit = { ...data, id: id }
            await this.props.updateAccount(dataSubmit).then(res => {
                this.setState({
                    ...this.state,
                    isSubmiting: false,
                    addAgentState: false,
                    current_account: null,
                    edit: false
                })
            }).catch(err => {
                this.setState({
                    ...this.state,
                    isSubmiting: false,
                })
            });
        }
        else await this.props.createRegister(data).then(res => {
            this.setState({
                ...this.state,
                isSubmiting: false,
                addAgentState: false,
                current_account: null,
                edit: false
            })
        }).catch(err => {
            this.setState({
                ...this.state,
                isSubmiting: false,

            })
        });
    };
    onRefresh() {
        this.props.getAllAgent(this.state.filter, 'agent');
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
        }, () => this.props.getAllAgent(this.state.filter, 'agent'))

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
            }, () => this.props.getAllAgent(this.state.filter, 'agent'))

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
            }, () => this.props.getAllAgent(this.state.filter, 'agent'))
    }
    render() {
        const { selectedRowKeys } = this.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const columns = [
            {
                key: 'image',
                title: <IntlMessages id="global.avatar" />,
                dataIndex: 'image',
                render: (text, record) => (
                    record.image ?
                        <AvatarInTable  src={ACCOUNT_IMAGE_URL + record.image}
                        defaul={record.image === '//logo3.png' ? 1 : 0}
                        title={record.firstname ? `${record.firstname}${record.lastname}`:`panda user`}
                         alt={`${record.firstname} ${record.lastname}`}></AvatarInTable>
                        : 
                        <AvatarInTable  src={DEFAULT_IMAGE_URL}  alt={`panda user`} title={record.firstname ? `${record.firstname}${record.lastname}`:`panda user`}></AvatarInTable>
                )
            },
            {
                title: <IntlMessages id='global.status' />,
                dataIndex: 'status',
                render: (text, record) => (
                    <StatusButton data_id={record.id} status={record.status} table='customer' />
                )
            },
            {
                title: <IntlMessages id='global.email' />,
                dataIndex: 'email',
                key: 'email',
                render: (text, record) => (
                    <b style={{ color: "blue", cursor: "pointer" }} onClick={() => this.onEditAccount(record)}>{record.email}</b>
                )
            },
            {
                title: <IntlMessages id="global.firstname" />,
                dataIndex: 'firstname',
                key: 'firstname',
                sorter: true
            },
            {
                title: <IntlMessages id="global.lastname" />,
                dataIndex: 'lastname',
                key: 'lastname',
                sorter: true
            },
            {
                title: <IntlMessages id="global.mobile" />,
                dataIndex: 'mobile',
                key: 'mobile',
                sorter: true

            },
            {
                title: <IntlMessages id="global.city" />,
                dataIndex: 'city',

            },
            {
                title: <IntlMessages id="global.created" />,
                dataIndex: 'created_at',
                key: 'created_at',
                className: 'center-column',
                render: (text, record) => (
                    <React.Fragment>
                        <div>
                            {moment(record.created_at).format('DD/MM/YYYY')}
                        </div>
                        <div>
                            {moment(record.created_at).format('HH:mm')}
                        </div>
                    </React.Fragment>
                ),
            },
            {
                title: <IntlMessages id='global.id' />,
                dataIndex: 'id',
                key: 'id',
                sorter: true
            },
        ];

        const { listAgent, paging } = this.props;
        return (
            <React.Fragment>
                <div className="formelements-wrapper">
                    <PageTitleBar
                        title={<IntlMessages id="sidebar.agent" />}
                        match={this.props.match}
                    />
                    <div className="row">
                        <RctCollapsibleCard colClasses='col-12'>
                            <TableActionBar
                                onAdd={() => this.onAddAccount()}
                                onDelete={() => this.onDelete()}
                                onRefresh={() => this.onRefresh()}
                                isDisabled={!hasSelected}
                                rows={this.state.selectedRowKeys}
                                table='register'
                                isShowPublishButtons={true}
                                showFilter={false}
                                onFilter={this.filter}
                            >
                                {hasSelected ? <p className='ml-10' style={{ display: 'inline-block' }}>Selected {selectedRowKeys.length} {selectedRowKeys.length === 1 ? 'item' : 'items'} </p> : ''}

                            </TableActionBar>


                            <Table
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={listAgent}
                                tableLayout="auto"
                                rowKey="id"
                                size='middle'
                                pagination={{
                                    pageSizeOptions: ['10', '20', '30'],
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

                <AddAgent
                    open={this.state.addAgentState}
                    onSaveAccount={this.onSaveAccount}
                    onAccountClose={this.onAccountClose}
                    loading={this.state.isSubmiting}
                    edit={this.state.edit}
                    account={this.state.current_account}
                />
            </React.Fragment >

        );
    }
}
const mapStateToProps = (state) => {
    return {
        listAgent: state.account.listAccount,
        paging: state.account.paging
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllAgent: (filter, data) => dispatch(getAllACCOUNT(filter, data)),
        createRegister: (account) => dispatch(createACCOUNT(account)),
        updateAccount: (account) => dispatch(updateACCOUNT(account)),
        delete: (data) => dispatch(batchDelete(data))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListAgent));
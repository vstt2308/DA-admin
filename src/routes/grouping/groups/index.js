
import { Table } from 'antd';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IntlMessages from 'Util/IntlMessages';
import { createAGroup, getAllGroups, updateGroup } from '../../../actions/GroupActions';
import TableActionBar from '../../../components/TableActionBar';
import AddGroup from './AddGroup';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";


class ListGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            addGroupState: false,
            isSubmiting: false,
            current_group: null,
            edit: false
        }
    }
    componentDidMount() {
        this.props.getAllGroup()
    }
    onAddGroup = () => {
        this.setState({ addGroupState: true });
    };
    onEditGroup(group) {
        this.setState({ addGroupState: true, current_group: group, edit: true });
    };
    onGroupClose = () => {
        this.setState({ addGroupState: false, current_group: null, isSubmiting: false, edit: false });
    };
    onSaveGroup = async (data, id) => {
        await this.setState({
            ...this.state,
            isSubmiting: true
        })
        if (this.state.edit) {
            var dataSubmit = { ...data, id: id }
            await this.props.updateGroup(dataSubmit).then(res => {
                this.setState({
                    ...this.state,
                    isSubmiting: false,
                    addGroupState: false,
                    current_group: null,
                    edit: false
                })
            }).catch(err => {
                this.setState({
                    ...this.state,
                    isSubmiting: false,
                })
            });
        }
        else await this.props.createGroup(data).then(res => {
            this.setState({
                ...this.state,
                isSubmiting: false,
                addGroupState: false,
                current_group: null,
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
        this.props.getAllGroup();
    }

    render() {
        const columns = [
            {
                key: 'title',
                title: <IntlMessages id="global.title" />,
                dataIndex: 'title',
                render:(text, record)=>(
                    <p style={{ cursor: "pointer", color: "blue" }} onClick={() => this.onEditGroup(record)}>{record.title}</p>
                )
            },
            {
                key: 'slug',
                title: <IntlMessages id="global.slug" />,
                dataIndex: 'slug',
            },
            {
                title: <IntlMessages id="global.created" />,
                dataIndex: 'created_at',
                key: 'created_at',
                render:(text,record)=>(
                    <span>
                    {moment(record.created_at).format('DD/MM/YYYY')}
                </span>
                )
            },
            {
                title: <IntlMessages id="global.id" />,
                dataIndex: 'id',
                key: 'id',
                sorter: true
            },
        ];

        const { listGroup } = this.props;
      
        return (
            <React.Fragment>
                <div className="formelements-wrapper">
                    <PageTitleBar
                        title={<IntlMessages id="sidebar.groups" />}
                        match={this.props.match}
                    />
                    <div className="row">
                        <RctCollapsibleCard colClasses='col-12'>
                            <TableActionBar
                                onAdd={() => this.onAddGroup()}
                                onDelete={false}
                                onRefresh={() => this.onRefresh()}
                                isDisabled={null}
                                rows={null}
                                table='group'
                                isShowPublishButtons={false}
                                isShowDeleteButton={false}
                                showFilter={false}
                                textSearch={false}
                            >

                            </TableActionBar>


                            <Table
                                rowSelection={null}
                                columns={columns}
                                dataSource={listGroup}
                                tableLayout="auto"
                                rowKey="id"
                                pagination={false}

                            />

                        </RctCollapsibleCard>
                    </div>
                </div>

                <AddGroup
                    open={this.state.addGroupState}
                    onSaveGroup={this.onSaveGroup}
                    onGroupClose={this.onGroupClose}
                    loading={this.state.isSubmiting}
                    edit={this.state.edit}
                    group={this.state.current_group}
                />
            </React.Fragment >

        );
    }
}
const mapStateToProps = (state) => {
    return {
        listGroup: state.group.listGroup,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllGroup: () => dispatch(getAllGroups()),
        createGroup: (data) => dispatch(createAGroup(data)),
        updateGroup: (data) => dispatch(updateGroup(data)),

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListGroup));
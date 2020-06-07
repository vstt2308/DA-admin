import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view';
import IntlMessages from 'Util/IntlMessages';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import { Button, Modal, Divider, Row, Col } from 'antd';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
// actions
import { getConfig, setConfig, resetConfig } from '../../../actions/ConfigActions';
const confirm = Modal.confirm;

class Config extends Component {
    state = {
        config: {}
    }

    componentDidMount() {
        this.props.getConfig().then((config) => {
            this.setState({config: config})
        })
    }

    onEditConfig(event) {
        this.setState({ config: event.updated_src });
    }

    onAddConfig(event) { }

    onDeleteConfig(event) {
        this.setState({ config: event.updated_src });
    }

    onUpdate() {
        confirm({
            title: 'Do you want to update configs?',
            okText: 'Yes',
            okType: 'danger',
            onOk: () => {
                this.props.setConfig(this.state.config);
            },
            onCancel() { },
        })
    }

    render() {
        var { config } = this.state;

        return (
            <div className="formelements-wrapper">
                <PageTitleBar title={<IntlMessages id="sidebar.config" />} match={this.props.match} />
                <div className="row">
                    <RctCollapsibleCard colClasses='col-12'>
                        <Row type="flex" align="middle" >
                            <Col sm={{ span: 18 }} xs={{ span: 24 }} >
                                <Button type="primary" onClick={() => this.onUpdate()}>
                                    <IntlMessages id="global.update" />
                                </Button>
                                <Divider type="vertical" />
                                <Button type="default" onClick={() => this.props.resetConfig()} >
                                    <IntlMessages id="global.reset" />
                                </Button>
                            </Col>
                        </Row>
                        <div className="mt-4">
                            <ReactJson
                                src={config}
                                onAdd={(e) => this.onAddConfig(e)}
                                onEdit={(e) => this.onEditConfig(e)}
                                onDelete={(e) => this.onDeleteConfig(e)}
                                iconStyle="circle"
                                displayObjectSize={false}
                                displayDataTypes={false}
                            />
                        </div>
                    </RctCollapsibleCard>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        config: state.config
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getConfig: () => dispatch(getConfig()),
        setConfig: (data) => dispatch(setConfig(data)),
        resetConfig: () => dispatch(resetConfig())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);
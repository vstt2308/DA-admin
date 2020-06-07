import React, { Component } from 'react';
import IntlMessages from 'Util/IntlMessages';
import PropTypes from 'prop-types';

import {
    Form,
    Input,
    Row,
    Col,
    Button,
    Modal,
} from 'antd';
import UploadImage from '../../components/Elements/UploadImage';
import DragImage from '../../components/DragImage';



class UploadFile extends Component {

    static propTypes = {
        onSave: PropTypes.func,
        open: PropTypes.bool,
        onClose: PropTypes.func
    }

    static defaultProps = {
        open: false,
        onSave: () => { },
        loading: false,
        data: []
    }

    onChange = (data) => {
        this.setState({
            ...this.state,
            data: data
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        const data = this.state.data;
        let arr = data[0].data.split(",");
        let imgSrc = arr[1];
        if (data.length) {
            let file = {
                file: imgSrc,
                path: this.props.folderbase,
                name: data[0].name
            }
            this.props.onSave(file);
        }
        else this.props.onClose();
    };


    render() {
        const { onClose, open, loading } = this.props;
        return (
            <React.Fragment >
                {open ?
                    <Modal
                        title={<IntlMessages id="fileManager.uploadfile" />}
                        toggle={onClose} visible={open}
                        closable={false}
                        onCancel={onClose}
                        footer={false}
                        width="50%"
                    >
                        <UploadImage onChangeData={this.onChange}></UploadImage>
                        {/* <DragImage></DragImage> */}
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button style={{ marginLeft: 8 }} type="danger" ghost onClick={onClose}>
                                    Cancel
                            </Button>
                                <Button type="primary" style={{ marginLeft: 8 }} htmlType="submit" onClick={this.handleSubmit} loading={loading}>
                                    Submit
                            </Button>
                            </Col>
                        </Row>
                    </Modal>
                    : null}
            </React.Fragment>
        )
    }
}


export default UploadFile;

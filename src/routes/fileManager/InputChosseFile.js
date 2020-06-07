import React, { Component } from 'react';
import IntlMessages from 'Util/IntlMessages';
import config from '../../../config';
import {
    Form,
    Input,
    Row,
    Col,
    Button,
    Modal,
    Icon
} from 'antd';
import ChosseFile from './ChosseFile';
import ListImagePreview from '../../components/Elements/ListImagePreview';
const { URL_ASSET } = config;


class InputChosseFile extends Component {

    static defaultProps = {
        width: "50%",
        style: {
            right: 0
        },
        zIndex: 1000,
        onChange: () => { },
        limit: 1,
        defautValue: []
    }

    state = {
        open: false,
        itemSelected: [],
        isremove: false,
        select: [],
        folderbase: "/"
    }
    componentDidMount() {
        if ((this.props.defautValue !== this.state.itemSelected) && this.props.defautValue.length) {
            this.setState({
                ...this.state,
                itemSelected: this.props.defautValue
            })
        }
    }


    onOpen(open) {
        this.setState({
            ...this.state,
            open: open
        })
    }

    setSelect() {
        this.setState({
            ...this.state,
            itemSelected: this.state.itemSelected.concat(this.state.select),
            select: [],
            open: false
        }, () => this.props.onChange(this.state.itemSelected))
    }

    onChangeSelect = (data, folderbase) => {
        const { folders, docs, videos, images } = data;
        let arr = folders.concat(docs).concat(videos).concat(images);
        this.setState({
            ...this.state,
            select: arr,
            folderbase: folderbase
        })
    }

    removeImage = (image) => {
        let arr = [...this.state.itemSelected];
        let newArr = arr.filter(item => item.path_relative.toString() !== image.path_relative.toString());
        this.setState({
            ...this.state,
            itemSelected: newArr
        }, () => this.props.onChange(this.state.itemSelected))
    }

    createDataImage(itemSelected) {
        let newArr = itemSelected.map(item => {
            return {
                ...item,
                url: URL_ASSET + item.path_relative
            }
        });
        return newArr;
    }

    render() {
        
        const { open, itemSelected } = this.state;
        var dataImg = this.createDataImage(itemSelected);
        return (
            <React.Fragment >
                <ListImagePreview data={dataImg} removeImage={this.removeImage}></ListImagePreview>
                <Button onClick={() => this.onOpen(true)} >
                    <Icon type="upload" />
                    Select Image
                </Button>
                <Modal
                    title={<IntlMessages id="fileManager.uploadfile" />}
                    toggle={() => this.onOpen(false)} visible={open}
                    closable={true}
                    onCancel={() => this.onOpen(false)}
                    onOk={() => this.setSelect()}
                    width={this.props.width}
                    style={this.props.style}
                    zIndex={this.props.zIndex}
                >
                    {open ?
                        <ChosseFile onChangeSelect={this.onChangeSelect} folderbase={this.state.folderbase}></ChosseFile>
                        : null}
                </Modal>
            </React.Fragment>
        )
    }
}


export default InputChosseFile;

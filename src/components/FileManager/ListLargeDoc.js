import React from 'react';
import { Row } from 'antd';
import LargeDoc from './LargeDoc';

class ListLargeDoc extends React.Component {
    static defaultProps = {
        data: [],
        checkAll: false,
        onChangeChecked: () => { },
        indeterminate: false
    }

    state = {
        checkedItem: [],
        checkAll: false
    }

    static getDerivedStateFromProps(props, state) {
        if (props.checkAll !== state.checkAll) {
            if (props.indeterminate === false) {
                return {
                    ...state,
                    checkAll: props.checkAll,
                    checkedItem: props.checkAll ? props.data : []
                }
            }
            else return {
                ...state,
                checkAll: props.checkAll
            }
        }
        return null;
    }

    onChange = (item, checked) => {
        var arr = [...this.state.checkedItem];
        if (checked) {
            arr.push(item);
        }
        else arr = arr.filter(e => e.name !== item.name);
        this.setState({
            ...this.state,
            checkedItem: arr
        }, () => this.props.onChangeChecked('doc', arr))
    }

    showItem(data) {
        return data.map((item, index) => {
            return (
                <LargeDoc
                    checkAll={this.props.checkAll}
                    key={index} item={item}
                    onChange={this.onChange}
                    folderbase={this.props.folderbase}
                    indeterminate={this.props.indeterminate}
                ></LargeDoc>)
        })
    }

    render() {
        const { data } = this.props;
        return (
            <Row type="flex" justify="start" align="middle" >
                {this.showItem(data)}
            </Row>
        )
    }
}

export default ListLargeDoc;
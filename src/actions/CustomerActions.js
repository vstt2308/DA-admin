import {
    GET_ALL_CUSTOMER,
    GET_CUSTOMER_DETAIL,
    ADD_A_CUSTOMER,
    UPDATE_A_CUSTOMER_IN_LIST,
    UPDATE_CUSTOMER,
    DELETE_A_CUSTOMER_IN_LIST,
    DELETE_CUSTOMER
} from './types';
import api from '../api';
import qs from 'qs';
import { NotificationManager } from 'react-notifications';

export const getAllCustomer = (filter = {}) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get('/customer/list', {
            params: {...filter},
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" });  
                            }
        }).then(res => {
            resolve(res.data);
            dispatch({ type: GET_ALL_CUSTOMER, payload: res.data.data });
        })
            .catch(error => {
                reject(error.response.data);
                NotificationManager.error(error.response.data.msg);
                console.log(error);
            })
    })
}

export const createACustomer = (customer) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/customer/save', customer).then(res => {
            console.log(res.data);
            dispatch({ type: ADD_A_CUSTOMER, payload: res.data.data });
            resolve(res.data);
            NotificationManager.success(res.data.msg);
        })
            .catch(error => {
                reject(error.response.data);
                NotificationManager.error(error.response.data.msg);
                console.log(error.response);
            })
    })
}

export const updateACustomer = (customer, id) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/customer/save', customer).then(res => {
            console.log(res.data);
            dispatch({ type: UPDATE_A_CUSTOMER_IN_LIST, payload: res.data.data, id });
            resolve(res.data);
            NotificationManager.success(res.data.msg);
        })
            .catch(error => {
                reject(error.response.data);
                NotificationManager.error(error.response.data.message);
                console.log(error.response);
            })
    })
}

export const getCustomerDetail = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/customer/load/${id}`).then(res => {
            dispatch({ tyoe: GET_CUSTOMER_DETAIL, payload: res.data.data });
            resolve(res.data);
            NotificationManager.successs(res.data.msg);
        })
            .catch(error => {
                reject(error.response.data);
                NotificationManager.error(error.response.data.message);
                console.log(error.response);
            })
    })
}

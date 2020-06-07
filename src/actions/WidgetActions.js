import { NotificationManager } from 'react-notifications';
import {
    GET_ALL_WIDGETS,
    ADD_A_WIDGET,
    UPDATE_WIDGET,
    DELETE_WIDGET,
    GET_A_WIDGET
} from 'Actions/types';
import qs from 'qs';
import api from '../api';

export const getAllWidgets = (filter = {}) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get('/widgets/list', {
            params: { ...filter },
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" });
            }
        }).then(res => {
            console.log(res.data)
            dispatch({ type: GET_ALL_WIDGETS, payload: res.data.data, message: res.data.msg });
            resolve(true)
        }).catch(error => {
            reject(error);
            console.log(error)
            // NotificationManager.error(error);
        })
    })
}

export const getWidgetDetail = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/widgets/load/${id}`).then(res => {
            dispatch({ type: GET_A_WIDGET, payload: res.data.data });
            resolve(true)
        }).catch(error => {
            reject(error);
            NotificationManager.error(error.response.data.msg);
        })
    })
}

export const addWidget = (data) => dispatch => {
    console.log("data", data)
    return new Promise((resolve, reject) => {
        return api.post('/widgets/save', data).then(res => {
            dispatch({ type: ADD_A_WIDGET, payload: res.data.data});
            NotificationManager.success(res.data.msg);
            resolve(true)
        }).catch(error => {
            reject(error);
            console.log(error.response)
            NotificationManager.error(error.response.data.msg);
        })
    })
}

export const updateWidget = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/widgets/save', data).then(res => {
            dispatch({ type: UPDATE_WIDGET, payload: res.data.data});
            NotificationManager.success(res.data.msg);
            resolve(true)
        }).catch(error => {
            reject(error);
            NotificationManager.error(error.response.data.msg);
        })
    })
}

export const deleteWidget = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post('/widgets/delete',  data).then(res => {
            dispatch({ type: DELETE_WIDGET, payload: data.id });
            NotificationManager.success(res.data.msg);
            resolve(true)
        }).catch(error => {
            reject(error);
            NotificationManager.error(error.response.data.msg);
        })
    })
}
import {
    GET_ALL_HOTEL,
    ADD_A_HOTEL,
    UPDATE_HOTEL,
    DELETE_HOTEL,
} from './types';
import api from '../api';
import qs from 'qs';
import { NotificationManager } from 'react-notifications';

export const getAllHotel = (filter = {}) => dispatch => {

    return new Promise((resolve, reject) => {
        api.get('/hotel/list', {
            params: { ...filter },
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" });
            }
        }).then(res => {
            resolve(res.data);
            dispatch({ type: GET_ALL_HOTEL, payload: res.data.data });

        })
            .catch(error => {
                reject(error.response.data);
                NotificationManager.error(error.response.data.msg);

            })
    })
}
export const addHotel = (hotel) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/hotel/save', hotel).then(res => {
            dispatch({ type: ADD_A_HOTEL, payload: res.data.data });
            NotificationManager.success(res.data.msg);
            resolve(res.data);
        }).catch(error => {
            reject(error.response.data);
            NotificationManager.error(error.response.data.msg)
        })
    })
}

export const updateHotel = (hotel) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/hotel/save', hotel).then(response => {
            dispatch({ type: UPDATE_HOTEL, payload: response.data.data });
            NotificationManager.success(response.data.msg);
            resolve(response.data);
        }).catch(error => {
            NotificationManager.error(error.response.data.msg);
            reject(error.response.data);
            console.log(error.response.data.msg);
            
        })
    })
}
export const deleteHotel = (ids) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/hotel/delete', ids).then(res => {
            dispatch({ type: DELETE_HOTEL, payload: res.data.data });
            NotificationManager.success('Delete success');
            resolve(res.data);
        }).catch(error => {
            NotificationManager.error('Delete false');
            reject(error);
        })
    })
}

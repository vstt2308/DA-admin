import { ADD_A_COUNTRY, DELETE_COUNTRY, GET_ALL_COUNTRY, UPDATE_COUNTRY } from 'Actions/types';
import qs from 'qs';
import { NotificationManager } from 'react-notifications';
import api from '../api';

export const getAllCountry = (filter = {}) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get('/country/list', {
            params: { ...filter },
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" });
            }
        }).then(res => {
            dispatch({ type: GET_ALL_COUNTRY, payload: res.data.data });
            resolve(res.data);
        }).catch(error => {
            reject(error);
            NotificationManager.error(error.response.data.msg);
        })
    })
}

export const addCountry = (country) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/country/save', country).then(res => {
            dispatch({ type: ADD_A_COUNTRY, payload: res.data.data });
            resolve(res.data);
        }).catch(error => {
            reject(error.response.data);
            NotificationManager.error(error.response.data.msg)
        })
    })
}

export const updateCountry = (country) => dispatch => {
    console.log('test',country);
    
    return new Promise((resolve, reject) => {
        api.post('/country/save', country).then(response => {
            dispatch({ type: UPDATE_COUNTRY, payload: response.data.data });
            NotificationManager.success(response.data.msg);
            resolve(response.data);
        }).catch(error => {
            NotificationManager.error(error.response.data.msg);
            reject(error.response.data);
        })
    })
}
export const batchDelete = (ids) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/country/delete', ids).then(res => {
            dispatch({ type: DELETE_COUNTRY, payload: res.data.data });
            NotificationManager.success('Delete success');
            resolve(res.data);
        }).catch(error => {
            NotificationManager.error('Delete false');
            reject(error);
        })
    })
}


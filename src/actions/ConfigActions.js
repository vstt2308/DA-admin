import {
    GET_CONFIG,
    SET_CONFIG,
    RESET_CONFIG
} from './types';
import api from '../api';
import { NotificationManager } from 'react-notifications';

export const getConfig = () => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/common/getconfig').then(res => {
            dispatch({type: GET_CONFIG, payload: res.data.data});
            NotificationManager.success(res.data.msg);
            resolve(res.data.data);
        }).catch(err => {
            reject(err);
            console.log(err);
        })
    })
}

export const setConfig = (data) => dispatch => {
    return api.post('/common/setconfig', {config: data}).then(res => {
        dispatch({type: SET_CONFIG, payload: res.data.data});
        NotificationManager.success(res.data.msg)
    }).catch(err => {
        // NotificationManager.err()
        console.log(err);
    })
}

export const resetConfig = () => dispatch => {
    dispatch({type: RESET_CONFIG});
}
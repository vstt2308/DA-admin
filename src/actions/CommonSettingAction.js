import {
    GET_COMMON_APP_SETTING,
    SET_COMMON_APP_SETTING,
    RESET_COMMON_APP_SETTING,
} from './types';
import api from '../api';
import { NotificationManager } from 'react-notifications';

export const getCommonAppSetting = () => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get('/common/get_app_setting').then(res => {
            dispatch({type: GET_COMMON_APP_SETTING, payload: res.data.data});
            NotificationManager.success(res.data.msg);
            resolve(res.data.data);
        }).catch(err => {
            reject(err);
            console.log(err);
        })
    })
}

export const setCommonAppSetting = (data) => dispatch => {
    return api.post('/common/set_app_setting', {config: data}).then(res => {
        dispatch({type: SET_COMMON_APP_SETTING, payload: res.data.data});
        NotificationManager.success(res.data.msg)
    }).catch(err => {
        // NotificationManager.err()
        console.log(err);
    })
}


export const resetCommonAppSetting = () => dispatch => {
    dispatch({type: RESET_COMMON_APP_SETTING});
}
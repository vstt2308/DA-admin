import {
    GET_LIST_FILE_AND_FOLDER,
    CREATE_FOLDER,
    UPLOAD_FILE,
    UPLOAD_IMG,
    DELETE_FOLDER_FILE
} from './types';
import api from '../api';
import { NotificationManager } from 'react-notifications';

export const getAll = (filter = "", currentfolder) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/media/list?folder=${filter}`).then(res => {
            resolve(res.data);
            dispatch({ type: GET_LIST_FILE_AND_FOLDER, payload: res.data.data, currentfolder });
        })
            .catch(error => {
                reject(error.response.data);
                NotificationManager.error(error.response.data.msg);
            })
    })
}

export const add = (foldername = "", folderbase = "/") => dispatch => {
    return new Promise((resolve, reject) => {
        api.post(`/media/createfolder?foldername=${foldername}&folderbase=${folderbase}`).then(res => {
            resolve(res.data);
            dispatch({ type: CREATE_FOLDER, payload: res.data.data });
            NotificationManager.success(res.data.msg)
        })
            .catch(error => {
                reject(error.response);
                console.log(error.response)
                NotificationManager.error("error when create folder");
            })
    })
}


export const del = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/media/deletefile', data).then(res => {
            resolve(res.data);
            dispatch({ type: DELETE_FOLDER_FILE, payload: res.data.data });
            NotificationManager.success(res.data.msg);
        })
            .catch(error => {
                reject(error.response.data);
                NotificationManager.error("error when delete");
            })
    })
}

export const upload = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/media/uploadFile', data).then(res => {
            resolve(res.data);
            dispatch({ type: UPLOAD_FILE, payload: res.data.data });
            NotificationManager.success(res.data.msg);
        })
            .catch(error => {
                console.log(error.response)
                reject(error.response);
                NotificationManager.error("error when upload");
            })
    })
}


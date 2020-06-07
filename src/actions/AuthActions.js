import { NotificationManager } from 'react-notifications';
import {
   LOGIN_USER,
   LOGIN_USER_SUCCESS,
   LOGIN_USER_ERROR,
   LOGOUT_USER,
   TOKEN_EXPIRED,
   CHECK_TOKEN_SUCCESS
} from 'Actions/types';
import api from '../api';
import { setCookie, removeCookie, getCookie } from '../helpers/session';
import { CHECK_TOKEN_ERROR } from './types';

export const login = (data) => dispatch => {
   return new Promise((resolve, reject) => {

      
      dispatch({ type: LOGIN_USER });
      return api.post('/login', data)
         .then(res => {
            setCookie('token', res.data.data.token, 7);
            // localStorage.setItem('token', res.data.data.token);
            dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data.data, message: res.data.msg });
            NotificationManager.success(res.data.msg);
            resolve(true)
         })
         .catch(error => {
            // reject(error);
            NotificationManager.error('Email or password is incorrect ');
            dispatch({ type: LOGIN_USER_ERROR, payload: error.response.data, message: error.response.data.msg });
         })
   })
}
export const checkToken = (data) => dispatch => {
   return new Promise((resolve, reject) => {
      return api.get('/customer/loadByToken').then(response => {
         dispatch({ type: CHECK_TOKEN_SUCCESS, payload: response.data.data, message: response.data.msg })
         resolve(response.data.data)
      }).catch(
         error => {
            reject(error.response);
            dispatch({ type: CHECK_TOKEN_ERROR, payload: error.response.data, message: error.response.data.msg })
            NotificationManager.error('token expired');
            console.log(error.response);
         }
      )
   })
}

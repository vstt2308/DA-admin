import {
  GET_ALL_ACCOUNT,
  ADD_A_ACCOUNT,
  UPDATE_ACCOUNT,
  DELETE_ACCOUNT,
  ACCOUNT_WISHLIST,
  GET_ALL_ACCOUNT_WITHOUT_PAGINATE
} from "./types";
import api from "../api";
import qs from "qs";
import { NotificationManager } from "react-notifications";

export const getAllACCOUNT = (filter = {}, type) => dispatch => {
  return new Promise((resolve, reject) => {
    api
      .get(`/customer/list/${type}`, {
        params: { ...filter },
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        }
      })
      .then(res => {
        resolve(res.data);
        dispatch({ type: GET_ALL_ACCOUNT, payload: res.data.data });
      })
      .catch(error => {
        reject(error);
        NotificationManager.error('Failed!');
      });
  });
};

export const getAllAccountWithoutPaging = (filter = {}, type) => dispatch => {
  
  
  return new Promise((resolve, reject) => {
    api
      .get(`/customer/list/${type}`, {
        params: { paging: 0 },
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        }
      })
      .then(res => {
        
        dispatch({
          type: GET_ALL_ACCOUNT_WITHOUT_PAGINATE,
          payload: res.data.data
        });
        resolve(res.data);
      })
      .catch(error => {
        reject(error.response.data);
        // NotificationManager.error(error.response.data.msg);
      });
  });
};

export const createACCOUNT = ACCOUNT => dispatch => {
  return new Promise((resolve, reject) => {
    api
      .post("/customer/save", ACCOUNT)
      .then(res => {
        resolve(res.data);
        dispatch({ type: ADD_A_ACCOUNT, payload: res.data.data });
        NotificationManager.success(res.data.msg);
      })
      .catch(error => {
        reject(error.response);
        NotificationManager.error(error.response.data.msg);
      });
  });
};
export const updateACCOUNT = ACCOUNTupdate => dispatch => { 
  return new Promise((resolve, reject) => {
    api
      .post("/customer/save", ACCOUNTupdate)
      .then(res => {
        resolve(res.data);
        dispatch({ type: UPDATE_ACCOUNT, payload: res.data.data });
        NotificationManager.success(res.data.msg);
       
        
      })
      .catch(error => {
        reject(error.response);
        NotificationManager.error(error.response.data.msg);
      });
  });
};

export const batchDelete = ids => dispatch => {
  return new Promise((resolve, reject) => {
    api
      .post("/customer/delete", ids)
      .then(res => {
        dispatch({ type: DELETE_ACCOUNT, payload: res.data.data });
        NotificationManager.success("Deleted success");
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const updatePermissionACCOUNT = update => dispatch => {
  return new Promise((resolve, reject) => {
    api
      .post("/customer/permission", update)
      .then(res => {
        resolve(res.data);
        dispatch({ type: UPDATE_ACCOUNT, payload: res.data.data });
        NotificationManager.success(res.data.msg);
      })
      .catch(error => {
        reject(error.response);
        // NotificationManager.error(error.response);
      });
  });
};
export const getAllWishListAccount = (id,filter = {}) => dispatch => {
  return new Promise((resolve, reject) => {
    api
      .get(`/tour/mywishlist?user_id=${id}`, {
        params: { ...filter },
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        }
      })
      .then(res => {
        resolve(res.data);
        
        dispatch({ type: ACCOUNT_WISHLIST, payload: res.data.data });
      })
      .catch(error => {
        reject(error.response.data);
        NotificationManager.error(error.response.data.msg);
      });
  });
};


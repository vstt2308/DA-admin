import {
  GET_ALL_ORDER_TOUR,
  GET_ALL_ORDER_VOUCHER,
  ADD_ORDER_TOUR,
  ADD_ORDER_VOUCHER,
  GET_DETAIL_ORDER_TOUR,
  UPDATE_PASSENGER,
  DELETE_ORDER_TOUR,
  UPDATE_ORDER_TOUR,
  UPDATE_ORDER_VOUCHER,
  DELETE_ORDER_VOUCHER,
  INQUIRY_LIST_ASSIGN,
} from "./types";
import api from "../api";
import qs from "qs";
import { NotificationManager } from "react-notifications";

export const getAllOrderTour = (filter) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api
      .get("/orders/list", {
        params: { ...filter },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      })
      .then((res) => {
        resolve(res.data);
        dispatch({ type: GET_ALL_ORDER_TOUR, payload: res.data.data });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAllOrderVoucher = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api
      .post(`/orders/voucher/list/${id}`, {
        params: {},
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      })
      .then((res) => {
        console.log(res.data);

        resolve(res.data);
        dispatch({ type: GET_ALL_ORDER_VOUCHER, payload: res.data.data });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getDetailOrderTour = (filter, id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api
      .get(`/orders/load/${id}`, {
        params: { ...filter },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      })
      .then((res) => {
        resolve(res.data);
        dispatch({ type: GET_DETAIL_ORDER_TOUR, payload: res.data.data });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createAOrderTour = (orders) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api
      .post("/orders/save", orders)
      .then((res) => {
        dispatch({ type: ADD_ORDER_TOUR, payload: res.data.data });
        NotificationManager.success("Success create");
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
        NotificationManager.error(error.response.data.msg);
      });
  });
};

export const createOrderVoucher = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api
      .post("/orders/voucher/save", data)
      .then((res) => {
        dispatch({ type: ADD_ORDER_VOUCHER, payload: res.data.data });
        NotificationManager.success("Created!");
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
        NotificationManager.error("Failed!");
      });
  });
};

export const updateOrderVoucher = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api
      .post("/orders/voucher/save", data)
      .then((res) => {
        dispatch({ type: UPDATE_ORDER_VOUCHER, payload: res.data.data });
        NotificationManager.success("Updated!");
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
        NotificationManager.error("Failed!");
      });
  });
};

export const updatePassenger = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api
      .post("/passenger/save", data)
      .then((response) => {
        dispatch({ type: UPDATE_PASSENGER, payload: response.data.data });
        NotificationManager.success(response.data.msg);
        resolve(response.data);
      })
      .catch((error) => {
        NotificationManager.error(error.response.data.msg);
        reject(error.response.data);
      });
  });
};

export const batchDelete = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api
      .post("/orders/delete", id)
      .then((res) => {
        dispatch({ type: DELETE_ORDER_TOUR, payload: res.data.data });
        resolve(res.data);
        NotificationManager.success("Delete Success");
      })
      .catch((error) => {
        reject(error);
        NotificationManager.error(error);
      });
  });
};

export const updateOrderTour = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api
      .post("/orders/save", data)
      .then((response) => {
        dispatch({ type: UPDATE_ORDER_TOUR, payload: response.data.data });
        NotificationManager.success(response.data.msg);
        resolve(response.data);
      })
      .catch((error) => {
        NotificationManager.error(error.response.data.msg);
        reject(error.response.data);
      });
  });
};

export const deleteVoucher = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api
      .post("/orders/voucher/delete", id)
      .then((res) => {
        dispatch({ type: DELETE_ORDER_VOUCHER, payload: res.data.data });
        resolve(res.data);
        NotificationManager.success("Deleted!");
      })
      .catch((error) => {
        reject(error);
        NotificationManager.error(error);
      });
  });
};

export const inquiryAssign = (filter) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api
      .get("/inquiry/listAssign", {
        params: { ...filter },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      })
      .then((res) => {
        resolve(res.data);
        dispatch({ type: INQUIRY_LIST_ASSIGN, payload: res.data.data });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

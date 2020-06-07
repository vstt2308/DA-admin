import {
    GET_CONFIG,
    SET_CONFIG,
    RESET_CONFIG
} from 'Actions/types';

const INIT_STATE = {}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_CONFIG: {
            return action.payload;
        }
        case SET_CONFIG: {
            return action.payload;
        }
        case RESET_CONFIG: {
            return {...state}
        }
        default: {
            return {...state}
        }
    }
}
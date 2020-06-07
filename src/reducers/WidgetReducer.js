import {
    GET_ALL_WIDGETS,
    ADD_A_WIDGET,
    UPDATE_WIDGET,
    DELETE_WIDGET,
    GET_A_WIDGET
} from 'Actions/types';

const INIT_STATE = {
    widgets: [],
    currentWidget: {},
    paging: {
        count: 0,
        totalpage: 1,
        perpage: 1,
        page: 1
    },
};

function findIndex(arrID, id) {
    if (arrID.length) {
        for (let i = 0; i < arrID.length; i++) {
            if (arrID[i].id.toString() === id.toString()) return i;
        }
    }
    return -1;
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_WIDGETS: {
            return {
                ...state,
                widgets: action.payload.list,
                paging: action.payload.paging
            }
        }
        case ADD_A_WIDGET: {
            return {
                ...state,
                widgets: [action.payload, ...state.widgets],
            }
        }
        case GET_A_WIDGET: {
            return {
                ...state,
                currentWidget: action.payload,
            }
        }
        case UPDATE_WIDGET: {
            let { id } = action.payload;
    
            let index = findIndex(state.widgets, id);  
            let newLists = state.widgets;
            newLists[index] = action.payload;

            return {
                ...state,
                widgets: newLists
            }
        }
        case DELETE_WIDGET: {
            let newList = state.widgets.filter(widget => {
                return action.payload.indexOf(widget.id) < 0; 
            });
            
            let newPaging = {...state.paging};
            newPaging.count = state.paging - 1;
      
            return { 
                ...state, 
                widgets: newList,
                paging: newPaging
            };
        }
        default: return state;
    }
}

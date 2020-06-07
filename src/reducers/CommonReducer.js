import {
  CHANGE_STATUS,
  PUBLISH_STATUSES,
  UNPUBLISH_STATUSES,
  CONSUMER
} from "Actions/types";

const INIT_STATE = {
  consumer: [],
  record_copied: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_STATUS: {
      return { ...state };
    }
    case PUBLISH_STATUSES: {
      return { ...state };
    }
    case UNPUBLISH_STATUSES: {
      return { ...state };
    }
    case CONSUMER: {
      return { ...state, consumer: action.payload };
    }
    default:
      return state;
  }
};

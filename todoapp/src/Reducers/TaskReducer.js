import {
  LOAD_TASKS,
  LOAD_TASK,
  ADD_TASKS,
  DELETE_TASKS,
  SET_LOADING,
  SET_ALERT,
  CLEAN_ALERT,
} from '../Constants/TaskConstants';

const initstate = {
  loading: false,
  Tasks: null,
  Task: null,
  alert: null,
};

// eslint-disable-next-line
export const TaskReducer = (state = initstate, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_TASKS:
      return {
        ...state,
        Tasks: payload,
        loading: false,
        alert: null,
      };
    case LOAD_TASK:
      return {
        ...state,
        Task: payload,
        alert: null,
        loading: false,
      };
    case ADD_TASKS:
      return {
        ...state,
        Tasks: state.Tasks.concat(payload),
        loading: false,
        alert: null,
      };
    case DELETE_TASKS:
      return {
        ...state,
        Tasks: state.Tasks.filter((item) => item._id !== payload.task_id),
        loading: false,
        alert: payload.msg,
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ALERT: {
      return {
        ...state,
        alert: payload,
      };
    }
    case CLEAN_ALERT: {
      return {
        ...state,
        alert: null,
      };
    }
    default:
      return state;
  }
};

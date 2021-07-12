import axios from 'axios';
import {
  LOAD_TASKS,
  ADD_TASKS,
  DELETE_TASKS,
  SET_LOADING,
  SET_ALERT,
  CLEAN_ALERT,
} from '../Constants/TaskConstants';

export const LoadTasks = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const { data } = await axios.get('/task');

    dispatch({
      type: LOAD_TASKS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SET_ALERT,
      payload: error?.response?.msg || 'SERVER ERROR',
    });
  }
};
export const AddTasks = (task) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });

    const { data } = await axios.post('/task', task);

    dispatch({
      type: ADD_TASKS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SET_ALERT,
      payload: error?.response?.msg || 'SERVER ERROR',
    });
  }
};
export const DeleteTasks = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const { data } = await axios.delete(`/task/${id}`);

    dispatch({
      type: DELETE_TASKS,
      payload: data,
    });

    setTimeout(() => {
      dispatch({
        type: CLEAN_ALERT,
      });
    }, 5000);
  } catch (error) {
    dispatch({
      type: SET_ALERT,
      payload: error?.response || 'SERVER ERROR',
    });
  }
};
export const EditTask = (id, task) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const { data } = await axios.put(`/tasks/${id}`, task);
    console.log(typeof data);
    dispatch({
      type: DELETE_TASKS,
      payload: data,
    });
    setTimeout(() => {
      dispatch({
        type: CLEAN_ALERT,
      });
    }, 2000);
  } catch (error) {
    dispatch({
      type: SET_ALERT,
      payload: error?.response || 'SERVER ERROR',
    });
  }
};

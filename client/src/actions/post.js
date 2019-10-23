import { GET_POSTS, POST_ERROR } from './types';
import { setAlert } from './alert';
import axios from 'axios';

export const getPosts = () => async dispatch => {
  try {
    console.log('Fetching posts');
    const res = await axios.get('/api/posts');
    console.log(res.data);
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

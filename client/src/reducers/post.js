import { GET_POSTS, POST_ERROR } from '../actions/types';

const initialState = {
  posts: [],
  postsLoading: true,
  selectedPost: null,
  selectedPostLoading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        postsLoading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        postsLoading: false
      };
    default:
      return state;
  }
}

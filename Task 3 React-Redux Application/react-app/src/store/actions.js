import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_URL);
      dispatch({ type: "FETCH_POSTS", payload: response.data });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
};

export const addPost = (newPost) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(API_URL, newPost);
      dispatch({ type: "ADD_POST", payload: response.data });
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };
};
export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_URL}/${postId}`);
      dispatch({ type: "DELETE_POST", payload: postId });
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
};
export const updatePost = (postId, updatedPost) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${API_URL}/${postId}`, updatedPost);
      dispatch({ type: "UPDATE_POST", payload: response.data });
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
};

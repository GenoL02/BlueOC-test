const initialState = {
  posts: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Thêm các trường hợp xử lý action
    case "FETCH_POSTS":
      return { ...state, posts: action.payload };
    // Thêm trường hợp xử lý action ADD_POST
    case "ADD_POST":
      return { ...state, posts: [...state.posts, action.payload] };
    // Thêm trường hợp xử lý action DELETE_POST
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    // Thêm trường hợp xử lý action UPDATE_POST
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    default:
      return state;
  }
};

export default reducer;

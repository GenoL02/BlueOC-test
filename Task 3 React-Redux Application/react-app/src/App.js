import "./styles/App.css";
import React from "react";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import { applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import reducer from "./store/reducer";
import PostList from "./components/PostList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>List of Posts</h1>
        <PostList />
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;

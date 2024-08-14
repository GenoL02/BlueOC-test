import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../store/actions";
import "../styles/posts-form.css";
import { toast } from "react-toastify";

function PostForm({ onClose }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Kiểm tra xem tiêu đề hoặc nội dung có trống hay không
    if (title.trim() === "" || body.trim() === "") {
      toast.error("Title and body are required.");
      return; // Dừng xử lý nếu tiêu đề hoặc nội dung trống
    }

    const newPost = { title, body };
    dispatch(addPost(newPost));
    setTitle("");
    setBody("");
    toast.success("New post added successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    onClose(); // Gọi onClose để đóng PostForm
  };

  return (
    <div className="post-form">
      <form onSubmit={handleSubmit}>
        <div className="title">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="content">
          <label htmlFor="body">Content: </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button className="save-button" type="submit">
          Save
        </button>
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>{" "}
      </form>
    </div>
  );
}

export default PostForm;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, updatePost, deletePost } from "../store/actions";
import PostForm from "./PostForm";
import "../styles/posts-list.css";
import { toast } from "react-toastify";

function PostList() {
  const posts = useSelector((state) => state.posts); // Lấy danh sách bài viết từ store
  const dispatch = useDispatch();
  const [editingPostId, setEditingPostId] = useState(null); // ID bài viết đang chỉnh sửa
  const [showPostForm, setShowPostForm] = useState(false); // Hiển thị form thêm bài viết
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const postsPerPage = 9; // Số lượng bài viết trên mỗi trang

  // Lấy danh sách bài viết khi component được render
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Tính toán tổng số trang
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Lấy mảng bài viết cho trang hiện tại
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // Xử lý sự kiện click nút "Trang trước"
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Xử lý sự kiện click nút "Trang sau"
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Hiển thị form thêm bài viết
  const handleAddPost = () => {
    setShowPostForm(true);
  };
  // Hiển thị form Chỉnh sửa
  const handleEdit = (postId) => {
    setEditingPostId(postId);
  };
  // Xử lý sự kiện Xóa
  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
    toast.error("Deleted post successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Xử lý submit form chỉnh sửa
  const handleSubmitEdit = (event, postId) => {
    event.preventDefault();
    const updatedPost = {
      title: event.target.title.value,
      body: event.target.body.value,
    };
    dispatch(updatePost(postId, updatedPost));
    setEditingPostId(null);
    toast.success("Edited post successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Xử lý đóng form thêm bài viết
  const handleClosePostForm = () => {
    setShowPostForm(false);
  };

  return (
    <>
      <button className="add-button" onClick={handleAddPost}>
        Add new post
      </button>{" "}
      {/* Hiển thị form thêm bài viết */}
      {showPostForm && <PostForm onClose={handleClosePostForm} />}
      <div className="posts-container">
        {currentPosts.map((post) => (
          <div className="posts-list" key={post.id}>
            {editingPostId === post.id ? (
              <form onSubmit={(e) => handleSubmitEdit(e, post.id)}>
                <h3>Edit Post</h3>
                <div className="title">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={post.title}
                  />
                </div>
                <div className="content">
                  <label htmlFor="body">Content:</label>
                  <textarea id="body" name="body" defaultValue={post.body} />
                </div>
                <button type="submit" className="save-button">
                  Save
                </button>
              </form>
            ) : (
              <>
                <h3
                  contentEditable={editingPostId === post.id}
                  suppressContentEditableWarning={true}
                  onChange={(e) => {
                    const updatedPost = {
                      ...post,
                      title: e.target.textContent,
                    };
                    dispatch(updatePost(post.id, updatedPost));
                  }}
                >
                  {post.title}
                </h3>
                <p
                  contentEditable={editingPostId === post.id}
                  suppressContentEditableWarning={true}
                  onChange={(e) => {
                    const updatedPost = { ...post, body: e.target.textContent };
                    dispatch(updatePost(post.id, updatedPost));
                  }}
                >
                  {post.body}
                </p>
                <div className="adjust-buttons">
                  {editingPostId === post.id ? (
                    <button
                      className="save-button"
                      onClick={() => handleEdit(post.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(post.id)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {/* Hiển thị phân trang */}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Pages {currentPage} / {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
}

export default PostList;

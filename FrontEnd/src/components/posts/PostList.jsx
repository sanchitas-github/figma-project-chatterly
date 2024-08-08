import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import API from "../../services/API";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    API.get("api/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleCreateOrUpdatePost = (postData) => {
    if (editingPostId) {
      API.put(`api/posts/${editingPostId}`, postData)
        .then((response) => {
          setPosts(
            posts.map((post) =>
              post._id === editingPostId ? response.data : post
            )
          );
          setEditingPostId(null);
        })
        .catch((error) => console.error("Error updating post:", error));
    } else {
      API.post("api/posts", postData)
        .then((response) => setPosts([...posts, response.data]))
        .catch((error) => console.error("Error creating post:", error));
    }
  };

  const handleDeletePost = (id) => {
    API.delete(`api/posts/${id}`)
      .then(() => setPosts(posts.filter((post) => post._id !== id)))
      .catch((error) => console.error("Error deleting post:", error));
  };

  const handleEditPost = (id) => {
    setEditingPostId(id);
  };

  const handleLikePost = (id) => {
    const postToLike = posts.find((post) => post._id === id);
    if (!postToLike) return;

    const updatedPost = { ...postToLike, likes: postToLike.likes + 1 };
    API.put(`api/posts/${id}`, updatedPost)
      .then(() => {
        setPosts(posts.map((post) => (post._id === id ? updatedPost : post)));
      })
      .catch((error) => console.error("Error liking post:", error));
  };
  return (
    <div>
      <PostForm postId={editingPostId} onSubmit={handleCreateOrUpdatePost} />
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <img src={post.image} alt={post.title} width="100" />
            <p>Posted by: {post.user?.name}</p>
            <p>Created at: {new Date(post.createdAt).toLocaleString()}</p>
            <p>Likes : {post.likes}</p>
            <button onClick={() => handleEditPost(post._id)}>Edit</button>
            <button onClick={() => handleDeletePost(post._id)}>Delete</button>
            <button onClick={() => handleLikePost(post._id)}>Like</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;

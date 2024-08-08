import React, { useState, useEffect } from "react";
import API from "../../services/API";

const PostForm = ({ postId, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (postId) {
      API.get(`api/posts/${postId}`)
        .then((response) => {
          const { title, description, image } = response.data;
          setTitle(title);
          setDescription(description);
          setImage(image);
        })
        .catch((error) => console.error("Error fetching post data:", error));
    }
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, image, user: user?._id });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <button type="submit">{postId ? "Update Post" : "Create Post"}</button>
    </form>
  );
};

export default PostForm;

import React from "react";
import PostList from "../components/posts/PostList";

const Post = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
      }}
    >
      <h1>Post Management</h1>
      <PostList />
    </div>
  );
};

export default Post;

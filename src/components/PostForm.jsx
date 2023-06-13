import React, { useState } from "react";

function PostForm({ onSubmit, initialValue }) {
  const [post, setPost] = useState({
    title: initialValue.title || "",
    body: initialValue.body || "",
  });

  const handleChangeInput = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const renderFileld = (label) => (
    <div>
      <label>{label}</label>
      <input
        onChange={handleChangeInput}
        type="text"
        name={label.toLowerCase()}
        value={post[label.toLowerCase()]}
      />
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(post);
    onSubmit(post);

    setPost({
      title: "",
      body: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderFileld("Title")}
      {renderFileld("Body")}
      <button type="submit">Submit</button>
    </form>
  );
}

export default PostForm;

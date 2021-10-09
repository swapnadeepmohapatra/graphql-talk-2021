import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const ADD_BLOG = gql`
  mutation AddBlog($title: String!, $desc: String!) {
    addBlog(title: $title, desc: $desc) {
      title
      id
      desc
      cover_image
      author {
        name
      }
    }
  }
`;

function Add() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [state, setState] = useState({
    title: "",
    desc: "",
  });

  const { desc, title } = state;

  const [addBlog] = useMutation(ADD_BLOG, {
    variables: {
      title,
      desc,
    },
  });

  const addBlogFormSubmit = (e) => {
    e.preventDefault();
    addBlog();
    setDialogOpen(false);
    setState({ title: "", desc: "" });
  };

  const handleOnChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className="add">
      <div
        className="add__container"
        style={{ display: dialogOpen ? "block" : "none" }}
      >
        <h3>Add New Blog</h3>
        <form className="add__form" onSubmit={addBlogFormSubmit}>
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleOnChange}
            value={title}
          />
          <label>Desc</label>
          <input
            type="text"
            placeholder="Desc"
            name="desc"
            onChange={handleOnChange}
            value={desc}
          />
          <button onClick={() => {}}>Submit</button>
        </form>
      </div>
      <button
        className="add__button"
        onClick={() => setDialogOpen(!dialogOpen)}
      >
        {dialogOpen ? "x" : "+"}
      </button>
    </div>
  );
}

export default Add;

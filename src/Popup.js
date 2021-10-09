import React, { useEffect } from "react";

function Popup({ data, removeData }) {
  useEffect(() => {
    setTimeout(() => {
      removeData();
    }, 2000);
  }, [removeData]);

  return (
    <div className="new_blog__popup">
      <h2>New Blog</h2>
      <h3>{data?.newBlog?.title}</h3>
      <p>{data?.newBlog?.desc}</p>
      <div className="new_blog__popup__progress_bar"></div>
    </div>
  );
}

export default Popup;

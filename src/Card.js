import React from "react";

function Card({ data }) {
  return (
    <div className="blog__card">
      <img src={data?.cover_image} alt="" className="blog__card__cover_image" />
      <h2 className="blog__card__title">{data?.title}</h2>
      <p className="blog__card__desc">{data?.desc}</p>
      <div className="blog__card__author">
        <img
          className="blog__card__author__image"
          src={"https://avatar.tobi.sh/"}
          alt=""
        />
        <h3 className="blog__card__author__name">{data?.author?.name}</h3>
      </div>
    </div>
  );
}

export default Card;

import { render, screen } from "@testing-library/react";
import Card from "./Card";

const blog = {
  id: "2062b06a-ab63-4f31-9e28-ae5ea60ebe42",
  __typename: "Blog",
  title: "a11y",
  desc: "This is a blog about accessibility",
  cover_image:
    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fG5hdHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
};

test("Blog Card", async () => {
  render(<Card data={blog} />);

  const blogTitleElement = screen.getByText(blog.title);
  expect(blogTitleElement).toBeInTheDocument();

  const blogDescElement = screen.getByText(blog.desc);
  expect(blogDescElement).toBeInTheDocument();

  const coverImageElement = await screen.findByAltText(blog.title + "-cover");
  expect(coverImageElement.src).toEqual(blog.cover_image);
});

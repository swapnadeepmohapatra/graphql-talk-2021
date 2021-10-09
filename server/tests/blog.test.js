const { gql } = require("apollo-server");
const createTestServer = require("./helper");

const firstBlog = {
  title: "Intro to WebDev",
  desc: "This is a blog about web development",
  cover_image:
    "https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG5hdHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  author: { name: "Swapnadeep" },
};

const GET_BLOGS = gql`
  query GetBlogs {
    blogs {
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

const newBlog = {
  title: "New Blog Title",
  desc: "This is a new blog",
};

const ADD_BLOG = gql`
  mutation AddBlog($title: String!, $desc: String!) {
    addBlog(title: $title, desc: $desc) {
      id
      title
      desc
    }
  }
`;

describe("testing queries", () => {
  test("get blogs", async () => {
    const { query } = createTestServer();

    const res = await query({ query: GET_BLOGS });
    expect(res.errors).toBeFalsy();
    expect(res.data.blogs).toBeDefined();
    expect(res.data.blogs.length).toBeGreaterThan(0);

    expect(res.data.blogs[0].title).toBe(firstBlog.title);
    expect(res.data.blogs[0].desc).toBe(firstBlog.desc);
    expect(res.data.blogs[0].author.name).toBe(firstBlog.author.name);
    expect(res.data.blogs[0].cover_image).toBe(firstBlog.cover_image);
    expect(res.data.blogs[0].id).toBeDefined();
  });
});

describe("testing mutations", () => {
  test("add blog", async () => {
    const { mutate } = createTestServer();

    const res = await mutate({ mutation: ADD_BLOG, variables: newBlog });

    expect(res.errors).toBeFalsy();
    expect(res.data.addBlog).toBeDefined();
    expect(res.data.addBlog).toBeDefined();

    expect(res.data.addBlog.title).toBe(newBlog.title);
    expect(res.data.addBlog.desc).toBe(newBlog.desc);
    expect(res.data.addBlog.id).toBeDefined();
  });
});

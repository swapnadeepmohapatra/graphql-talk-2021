const { v4: uuidv4 } = require("uuid");
const { PubSub } = require("apollo-server");
const pubsub = new PubSub();

const BLOG_ADDED = "BLOG_ADDED";

const blogs = [
  {
    title: "Intro to WebDev",
    author: { name: "Swapnadeep", age: 17 },
    desc: "This is a blog about web development",
    id: uuidv4(),
    cover_image:
      "https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG5hdHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tags: ["webdev", "frontend", "backend"],
  },
  {
    title: "Intro to WebDev",
    author: { name: "Swapnadeep", age: 17 },
    desc: "This is a blog about web development",
    id: uuidv4(),
    cover_image:
      "https://images.unsplash.com/photo-1586227740560-8cf2732c1531?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tags: ["webdev", "frontend", "backend"],
  },
  {
    title: "Intro to WebDev",
    author: { name: "Swapnadeep", age: 17 },
    desc: "This is a blog about web development",
    id: uuidv4(),
    cover_image:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tags: ["webdev", "frontend", "backend"],
  },
  {
    title: "Intro to WebDev",
    author: { name: "Swapnadeep", age: 17 },
    desc: "This is a blog about web development",
    id: uuidv4(),
    cover_image:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw1MHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tags: ["webdev", "frontend", "backend"],
  },
  {
    title: "a11y",
    author: { name: "Swapnadeep", age: 17 },
    desc: "This is a blog about accessibility",
    id: uuidv4(),
    cover_image:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fG5hdHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tags: ["webdev", "accessibility", "a11y"],
  },
];

const resolvers = {
  Query: {
    blogs: () => blogs,
  },
  Mutation: {
    addBlog: (root, args) => {
      const blog = {
        id: uuidv4(),
        ...args,
      };
      blogs.push(blog);
      pubsub.publish(BLOG_ADDED, { newBlog: blog });
      return blog;
    },
  },
  Subscription: {
    newBlog: {
      subscribe: () => pubsub.asyncIterator([BLOG_ADDED]),
    },
  },
};

module.exports = resolvers;

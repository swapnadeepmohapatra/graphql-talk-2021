const { gql } = require("apollo-server");

const typeDefs = gql`
  type Blog {
    title: String
    id: ID
    desc: String
    cover_image: String
    blog: String
    author: Author
    tags: [String]
  }

  type Author {
    name: String
    age: Int
  }

  type Query {
    blogs: [Blog]
  }

  type Mutation {
    addBlog(
      title: String
      desc: String
      cover_image: String
      blog: String
      author: String
      tags: [String]
    ): Blog
  }

  type Subscription {
    newBlog: Blog
  }
`;

module.exports = typeDefs;

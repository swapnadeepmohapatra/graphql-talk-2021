import "./App.css";
import { useQuery, gql, useSubscription } from "@apollo/client";
import Card from "./Card";
import Add from "./Add";
import Popup from "./Popup";
import { useEffect, useState } from "react";

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

const NEW_BLOG_ADDED = gql`
  subscription NewBlogAdded {
    newBlog {
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

function App() {
  const { loading, error, data } = useQuery(GET_BLOGS);
  const { data: subsData } = useSubscription(NEW_BLOG_ADDED, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (client && subscriptionData) {
        const { newBlog } = subscriptionData.data;
        const { blogs } = client.readQuery({ query: GET_BLOGS });

        if (blogs[blogs.length - 1].id === newBlog.id) {
          return;
        } else {
          client.writeQuery({
            query: GET_BLOGS,
            data: { blogs: blogs.concat(newBlog) },
          });
        }
      }
    },
  });

  useEffect(() => {
    setDialog(subsData);
  }, [subsData]);

  const [dialog, setDialog] = useState();

  if (loading) return <p>Loading...</p>;

  if (error)
    return (
      <div>
        <h1>Error :(</h1>
        <p>{error?.message}</p>
      </div>
    );

  return (
    <div className="App">
      <h1>Blogs</h1>

      {dialog && <Popup data={dialog} removeData={() => setDialog(null)} />}

      <div className="blogs">
        {data.blogs.map((blog) => (
          <Card data={blog} key={blog.id} />
        ))}
      </div>
      <Add />
    </div>
  );
}

export default App;
export { GET_BLOGS };

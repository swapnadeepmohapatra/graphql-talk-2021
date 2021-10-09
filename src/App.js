import "./App.css";
import { useQuery, gql } from "@apollo/client";
import Card from "./Card";
import Add from "./Add";

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

function App() {
  const { loading, error, data } = useQuery(GET_BLOGS);

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

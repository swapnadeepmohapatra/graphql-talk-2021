import "./App.css";
import { useQuery, gql } from "@apollo/client";
import Card from "./Card";

const GET_BLOGS = gql`
  {
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
    </div>
  );
}

export default App;

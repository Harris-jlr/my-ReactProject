import BlogList1 from "../components/BlogList1";
import useFetch from "../components/useFetch";

const MyBLog = () => {
  const { error, isPending, data: blogs } = useFetch('http://localhost:8000/blogs')

  return (
    <div className="MyBLog">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { blogs && <BlogList1 blogs={blogs} /> }
    </div>
  );
}
 
export default MyBLog;
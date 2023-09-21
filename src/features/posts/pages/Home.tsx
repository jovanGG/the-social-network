import useFetchPosts from "../hooks/useFetchPosts";
import PostList from "../components/PostList";
import Loader from "../components/Loader";

const Home = () => {
  const { posts, isPostsLoading } = useFetchPosts();

  return (
    <>{isPostsLoading ? <Loader /> : posts && <PostList posts={posts} />}</>
  );
};

export default Home;

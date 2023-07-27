import { useEffect, useState } from "react";
import { useAuth } from "./Auth";
import api from "../handlers/ApiCalls";

import "../styles/Post.css";

const Post = () => {
  let auth = useAuth();
  const [posts, setPosts] = useState<any>();
  const [filteredPosts, setFilteredPosts] = useState<any>();
  const [, setError] = useState<any>();

  const postsCall = async () => {
    try {
      const apiResponse = await api.getPosts(auth.token);
      setPosts(apiResponse.data.data);
    } catch (e) {
      setError(e);
    }
  };

  const filterPosts = (e: any) => {
    const filteredPosts = posts.filter((post: { title: string }) =>
      post.title.includes(e.key)
    );
    setFilteredPosts(filteredPosts);
  };

  const currPosts =
    !filteredPosts || (filteredPosts as Array<any>).length === 0
      ? posts
      : filteredPosts;

  useEffect(() => {
    postsCall();
  }, []);

  return (
    <div className="postWrapper">
      <input
        id="posts"
        aria-label="Search titles"
        placeholder="Search posts"
        type="search"
        name="title"
        onKeyDown={(e) => filterPosts(e)}
      />
      {posts &&
        currPosts.map((post: { title: string; body: string }, idx: any) => (
          <div key={idx}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
    </div>
  );
};

export default Post;

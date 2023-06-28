import { useEffect, useState } from "react";
import { useAuth } from "./Auth";
import api from "../handlers/ApiCalls";

import "../styles/Post.css";

const Post = () => {
  let auth = useAuth();
  const [posts, setPosts] = useState<any>();
  const [, setError] = useState<any>();

  const postsCall = async () => {
    try {
      const apiResponse = await api.getPosts(auth.token);
      setPosts(apiResponse.data.data);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    postsCall();
  }, []);

  return (
    <div className="postWrapper">
      {posts &&
        posts.map((post: { title: string; body: string }, idx: any) => (
          <div key={idx}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
    </div>
  );
};

export default Post;

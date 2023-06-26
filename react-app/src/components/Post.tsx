import { useEffect, useState } from "react";
import { useAuth } from "./Auth";
import api from "../handlers/ApiCalls";

import "../styles/Post.css";

const Post = () => {
  let auth = useAuth();
  const [post, setPost] = useState<any>();
  const [, setError] = useState<any>();

  const postsCall = async () => {
    try {
      const apiResponse = await api.getPosts(auth.token);
      setPost(apiResponse.data.data[0]);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    postsCall();
  }, []);

  return (
    <div className="postWrapper">
      <h3>{post && (post.title as string)}</h3>
      <p>{post && (post.body as string)}</p>
    </div>
  );
};

export default Post;

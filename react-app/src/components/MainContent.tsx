import { useEffect, useState } from 'react';
import useToken from '../hooks/useToken';
import Post from '../components/Post';
import api from '../handlers/ApiCalls';
import '../styles/MainContent.css';

const MainContent = () => {
  const [posts, setPosts] = useState<any>();
  const [error, setError] = useState<any>();
  const { token } = useToken();

  useEffect(() => {
    const postsCall = async () => {
      try {
        const apiResponse = await api.getPosts(token as string);
        setPosts(apiResponse.data.data);
      } 
      catch (e) {
        setError(e)
      }
    };
    postsCall();
  }, []);

  return (
    <div>
      <h2 className="mainHeader">This is main content</h2>
      {posts ? <Post post={posts[0]} /> : <p>Error fetching posts</p>}
    </div>
  );
};

export default MainContent;

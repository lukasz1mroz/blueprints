import { useEffect, useState } from 'react';
import useToken from '../hooks/useToken';
import Post from '../components/Post';
import Login from '../components/Login'
import api from '../handlers/ApiCalls';
import '../styles/MainContent.css';

const MainContent = () => {
  const [posts, setPosts] = useState<any>();
  const [, setError] = useState<any>();
  const { token, setToken } = useToken();

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
  }, [token]);
  
  return (token ?
    <div className='wrapper'>
      <h2 className="mainHeader">This is main content</h2>
      {posts && <Post post={posts[0]} />}
    </div> :
    <div className='wrapper'>
      <h2 className="mainHeader">Please login first</h2>
      <Login setToken={setToken}/>
    </div>
  );
};

export default MainContent;

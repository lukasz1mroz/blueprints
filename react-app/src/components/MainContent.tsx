import { useEffect, useState } from 'react';
import useToken from '../hooks/useToken';
import Post from '../components/Post';
import api from '../handlers/ApiCalls';
import '../styles/MainContent.css';

const MainContent = () => {
  const [posts, setPosts] = useState<any>();
  const { token } = useToken();

  useEffect(() => {
    console.log('from useEffect');
    const postsCall = async () => {
      const apiResponse = await api.getPosts(token as string);
      setPosts(apiResponse.data.data);
    };
    postsCall();
  }, []);

  console.log(posts);

  return (
    <div>
      <h2 className="mainHeader">This is main content</h2>
      {/* <h3>{posts && posts[0].title}</h3>
      <p>{posts && posts[0].body}</p> */}
      {posts && <Post post={posts[0]} />}
    </div>
  );
};

export default MainContent;

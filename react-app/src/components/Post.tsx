import '../styles/Post.css';

const Post = (props: any) => {
  return (
    <div className="postWrapper">
      <h3>{props.post.title}</h3>
      <p>{props.post.body}</p>
    </div>
  );
};

export default Post;

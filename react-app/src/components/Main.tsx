import { Link, Outlet } from "react-router-dom";

import "../styles/MainContent.css";

const MainContent = () => {
  return (
    <div>
      <h1>This is the main content</h1>
      <ul>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MainContent;

import { Link, Outlet } from "react-router-dom";

import "../styles/MainContent.css";

const MainContent = () => {
  return (
    <div>
      <h2>This is the main content</h2>
      <Outlet />
    </div>
  );
};

export default MainContent;

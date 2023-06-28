import { Outlet, Link } from "react-router-dom";
import { AuthStatus } from "./Auth";
import "../styles/Layout.css";

function Layout() {
  return (
    <div>
      <div className="header">
        <AuthStatus />
        <ul>
          <li>
            <Link to="/">Main content</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;

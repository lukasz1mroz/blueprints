import { Outlet, Link } from "react-router-dom";
import { AuthStatus } from "./Auth";

function Layout() {
  return (
    <div>
      <AuthStatus />
      <ul>
        <li>
          <Link to="/">Main content</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default Layout;

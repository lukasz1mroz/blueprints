import { Outlet, Link } from "react-router-dom";
import { AuthStatus } from "./Auth";
import "../styles/Layout.css";

function Layout() {
  return (
    <div>
      <div className="header">
        <h1>Blueprints project</h1>
        <div className="panel">
          <AuthStatus />
          <ul className="panel">
            <li>
              <Link to="/">Main content</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="body">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
